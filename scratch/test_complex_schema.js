const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const campaignResponseSchema = {
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

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  console.log("Sending schema-enforced prompt...");
  try {
    const prompt = "Generate a funny ad script for SwadGrow organic mango pickles with grandma's recipe. Budget is medium, Hinglish language.";
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: campaignResponseSchema,
        temperature: 0.7,
      }
    });

    console.log("Success! Output:");
    console.log(result.response.text());
  } catch (err) {
    console.error("Failed with error:", err);
  }
}

run();
