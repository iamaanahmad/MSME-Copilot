import { GoogleGenAI } from '@google/genai';
import { BusinessProfile, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateComplianceChecklist(profile: BusinessProfile, language: Language): Promise<string> {
  const prompt = `
    Generate a comprehensive compliance checklist for a business in India with the following profile:
    - Business Type: ${profile.type}
    - Annual Turnover: ₹${profile.turnover}
    - Number of Employees: ${profile.employees}
    - State: ${profile.state}

    Include GST, TDS, PF, ESI, Professional Tax, and any state-specific or industry-specific compliances.
    Format the output as a clean Markdown list.
    
    IMPORTANT: The output MUST be translated into the following language code: ${language} (en=English, hi=Hindi, ta=Tamil, ur=Urdu).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || 'Failed to generate checklist.';
  } catch (error) {
    console.error('Error generating checklist:', error);
    return 'An error occurred while generating the checklist. Please try again later.';
  }
}

export async function translateText(text: string, targetLanguage: Language): Promise<string> {
  if (targetLanguage === 'en') return text;
  
  const prompt = `Translate the following text to language code ${targetLanguage} (hi=Hindi, ta=Tamil, ur=Urdu). Return ONLY the translated text, no other commentary.\n\nText: ${text}`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || text;
  } catch (error) {
    console.error('Error translating text:', error);
    return text;
  }
}
