import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const analyzeResume = async (resumeUrl) => {
  const response = await ai.interactions.create({
    model: "gemini-3.8-flash",

    system_instruction: `
      You are an AI Resume Analyzer.

      Analyze the provided resume professionally.

      Return ONLY valid JSON using exactly this structure:

      {
        "resumeScore": 0,
        "skills": {
          "languages": [],
          "frontend": [],
          "backend": [],
          "database": [],
          "tools": []
        },
        "strengths": [],
        "weaknesses": [],
        "missingSkills": [],
        "improvements": [],
        "recommendedRoles": []
      }

      Rules:

      1. resumeScore must be between 0 and 100.
      2. Extract only skills actually present in the resume.
      3. Categorize skills correctly.
      4. Identify genuine strengths from the resume.
      5. Identify genuine weaknesses.
      6. Identify relevant skills missing from the resume.
      7. Give practical improvement suggestions.
      8. Recommend suitable entry-level job roles based on the resume.
      9. Do not invent skills, experience, projects, certifications,
         achievements, or education.
      10. Return ONLY valid JSON.
      11. Do not use Markdown.
      12. Do not add any explanation outside the JSON.
    `,

    input: [
      {
        type: "document",
        uri: resumeUrl,
        mime_type: "application/pdf"
      },
      {
        type: "text",
        text: "Analyze this resume according to the system instructions."
      }
    ]
  });

  return JSON.parse(response.output_text);
};
export default analyzeResume;