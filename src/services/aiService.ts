import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;

// Initialize the client
// The media_resolution parameter is currently only available in the v1alpha API version.
const ai = new GoogleGenAI({ apiKey, apiVersion: "v1alpha" });

export interface AIAnalysisResult {
    summary?: string;
    keywords?: string[];
    document_type?: string;
    date?: string;
    entities?: string[];
    category?: string;
}

export const aiService = {
    async analyzeDocument(fileBase64: string, mimeType: string): Promise<AIAnalysisResult> {
        if (!apiKey) {
            throw new Error("VITE_GOOGLE_GENAI_API_KEY is not set");
        }

        try {
            const isImage = mimeType.startsWith('image/');
            const mediaResolution = isImage ? "media_resolution_high" : "media_resolution_medium";

            const response = await ai.models.generateContent({
                model: "gemini-3-pro-preview", // Using flash for speed/cost, or user requested 3-pro? User requested gemini-3-pro-preview
                // User requested: gemini-3-pro-preview. I should use that.
                // Wait, user said "implement the google gemini 3 pro api".
                // And provided snippet: model: "gemini-3-pro-preview"


                contents: [
                    {
                        parts: [
                            {
                                text: `Analyze this document to make it easily findable. 
                Extract the following information in JSON format:
                - summary: A brief summary of the content.
                - tags: A list of relevant tags.
                - document_type: The type of document (Invoice, Receipt, Contract, Statement, Letter, Other).
                - date: The main date found in the document (YYYY-MM-DD).
                - entities: Important entities (companies, people) mentioned.
                - category: A broad category for organization.
                - metadata: Any additional metadata that might be relevant for finding or categorizing the document.
                
                Return ONLY raw JSON, no markdown formatting.`
                            },
                            {
                                inlineData: {
                                    mimeType: mimeType,
                                    data: fileBase64,
                                },
                                // @ts-ignore - mediaResolution might not be in types yet for v1alpha
                                mediaResolution: {
                                    level: mediaResolution
                                }
                            }
                        ]
                    }
                ],
                config: {
                    responseMimeType: "application/json",
                }
            });
            const text = response.candidates?.[0].content?.parts?.[0].text
            if (!text) throw new Error("No response from AI");

            // Clean up potential markdown code blocks if the model ignores responseMimeType
            const jsonStr = text.replace(/```json\n|\n```/g, '').trim();
            return JSON.parse(jsonStr);

        } catch (error) {
            console.error("AI Analysis failed:", error);
            throw error;
        }
    }
};
