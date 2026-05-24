import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_PRIMARY = "gemini-2.5-flash";
const MODEL_FALLBACK = "gemini-2.5-pro";

export const maxDuration = 60;


// Strict JSON schema for campaign generator output using any to bypass type conflicts
const campaignResponseSchema: any = {
  type: "object",
  properties: {
    campaignTitle: { type: "string" },
    campaignSummary: { type: "string" },
    creativeDirection: { type: "string" },
    viralPotentialScore: { type: "string" },
    hookVariations: {
      type: "array",
      items: { type: "string" }
    },
    storyboard: {
      type: "array",
      items: {
        type: "object",
        properties: {
          sceneNumber: { type: "string" },
          duration: { type: "string" },
          cameraAngle: { type: "string" },
          visualDirection: { type: "string" },
          action: { type: "string" },
          dialogue: { type: "string" },
          voiceover: { type: "string" },
          onScreenText: { type: "string" },
          sfx: { type: "string" },
          musicDirection: { type: "string" },
          transition: { type: "string" }
        },
        required: [
          "sceneNumber", "duration", "cameraAngle", "visualDirection", 
          "action", "dialogue", "voiceover", "onScreenText", 
          "sfx", "musicDirection", "transition"
        ]
      }
    },
    spokenDialogue: {
      type: "array",
      items: { type: "string" }
    },
    socialCaption: { type: "string" },
    hashtags: {
      type: "array",
      items: { type: "string" }
    },
    jingleSuggestion: {
      type: "object",
      properties: {
        tempo: { type: "string" },
        mood: { type: "string" },
        vocalStyle: { type: "string" },
        productionDirection: { type: "string" }
      },
      required: ["tempo", "mood", "vocalStyle", "productionDirection"]
    },
    professionalRecommendation: { type: "string" }
  },
  required: [
    "campaignTitle", "campaignSummary", "creativeDirection", 
    "viralPotentialScore", "hookVariations", "storyboard", 
    "spokenDialogue", "socialCaption", "hashtags", 
    "jingleSuggestion", "professionalRecommendation"
  ]
};

// Perform quality validation check on the generated campaign
function validateCampaign(campaign: any): boolean {
  if (!campaign) return false;
  if (!campaign.hookVariations || campaign.hookVariations.length < 3) return false;
  if (!campaign.storyboard || campaign.storyboard.length < 4) return false;
  if (!campaign.campaignTitle || campaign.campaignTitle.trim().length === 0) return false;
  if (!campaign.campaignSummary || campaign.campaignSummary.trim().length === 0) return false;

  const summary = (campaign.campaignSummary || "").toLowerCase();
  if (summary.includes("corporate marketing") || summary.includes("placeholder content")) {
    return false;
  }
  return true;
}

// Generate prompt based on inputs
function buildSystemPrompt(params: any): string {
  const {
    creativeType,
    businessType,
    campaignGoal,
    creativeStyle,
    language,
    targetAudience,
    budget,
    businessDescription,
    competitors,
    extraDirection,
    inspirationBrands
  } = params;

  return `You are a Senior Indian Advertising Creative Director, Film Director, Copywriter, and Jingle Producer.
Act as a combination of Fevicol's out-of-the-box humor, CRED's self-aware style, Zomato/Swiggy's conversational emotional hooks, and classic Indian TV commercials (like Amul, Surf Excel, or Cadbury).
Think like a movie director, brand strategist, and social media growth expert simultaneously.

Your task is to generate a premium ad campaign script tailored to this business:
- **Creative Ad Format**: ${creativeType}
- **Business Category**: ${businessType}
- **Campaign Goal**: ${campaignGoal}
- **Tone/Style**: ${creativeStyle}
- **Language**: ${language} (If Hinglish or Hindi, write dialogue and voiceover in Hindi using Roman script/Hinglish, e.g. "Kya aap thak gaye hain?")
- **Target Audience**: ${JSON.stringify(targetAudience)}
- **Production Budget Scale**: ${budget}
- **Product/Business Description**: ${businessDescription}
- **Competitors**: ${competitors || "None specified"}
- **Brand/Style Inspiration**: ${inspirationBrands || "None specified"}
- **Extra Creative Direction**: ${extraDirection || "None specified"}

STRICT CREATIVE DIRECTION RULES:
1. **Never write generic corporate or boring marketing language.** Focus on storytelling, emotion, or high-recall humor.
2. **Scroll-stopping hook (first 3 seconds)**: It must immediately capture attention. Avoid starting with standard logo animations.
3. **Storyboard Cues**: Frame it like a film director's shot list. Describe exact camera angles, lighting, background, transitions, character actions, sound cues, and music.
4. **Product Integration**: Show the product naturally inside the story.
5. **Creative Prioritization**: Hook (0-3s) -> Emotional/Humor Trigger -> Memorability -> Brand Recall -> Product Integration -> Viral Potential -> CTA Conversion.`;
}

// Build refinement prompt
function buildRefinementPrompt(params: any, originalScript: any, refinementInstruction: string): string {
  return `You are a Senior Indian Advertising Creative Director.
You are revising an existing campaign script.

Here is the original script that was generated:
${JSON.stringify(originalScript)}

Here is the user's original questionnaire inputs:
${JSON.stringify(params)}

Here is the refinement instruction you must implement:
- **Refinement Goal**: "${refinementInstruction}"

CRITICAL REFINEMENT INSTRUCTIONS:
1. **Do NOT write a completely new campaign from scratch.**
2. Keep the same core idea, product positioning, characters, brand direction, hook structure, main storyline, and campaign objective.
3. Only modify and refine the specific elements (such as scene visual action, dialogue tone, hashtags, or summaries) to emphasize the requested tone (e.g. making it funnier, more emotional, more viral, or premium).
4. Revise the existing storyboard scene cards to match this style, keeping the scene count and timeline timing identical.`;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return NextResponse.json(
        { error: "Creative Director is currently busy. Please try again." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { refineInstruction, originalScript, ...params } = body;

    const genAI = new GoogleGenerativeAI(apiKey);

    // Smart generation helper with retry and model fallback
    const generateWithModel = async (modelName: string, promptText: string): Promise<any> => {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: campaignResponseSchema,
          temperature: modelName === MODEL_PRIMARY ? 0.7 : 0.8,
        },
      });

      const responseText = result.response.text();
      return JSON.parse(responseText);
    };

    let generatedScript: any = null;
    let attempt = 1;
    let activeModel = MODEL_PRIMARY;

    const promptText = refineInstruction && originalScript
      ? buildRefinementPrompt(params, originalScript, refineInstruction)
      : buildSystemPrompt(params);

    try {
      console.log(`[Campaign AI] Attempt 1 generating with ${MODEL_PRIMARY}...`);
      generatedScript = await generateWithModel(MODEL_PRIMARY, promptText);
      
      // Validate output quality
      if (!validateCampaign(generatedScript)) {
        console.warn("[Campaign AI] Validation failed on Attempt 1. Retrying with primary model...");
        attempt = 2;
        const correctivePrompt = `${promptText}\n\nWARNING: The previous generation lacked detail, had fewer than 3 hooks, or fewer than 4 storyboard scenes. You MUST output exactly 3+ hooks, 4+ scenes, and high-quality, memorable director cues.`;
        generatedScript = await generateWithModel(MODEL_PRIMARY, correctivePrompt);
      }
    } catch (primaryError) {
      console.error("[Campaign AI] Primary model generation failed:", primaryError);
      attempt = 3; // Trigger pro fallback immediately
    }

    // Fallback to Pro if still invalid or failed
    if (attempt === 3 || !validateCampaign(generatedScript)) {
      console.warn(`[Campaign AI] Falling back to ${MODEL_FALLBACK} for premium quality assurance...`);
      try {
        generatedScript = await generateWithModel(MODEL_FALLBACK, promptText);
      } catch (fallbackError) {
        console.error(`[Campaign AI] Fallback model ${MODEL_FALLBACK} failed:`, fallbackError);
        return NextResponse.json(
          { error: "Creative Director is currently busy. Please try again." },
          { status: 500 }
        );
      }
    }

    // Ensure it parsed and returned successfully
    if (!generatedScript || !generatedScript.campaignTitle) {
      return NextResponse.json(
        { error: "Creative Director is currently busy. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(generatedScript);

  } catch (error: any) {
    console.error("[Campaign AI] Server exception in ad generation route:", error);
    return NextResponse.json(
      { error: "Creative Director is currently busy. Please try again." },
      { status: 500 }
    );
  }
}
