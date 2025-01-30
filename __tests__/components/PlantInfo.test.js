import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlantInfo from '@/app/components/PlantInfo';
import { POST } from '@/app/api/identify/route';

jest.mock('../../app/api/identify/route');

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

describe('PlantInfo Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should renders all plant information when complete data is provided', () => {
        render(<PlantInfo plantInfo={mockPlantData} />);

        expect(screen.getByText(mockPlantData.name)).toBeInTheDocument();
        expect(screen.getByText(mockPlantData.scientific_name)).toBeInTheDocument();
        expect(screen.getByText(mockPlantData.family)).toBeInTheDocument();
        expect(screen.getByText(mockPlantData.description)).toBeInTheDocument();

        const infoSection = screen.getByTestId('plant-info');
        expect(within(infoSection).getByText(mockPlantData.care_instructions.water)).toBeInTheDocument();
        expect(within(infoSection).getByText(mockPlantData.care_instructions.light)).toBeInTheDocument();
        expect(within(infoSection).getByText(mockPlantData.care_instructions.soil)).toBeInTheDocument();

        const careSection = screen.getByTestId('care-instructions');
        expect(within(careSection).getByText(mockPlantData.care_instructions.water)).toBeInTheDocument();
        expect(within(careSection).getByText(mockPlantData.care_instructions.light)).toBeInTheDocument();
        expect(within(careSection).getByText(mockPlantData.care_instructions.soil)).toBeInTheDocument();
    });

    it('should successfully identify a plant from an image', async () => {
        const mockResponse = { 
            status: 200, 
            json: () => Promise.resolve(mockPlantData)
        };

        POST.mockResolvedValue(mockResponse);
        const formData = new FormData();
        const mockFile = new Blob(['test'], { type: 'image/jpeg' });
        formData.append('image', mockFile);

        const response = await POST(formData);

        expect(response.status).toBe(200);
        const data = await response.json();

        render(<PlantInfo plantInfo={data} />);

        // Check main information
        const infoSection = screen.getByTestId('care-instructions');
        expect(screen.getByText(mockPlantData.name)).toBeInTheDocument();
        expect(screen.getByText(mockPlantData.scientific_name)).toBeInTheDocument();
        expect(screen.getByText(mockPlantData.family)).toBeInTheDocument();
        expect(screen.getByText(mockPlantData.description)).toBeInTheDocument();
        expect(within(infoSection).getByText(mockPlantData.care_instructions.water)).toBeInTheDocument();
        expect(within(infoSection).getByText(mockPlantData.care_instructions.light)).toBeInTheDocument();
        expect(within(infoSection).getByText(mockPlantData.care_instructions.soil)).toBeInTheDocument();

        // Check care instructions
        const careSection = screen.getByTestId('care-instructions');
        expect(within(careSection).getByText(mockPlantData.care_instructions.water)).toBeInTheDocument();
        expect(within(careSection).getByText(mockPlantData.care_instructions.light)).toBeInTheDocument();
        expect(within(careSection).getByText(mockPlantData.care_instructions.soil)).toBeInTheDocument();
    });
});