import { POST } from '@/app/api/identify/route';

// Mock plant data with all possible fields
const mockPlantData = {
    name: "Japanese Maple",
    scientific_name: "Acer palmatum",
    family: "Aceraceae",
    description: "A small, deciduous tree with delicate, palm-shaped leaves that turn vibrant red in autumn.",
    care_instructions: {
        water: "Keep soil consistently moist but not waterlogged",
        light: "Partial shade to filtered sunlight",
        soil: "Well-draining, slightly acidic soil rich in organic matter"
    }
};

// Mock call to Google Gemini
jest.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockImplementation(() => ({
        generateContent: jest.fn().mockResolvedValue({
          response: { text: () => JSON.stringify(mockPlantData) }
        })
      }))
    }))
}));

jest.mock('fs/promises', () => ({
    mkdir: jest.fn().mockResolvedValue(undefined),
    writeFile: jest.fn().mockResolvedValue(undefined)
}));

describe('Identify API', () => {
    const mockRequest = (body) => ({
        formData: () => Promise.resolve(body)
    });

    it('should handle valid image upload', async () => {
        const formData = new FormData();
        const mockFile = new Blob(['test'], { type: 'image/jpeg' });
        formData.append('image', mockFile);

        const response = await POST(mockRequest(formData));
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('scientific_name');
        expect(data).toHaveProperty('family');
        expect(data).toHaveProperty('description');
        expect(data).toHaveProperty('care_instructions');
    });

    it('should handles missing image', async () => {
        const formData = new FormData();
        const response = await POST(mockRequest(formData));
        const data = await response.json();
    
        expect(response.status).toBe(400);
        expect(data.error).toBe('No image provided');
    });
});