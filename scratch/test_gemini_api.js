const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
// Load local environment variables
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ Missing GEMINI_API_KEY in environment configuration.");
    process.exit(1);
  }

  console.log("🔌 Attempting connection to Gemini API...");
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = "Generate a campaignTitle and campaignSummary in JSON format for a premium masala powder brand called 'SwadGrow'. Return exactly 2 keys in JSON.";

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const outputText = result.response.text();
    console.log("✅ Connection Successful!");
    console.log("📥 API Output Response:");
    console.log(outputText);
    
    // Test JSON parse
    const parsed = JSON.parse(outputText);
    if (parsed.campaignTitle) {
      console.log("🎉 JSON Parsing Verified! API works perfectly.");
      process.exit(0);
    } else {
      console.error("❌ Expected key 'campaignTitle' not found in response.");
      process.exit(1);
    }

  } catch (error) {
    console.error("❌ Gemini API test failed with error:", error);
    process.exit(1);
  }
}

run();
