// app/api/identify/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Initialize Google Gemini AI with safety settings
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get('image');
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert file to bytes
    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString('base64');

    // Get the Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create parts for the generation
    const prompt = "Identify this plant and provide its name, scientific name, family, a brief description, and basic care instructions (water, light, and soil requirements). Format the response as a JSON object.";

    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: image.type,
        },
      },
    ];


    // Generate content with snake_case properties
    const result = await model.generateContent([prompt, ...imageParts]);

    const response = await result.response;
    let plantData;
    
    try {
      const responseText = response.text().trim();
      // Handle potential markdown code block wrapping
      const jsonStr = responseText.replace(/```json\n?|\n?```/g, '');
      plantData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', response.text());
      
      plantData = {
        name: "Unknown",
        scientificName: "Not identified",
        description: "Unable to process the plant information properly. Please try again with a clearer image.",
        careInstructions: ["Unable to generate specific care instructions"]
      };
    }

    return NextResponse.json(plantData);
  } catch (error) {
    console.error('Error identifying plant:', error);
    return NextResponse.json(
      { 
        error: 'Failed to identify plant', 
        details: error.message,
        suggestion: "Please ensure you're using a clear image of a plant and try again."
      },
      { status: 500 }
    );
  }
}
