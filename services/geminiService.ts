
import { GoogleGenAI } from "@google/genai";
import { HealthCategory, UserDetails } from "../types";

export const generateHealthTips = async (
  category: HealthCategory,
  categoryLabel: string,
  userDetails: UserDetails,
  customQuery?: string
): Promise<string> => {
  try {
    // Initialize AI with the environment variable using the required named parameter object
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const agePart = userDetails.age ? `User Age: ${userDetails.age}.` : '';
    const genderPart = userDetails.gender ? `User Gender: ${userDetails.gender}.` : '';
    
    let topic = categoryLabel;
    if (category === HealthCategory.CUSTOM && customQuery) {
        topic = customQuery;
    }

    const systemInstruction = `You are "Swasthya Saathi", a knowledgeable and caring Indian health expert.
    
    Target Audience: Hindi speaking Indians (Rural + Urban).
    
    *** CRITICAL INSTRUCTION: VALIDATION FIRST ***
    If input is Gibberish OR Unrelated to Health, respond with ONLY:
    "माफ़ कीजिये, मैं केवल स्वास्थ्य (Health) से जुड़ी समस्याओं में मदद कर सकता हूँ। कृपया कोई बीमारी या लक्षण बताएं।"

    Task: Provide comprehensive, detailed, and practical health tips.
    
    Guidelines:
    1. Language: STRICTLY HINDI (Simple, warm).
    2. Depth: Detailed explanations of "Why" and "How".
    3. Focus: Ayurvedic remedies, lifestyle, yoga, and dietary habits.
    
    Structure:
    - **Introduction**
    - **Understanding the Issue**
    - **Detailed Tips (5-7 Points with Emojis)**
    - **Home Remedy (Gharelu Nuskha)**
    - **Daily Routine Suggestion**
    - **Conclusion**
    
    SAFETY:
    - NO Allopathic prescriptions.
    - Advise doctor consultation for severe symptoms.
    - Disclaimer auto-added via UI, but mention in text naturally.`;

    const prompt = `Topic/Query: "${topic}". \nContext: ${agePart} ${genderPart}. Provide a full detailed guide in Hindi.`;

    // Updated model to 'gemini-3-pro-preview' for complex reasoning tasks like health advice.
    // Removed maxOutputTokens to avoid the requirement of setting a thinkingBudget as per the guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });

    // Access the .text property directly (do not call as a method)
    return response.text || "माफ़ी क्षमा करें, अभी जानकारी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।";
  } catch (error) {
    console.error("AI Error:", error);
    return "तकनीकी समस्या के कारण अभी टिप्स नहीं मिल पा रहे हैं। कृपया अपना इंटरनेट चेक करें और दोबारा कोशिश करें।";
  }
};
