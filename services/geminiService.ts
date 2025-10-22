
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        }
        throw new Error('No image was generated.');
    } catch (error) {
        console.error('Error generating image:', error);
        throw new Error('Failed to generate image. Please check the prompt and try again.');
    }
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Image, mimeType: mimeType } },
                    { text: prompt },
                ]
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const part = response.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData) {
            return part.inlineData.data;
        }
        throw new Error('No edited image was returned.');
    } catch (error) {
        console.error('Error editing image:', error);
        throw new Error('Failed to edit image. Please check the prompt and image and try again.');
    }
};


export const createMockup = async (
    base64Logo: string,
    logoMimeType: string,
    base64MockupImage: string,
    mockupMimeType: string,
    prompt: string
): Promise<string> => {
     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64MockupImage, mimeType: mockupMimeType } },
                    { inlineData: { data: base64Logo, mimeType: logoMimeType } },
                    { text: prompt },
                ]
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const part = response.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData) {
            return part.inlineData.data;
        }
        throw new Error('No mockup image was returned.');
    } catch (error) {
        console.error('Error creating mockup:', error);
        throw new Error('Failed to create mockup. Please check the images and try again.');
    }
};
