"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

// Interface definitions for the campaign structure
interface StoryboardScene {
  sceneNumber: number;
  timing: string;
  cameraAngle: string;
  visualDirection: string;
  characterAction: string;
  backgroundSetting: string;
  lightingMood: string;
  transitionType: string;
  voiceoverScript: string;
  dialogue: string;
  onScreenText: string;
  soundEffect: string;
  musicDirection: string;
}

interface JingleSuggestion {
  tempo: string;
  vibe: string;
  mood: string;
  vocalStyle: string;
  musicDirection: string;
}

interface CampaignScript {
  title: string;
  type: string;
  summary: string;
  creativeDirection: string;
  hooks: string[];
  storyboard: StoryboardScene[];
  dialogue: string;
  caption: string;
  hashtags: string[];
  jingle: JingleSuggestion;
  viralScore: number;
  recommendation: string;
}

// Option presets for the multi-step form
const CREATIVE_TYPES = [
  "Funny Reel",
  "Product Advertisement",
  "Cinematic Brand Ad",
  "Emotional Storytelling Ad",
  "Viral Hook Reel",
  "Meme Marketing",
  "Brand Recall Campaign",
  "Product Launch Campaign",
  "Influencer / UGC Style Reel",
  "Educational Reel",
  "Product Comparison Ad",
  "Festival Campaign",
  "Product Demo Reel",
];

const BUSINESS_CATEGORIES = [
  "FMCG & Consumer Products",
  "Paint & Home Brands",
  "Food & Beverage",
  "Masala & Grocery",
  "Beauty & Skincare",
  "Fitness & Gym",
  "Ecommerce / D2C",
  "Restaurant / Café",
  "Fashion Brand",
  "Coaching / Education",
  "Local Business",
  "SaaS / Tech",
  "Other",
];

const CAMPAIGN_GOALS = [
  "Increase Sales",
  "Brand Recall",
  "Product Launch",
  "Viral Reach",
  "Customer Engagement",
  "Brand Awareness",
  "Store Visits",
  "Social Media Growth",
  "Retargeting",
  "Product Trust Building",
];

const CREATIVE_STYLES = [
  "Funny",
  "Relatable",
  "Emotional",
  "Premium",
  "Luxury",
  "Cinematic",
  "Fast-Paced",
  "Gen-Z",
  "Meme Style",
  "Storytelling",
  "High Energy",
  "Trust Building",
  "Indian TV Commercial Style",
];

const LANGUAGES = ["English", "Hindi", "Hinglish", "Regional Feel"];

const BUDGET_OPTIONS = ["Low Budget", "Medium Budget", "Premium Shoot"];

const INSPIRATION_STYLES = [
  "Fevicol Style",
  "CRED Style",
  "Zomato Style",
  "Old Indian TV Ad",
  "Funny Indian Ad",
  "Luxury Premium Brand",
  "Apple Style Minimal",
  "Emotional Storytelling",
  "Meme/Gen-Z Style",
  "Bollywood Commercial Style",
  "High Energy FMCG",
  "Cinematic Brand Film",
];

const LOADING_MESSAGES = [
  "Studying audience psychology...",
  "Building viral hooks...",
  "Directing cinematic scenes...",
  "Writing memorable dialogues...",
  "Designing brand recall moments...",
  "Finalizing campaign strategy...",
];

export default function AIDirectorPage() {
  // Step navigation state
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 11;

  // Questionnaire form states
  const [creativeType, setCreativeType] = useState("Funny Reel");
  const [businessCategory, setBusinessCategory] = useState("Food & Beverage");
  const [campaignGoal, setCampaignGoal] = useState("Brand Recall");
  const [creativeStyle, setCreativeStyle] = useState("Funny");
  const [language, setLanguage] = useState("Hinglish");
  
  // Demographics object
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("All");
  const [location, setLocation] = useState("");
  const [audienceType, setAudienceType] = useState("");
  
  const [budget, setBudget] = useState("Medium Budget");
  const [businessDescription, setBusinessDescription] = useState("");
  const [inspirationBrands, setInspirationBrands] = useState("Funny Indian Ad");
  const [customInspiration, setCustomInspiration] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [extraDirection, setExtraDirection] = useState("");

  // Lead Generation state
  const [emailInput, setEmailInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  // Script output and animation states
  const [generationState, setGenerationState] = useState<"idle" | "loading" | "success">("idle");
  const [currentScript, setCurrentScript] = useState<CampaignScript | null>(null);
  const [rawJSONData, setRawJSONData] = useState<any>(null); // Kept for refinements context

  // Loading message rotator
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const rotatorRef = useRef<NodeJS.Timeout | null>(null);

  // Cycle loading messages when in loading state
  useEffect(() => {
    if (generationState === "loading") {
      let index = 0;
      setLoadingMessage(LOADING_MESSAGES[0]);
      rotatorRef.current = setInterval(() => {
        index = (index + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[index]);
      }, 2500);
    } else {
      if (rotatorRef.current) {
        clearInterval(rotatorRef.current);
        rotatorRef.current = null;
      }
    }

    return () => {
      if (rotatorRef.current) {
        clearInterval(rotatorRef.current);
      }
    };
  }, [generationState]);

  // Map API response to our UI schema
  const mapResponseToScript = (data: any): CampaignScript => {
    return {
      title: data.campaignTitle || "Untitled Campaign",
      type: creativeType,
      summary: data.campaignSummary || "No summary provided.",
      creativeDirection: data.creativeDirection || "No directions specified.",
      hooks: Array.isArray(data.hookVariations) ? data.hookVariations : ["Grab attention", "Create mystery", "Deliver payoff"],
      storyboard: Array.isArray(data.storyboard) ? data.storyboard.map((scene: any, idx: number) => ({
        sceneNumber: parseInt(scene.sceneNumber) || (idx + 1),
        timing: scene.duration || "0–3s",
        cameraAngle: scene.cameraAngle || "Medium Shot",
        visualDirection: scene.visualDirection || "No visual layout specified.",
        characterAction: scene.action || "Character acts out the scene.",
        backgroundSetting: scene.backgroundSetting || "Standard Setting",
        lightingMood: scene.lightingMood || "Natural Light",
        transitionType: scene.transition || "Cut",
        voiceoverScript: scene.voiceover || "",
        dialogue: scene.dialogue || "",
        onScreenText: scene.onScreenText || "",
        soundEffect: scene.sfx || "Ambient sound",
        musicDirection: scene.musicDirection || "Background instrumental theme"
      })) : [],
      dialogue: Array.isArray(data.spokenDialogue) ? data.spokenDialogue.join("\n") : (data.spokenDialogue || ""),
      caption: data.socialCaption || "",
      hashtags: Array.isArray(data.hashtags) ? data.hashtags : [],
      jingle: {
        tempo: data.jingleSuggestion?.tempo || "Medium Tempo",
        vibe: data.jingleSuggestion?.vibe || "Brand Recall",
        mood: data.jingleSuggestion?.mood || "Upbeat",
        vocalStyle: data.jingleSuggestion?.vocalStyle || "Melodic",
        musicDirection: data.jingleSuggestion?.productionDirection || "Bespoke music style"
      },
      viralScore: parseFloat(data.viralPotentialScore) || 8.5,
      recommendation: data.professionalRecommendation || "EchoGrow can produce this campaign."
    };
  };

  // Generate Campaign API request
  const handleGenerate = async () => {
    if (!businessDescription.trim()) {
      toast.error("Please fill out Step 8: Product/Business Details before generating.");
      setActiveStep(8);
      return;
    }

    setGenerationState("loading");

    try {
      const selectedInspiration = inspirationBrands === "Custom Inspiration" 
        ? customInspiration 
        : inspirationBrands;

      const payload = {
        creativeType,
        businessType: businessCategory,
        campaignGoal,
        creativeStyle,
        language,
        targetAudience: {
          ageGroup,
          gender,
          location,
          audienceType
        },
        budget,
        businessDescription,
        inspirationBrands: selectedInspiration,
        competitors,
        extraDirection,
        email: emailInput || null
      };

      const response = await fetch("/api/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate campaign.");
      }

      const data = await response.json();
      
      setRawJSONData(data);
      setCurrentScript(mapResponseToScript(data));
      setGenerationState("success");
      setIsUnlocked(false); // Enable email gate for new campaign script
      toast.success("Creative campaign strategy loaded!");

    } catch (err: any) {
      console.error(err);
      setGenerationState("idle");
      toast.error(err.message || "Creative Director is currently busy. Please try again.");
    }
  };

  // Refine Campaign API request
  const handleRefine = async (styleKey: "funny" | "emotional" | "viral" | "premium") => {
    if (!currentScript || !rawJSONData) return;

    setGenerationState("loading");

    const instructionsMap = {
      funny: "Make this campaign script more funny and humorous. Exaggerate character actions and dialogues to ensure classic TV comedy style.",
      emotional: "Make this campaign script more emotional. Emphasize deep family ties, nostalgia, or warm heart-touching moments.",
      viral: "Make this campaign script more viral and retention-focused. Maximize fast cuts, trending style hooks, and rapid pacing.",
      premium: "Make this campaign script feel more premium and luxury. Focus on calm artistic flows, natural macro lighting, and elegant language."
    };

    try {
      const selectedInspiration = inspirationBrands === "Custom Inspiration" 
        ? customInspiration 
        : inspirationBrands;

      const payload = {
        creativeType,
        businessType: businessCategory,
        campaignGoal,
        creativeStyle,
        language,
        targetAudience: {
          ageGroup,
          gender,
          location,
          audienceType
        },
        budget,
        businessDescription,
        inspirationBrands: selectedInspiration,
        competitors,
        extraDirection,
        email: emailInput || null,
        refineInstruction: instructionsMap[styleKey],
        originalScript: rawJSONData
      };

      const response = await fetch("/api/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to refine script.");
      }

      const data = await response.json();

      setRawJSONData(data);
      setCurrentScript(mapResponseToScript(data));
      setGenerationState("success");
      toast.success(`Refined campaign with ${styleKey.toUpperCase()} tone!`);

    } catch (err: any) {
      console.error(err);
      setGenerationState("success"); // Keep existing script viewable
      toast.error(err.message || "Creative Director is currently busy. Please try again.");
    }
  };

  // Handle email unlock submit
  const handleUnlockStoryboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsUnlocked(true);
    setShowLeadModal(false);
    toast.success("Full director-level script unlocked!");
  };

  // Copy script utilities
  const handleCopyText = () => {
    if (!currentScript) return;
    const textToCopy = `
Campaign Title: ${currentScript.title}
Creative Type: ${currentScript.type}
Summary: ${currentScript.summary}
Tone: ${currentScript.creativeDirection}

--- Hooks ---
1. ${currentScript.hooks[0]}
2. ${currentScript.hooks[1]}
3. ${currentScript.hooks[2]}

--- Storyboard ---
${currentScript.storyboard.map(s => `Scene ${s.sceneNumber} (${s.timing}): [Angle: ${s.cameraAngle}]
Visual: ${s.visualDirection}
Action: ${s.characterAction}
Audio/VO: ${s.voiceoverScript}
Jingle/SFX: ${s.soundEffect} | ${s.musicDirection}
---`).join("\n")}
`;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Script copied to clipboard!");
  };

  // Navigation steps helpers
  const handleNextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex-grow bg-[#f8f9fa] flex flex-col py-10 px-4 md:px-12 max-w-[1440px] mx-auto w-full gap-8">
      
      {/* Header section */}
      <header className="mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          AI Creative Director
        </h1>
        <p className="text-base text-gray-500 mt-2 max-w-3xl leading-relaxed">
          Generate professional ad scripts, viral reel concepts, storyboards, and campaign ideas tailored to your business and products.
        </p>
      </header>

      {/* Main split-screen layout */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start flex-grow">
        
        {/* LEFT COLUMN: 11-Step Questionnaire */}
        <section className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 relative min-h-[520px]">
          
          {/* Progress bar */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
              <span>Campaign Builder</span>
              <span>Step {activeStep} of {totalSteps}</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${(activeStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Step Body Content */}
          <div className="flex-grow py-2">
            
            {/* Step 1: Creative Type */}
            {activeStep === 1 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">What do you want to create?</label>
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {CREATIVE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setCreativeType(type)}
                      className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                        creativeType === type 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Business Category */}
            {activeStep === 2 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">Business / Product Category</label>
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {BUSINESS_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setBusinessCategory(cat)}
                      className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                        businessCategory === cat 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Campaign Goal */}
            {activeStep === 3 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">What is your Campaign Goal?</label>
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {CAMPAIGN_GOALS.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setCampaignGoal(goal)}
                      className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                        campaignGoal === goal 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Creative Style / Tone */}
            {activeStep === 4 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">Creative Style / Tone</label>
                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {CREATIVE_STYLES.map((style) => (
                    <button
                      key={style}
                      onClick={() => setCreativeStyle(style)}
                      className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                        creativeStyle === style 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Language */}
            {activeStep === 5 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">Script Language</label>
                <p className="text-xs text-gray-400 -mt-2">Highly important for regional Indian brand connection.</p>
                <div className="grid grid-cols-1 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                        language === lang 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Target Audience */}
            {activeStep === 6 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">Target Audience Demographics</label>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="ageGroup">Age Group</label>
                    <input
                      id="ageGroup"
                      type="text"
                      placeholder="e.g. 18-30, 25-45"
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      className="w-full h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="gender">Gender Focus</label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900"
                    >
                      <option value="All">All Genders</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="location">City / Country</label>
                    <input
                      id="location"
                      type="text"
                      placeholder="e.g. Tier-1 Indian Cities, Mumbai"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="audienceType">Audience Type</label>
                    <input
                      id="audienceType"
                      type="text"
                      placeholder="e.g. Housewives, Gym-goers, Tech professionals"
                      value={audienceType}
                      onChange={(e) => setAudienceType(e.target.value)}
                      className="w-full h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Production Budget */}
            {activeStep === 7 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">Production Budget Vibe</label>
                <p className="text-xs text-gray-400 -mt-2">AI scales storyboard complexity dynamically based on budget.</p>
                <div className="grid grid-cols-1 gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className={`text-left p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                        budget === opt 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 8: Business Details */}
            {activeStep === 8 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950" htmlFor="details">Product / Business Details</label>
                <textarea
                  id="details"
                  rows={6}
                  placeholder="We sell premium masala powders with homemade taste and want stronger brand recall."
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900 resize-none font-sans"
                  required
                />
              </div>
            )}

            {/* Step 9: Ad Style Inspiration */}
            {activeStep === 9 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950">Ad Style Inspiration</label>
                <p className="text-xs text-gray-400 -mt-2">Select the commercial creative style that inspires your brand.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 mb-2">
                  {INSPIRATION_STYLES.map((style) => (
                    <button
                      key={style}
                      onClick={() => setInspirationBrands(style)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        inspirationBrands === style 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                  <button
                    onClick={() => setInspirationBrands("Custom Inspiration")}
                    className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      inspirationBrands === "Custom Inspiration" 
                        ? "border-black bg-black text-white" 
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100/50"
                    }`}
                  >
                    ✏️ Custom Inspiration
                  </button>
                </div>

                {inspirationBrands === "Custom Inspiration" && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400" htmlFor="customInsp">Custom Creative References</label>
                    <input
                      id="customInsp"
                      type="text"
                      placeholder="e.g. Blend of old Amul ads with CRED aesthetic"
                      value={customInspiration}
                      onChange={(e) => setCustomInspiration(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 10: Competitor Brands */}
            {activeStep === 10 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950" htmlFor="competitors">Competitor / Inspiration Brands (Optional)</label>
                <p className="text-xs text-gray-400 -mt-2">Enter brand names that define your competitive space.</p>
                <input
                  id="competitors"
                  type="text"
                  placeholder="e.g. Fevicol, Zomato, CRED, Surf Excel"
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900"
                />
              </div>
            )}

            {/* Step 11: Extra Creative Direction */}
            {activeStep === 11 && (
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg text-gray-950" htmlFor="direction">Extra Creative Direction (Optional)</label>
                <textarea
                  id="direction"
                  rows={5}
                  placeholder="I want something funny and memorable like old Indian TV ads."
                  value={extraDirection}
                  onChange={(e) => setExtraDirection(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900 resize-none font-sans"
                />
              </div>
            )}

          </div>

          {/* Form Actions Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <button
              onClick={handlePrevStep}
              disabled={activeStep === 1}
              className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Back
            </button>

            {activeStep < totalSteps ? (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Generate Campaign
              </button>
            )}
          </div>

        </section>

        {/* RIGHT COLUMN: Live Output Preview Dashboard */}
        <section className="lg:col-span-7 lg:sticky lg:top-8 w-full">
          
          {/* IDLE STATE */}
          {generationState === "idle" && (
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[520px]">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-black mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your AI Creative Director is ready.</h2>
              <p className="text-sm text-gray-500 max-w-sm mt-2 leading-relaxed">
                Fill out the questionnaire and click "Generate Campaign" to produce professional ad scripts, visual storyboards, and hooks.
              </p>
            </div>
          )}

          {/* LOADING STATE */}
          {generationState === "loading" && (
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[520px]">
              <div className="relative w-20 h-20 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full bg-gray-50 animate-pulse flex items-center justify-center">
                  <svg className="w-5 h-5 text-black animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{loadingMessage}</h3>
              <p className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed animate-pulse">
                Building campaign strategy, storyboard &amp; hooks...
              </p>
            </div>
          )}

          {/* SUCCESS STATE */}
          {generationState === "success" && currentScript && (
            <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-1">
              
              {/* Refinement toolbar option pills */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-wrap gap-2 justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Refine Options</span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleRefine("funny")}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                  >
                    🎭 More Funny
                  </button>
                  <button
                    onClick={() => handleRefine("emotional")}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                  >
                    ❤️ More Emotional
                  </button>
                  <button
                    onClick={() => handleRefine("viral")}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                  >
                    🚀 More Viral
                  </button>
                  <button
                    onClick={() => handleRefine("premium")}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                  >
                    💎 Luxury Feel
                  </button>
                </div>
              </div>

              {/* Storyboard success card display */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col gap-8 relative">
                
                {/* Script details header */}
                <div className="flex justify-between items-start gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
                      {currentScript.type}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-2">{currentScript.title}</h2>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Viral Potential</span>
                    <span className="text-xl font-extrabold text-green-600 mt-0.5">{currentScript.viralScore}/10</span>
                  </div>
                </div>

                {/* 1. Campaign Summary */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">1. Campaign Summary</h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {currentScript.summary}
                  </p>
                </div>

                {/* 2. Creative Direction */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">2. Creative Direction</h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {currentScript.creativeDirection}
                  </p>
                </div>

                {/* 3. Hook Variations */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">3. Hook Variations (0–3 sec)</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {currentScript.hooks.map((hook, i) => (
                      <div key={i} className="flex gap-3 items-start bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-xs font-semibold text-gray-900 italic">"{hook}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Full Storyboard Section (BLUR GATE) */}
                <div className="flex flex-col gap-4 relative min-h-[150px]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">4. Full Director Storyboard</h4>
                  
                  {/* Lock Overlay Modal */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-30 flex items-center justify-center p-4 rounded-3xl">
                      <div className="bg-white border border-gray-100 shadow-xl rounded-[2rem] p-6 max-w-md w-full text-center flex flex-col items-center gap-5">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-black">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-900">Unlock Full Director-Level Script</h5>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Enter your email to view the complete campaign storyboard, camera movements, spoken dialogue, and custom jingle production details.
                          </p>
                        </div>
                        <form onSubmit={handleUnlockStoryboard} className="w-full flex flex-col gap-3">
                          <input
                            type="email"
                            placeholder="name@business.com"
                            required
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-black text-gray-900"
                          />
                          <button
                            type="submit"
                            className="w-full h-11 bg-black text-white font-bold text-xs rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                          >
                            Unlock Storyboard
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Storyboard timeline cards */}
                  <div className={`flex flex-col gap-6 ${!isUnlocked ? "select-none blur-sm pointer-events-none" : ""}`}>
                    {currentScript.storyboard.map((scene) => (
                      <article key={scene.sceneNumber} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-gray-200/50 pb-3">
                          <span className="text-xs font-bold text-gray-900">Scene {scene.sceneNumber} ({scene.timing})</span>
                          <span className="text-[10px] font-semibold text-gray-500 uppercase bg-white border border-gray-200 px-2 py-0.5 rounded">
                            {scene.cameraAngle}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {/* Visuals column */}
                          <div className="space-y-2 border-b md:border-b-0 md:border-r border-gray-200/50 pb-3 md:pb-0 md:pr-4">
                            <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Visual Direction</span>
                            <p className="text-gray-800 leading-relaxed font-medium">{scene.visualDirection}</p>
                            <p className="text-gray-500 italic mt-1"><span className="font-semibold">Action:</span> {scene.characterAction}</p>
                            <div className="pt-2 flex flex-wrap gap-1">
                              <span className="text-[9px] bg-white border px-1.5 py-0.5 rounded text-gray-500">Setting: {scene.backgroundSetting}</span>
                              <span className="text-[9px] bg-white border px-1.5 py-0.5 rounded text-gray-500">Transition: {scene.transitionType}</span>
                              <span className="text-[9px] bg-white border px-1.5 py-0.5 rounded text-gray-500">Lighting: {scene.lightingMood}</span>
                            </div>
                          </div>

                          {/* Audio column */}
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Audio &amp; Text Cues</span>
                            {scene.voiceoverScript && (
                              <p className="text-gray-800 font-semibold leading-relaxed">VO: "{scene.voiceoverScript}"</p>
                            )}
                            {scene.dialogue && (
                              <p className="text-gray-700 italic">Dialogue: "{scene.dialogue}"</p>
                            )}
                            {scene.onScreenText && (
                              <p className="text-gray-650"><span className="font-bold text-[9px] uppercase text-gray-400 block tracking-wider mt-1">On-Screen Text</span> "{scene.onScreenText}"</p>
                            )}
                            <div className="pt-2 flex flex-col gap-1 text-[10px] text-gray-500 border-t border-gray-200/50 mt-2">
                              <span>🔊 <span className="font-semibold">SFX:</span> {scene.soundEffect}</span>
                              <span>🎵 <span className="font-semibold">Music:</span> {scene.musicDirection}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* 5. Exact Spoken Dialogue */}
                <div className={`flex flex-col gap-2 ${!isUnlocked ? "select-none blur-sm pointer-events-none" : ""}`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">5. Exact Spoken Dialogue</h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100 whitespace-pre-line font-mono">
                    {currentScript.dialogue}
                  </p>
                </div>

                {/* 6. Social Media Caption */}
                <div className={`flex flex-col gap-2 ${!isUnlocked ? "select-none blur-sm pointer-events-none" : ""}`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">6. Social Media Caption</h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {currentScript.caption}
                  </p>
                </div>

                {/* 7. Hashtags */}
                <div className={`flex flex-col gap-2 ${!isUnlocked ? "select-none blur-sm pointer-events-none" : ""}`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">7. Hashtag Suggestions</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentScript.hashtags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-50 border border-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 8. Jingle Suggestion */}
                <div className={`flex flex-col gap-2 ${!isUnlocked ? "select-none blur-sm pointer-events-none" : ""}`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">8. Matching Jingle Suggestion</h4>
                  <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Tempo / Vibe</span>
                      <p className="font-semibold text-gray-900">{currentScript.jingle.tempo}</p>
                      <p className="text-gray-500 mt-0.5">{currentScript.jingle.vibe}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Vocal / Mood</span>
                      <p className="font-semibold text-gray-900">{currentScript.jingle.vocalStyle}</p>
                      <p className="text-gray-500 mt-0.5">{currentScript.jingle.mood}</p>
                    </div>
                    <div className="sm:col-span-2 border-t border-gray-200/50 pt-3">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider mb-1">Production Direction</span>
                      <p className="text-gray-700">{currentScript.jingle.musicDirection}</p>
                    </div>
                  </div>
                </div>

                {/* 10. Professional Recommendation */}
                <div className={`flex flex-col gap-2 ${!isUnlocked ? "select-none blur-sm pointer-events-none" : ""}`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">9. Professional Recommendation</h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {currentScript.recommendation}
                  </p>
                </div>

                {/* Print area container */}
                <div className="hidden">
                  <div id="print-area" className="p-10 font-sans text-gray-900 bg-white">
                    <h1 className="text-3xl font-bold border-b pb-4 mb-6">{currentScript.title}</h1>
                    <p className="mb-4"><strong>Creative Type:</strong> {currentScript.type}</p>
                    <p className="mb-4"><strong>Summary:</strong> {currentScript.summary}</p>
                    <h2 className="text-xl font-bold mt-6 mb-3">Storyboard Scenes</h2>
                    {currentScript.storyboard.map(s => (
                      <div key={s.sceneNumber} className="border-b py-4">
                        <p><strong>Scene {s.sceneNumber} ({s.timing}) - {s.cameraAngle}</strong></p>
                        <p><strong>Visual:</strong> {s.visualDirection} (Action: {s.characterAction})</p>
                        <p><strong>Voiceover:</strong> {s.voiceoverScript}</p>
                        <p><strong>On-Screen Text:</strong> {s.onScreenText}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Copy / Actions Panel */}
                {isUnlocked && (
                  <div className="flex gap-3 pt-6 border-t border-gray-100 justify-end">
                    <button
                      onClick={handleCopyText}
                      className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy Script
                    </button>
                    <button
                      onClick={() => {
                        window.print();
                        toast.success("Opening print dialog...");
                      }}
                      className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </button>
                    <button
                      onClick={() => toast.success("Campaign script saved to your dashboard!")}
                      className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Save Campaign
                    </button>
                  </div>
                )}

                {/* Standard EchoGrow Booking CTA block */}
                <div className={`mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center ${!isUnlocked ? "select-none blur-sm pointer-events-none" : ""}`}>
                  <h4 className="font-bold text-gray-900 text-base">Want EchoGrow to professionally create this campaign?</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto leading-relaxed">
                    We specialize in high-recall audio production, viral video production, and commercial-grade campaign execution. Let's make this script a reality.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Book Free Consultation
                    </Link>
                    <Link
                      href="/contact?type=jingle"
                      className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Request Custom Jingle
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}
