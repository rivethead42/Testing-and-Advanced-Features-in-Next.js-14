// pages/api/identify.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import formidable from 'formidable';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export const config = {
  api: {
    bodyParser: false, // Disable the built-in bodyParser to handle form data
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the form data
    const form = formidable();
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const imageFile = files.image;
    
    if (!imageFile) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Read the file and convert to base64
    const imageBuffer = await require('fs/promises').readFile(imageFile[0].filepath);
    const base64Image = imageBuffer.toString('base64');

    // Get the Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create prompt and image parts
    const prompt = "Identify this plant and provide its name, scientific name, family, a brief description, and basic care instructions (water, light, and soil requirements). Format the response as a JSON object.";

    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: imageFile[0].mimetype,
        },
      },
    ];

    // Generate content
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

    return res.status(200).json(plantData);

  } catch (error) {
    console.error('Error identifying plant:', error);
    return res.status(500).json({ 
      error: 'Failed to identify plant', 
      details: error.message,
      suggestion: "Please ensure you're using a clear image of a plant and try again."
    });
  }
}