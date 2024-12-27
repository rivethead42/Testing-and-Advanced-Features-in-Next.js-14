/**
 * @swagger
 * /api/identify:
 *   post:
 *     description: Returns plant info based off an image sent to Google Gemini
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: base64
 *           encoding:
 *             image:
 *               contentType: image/png, image/jpeg
 *     responses:
 *       200:
 *         description: Returns plant info in a JSON format
 */

// app/api/identify/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import path from "path";
import { writeFile, mkdir } from 'fs/promises';

// Initialize Google Gemini AI with safety settings
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// Helper function to save file
async function saveFile(file) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `${timestamp}-${originalName}`;

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), 'public/assets');
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return public URL
    return `/assets/${filename}`;
  } catch(error) {
    console.error('Error saving file:', error);
    throw error;
  }
}
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

    // Save image and get public URL
    await saveFile(image);

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
