import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// Mock the child components
jest.mock('../../app/components/ImageUpload', () => {
    return function MockImageUpload({ onUpload, loading }) {
      return (
        <div data-testid="image-upload">
          <input 
            type="file" 
            data-testid="file-input" 
            onChange={(e) => onUpload(e.target.files[0])}
            disabled={loading}
          />
        </div>
      );
    };
});

jest.mock('../../app/components/PlantInfo', () => {
    return function MockPlantInfo({ plantInfo }) {
      return <div data-testid="plant-info">{plantInfo.name}</div>;
    };
});
  
  jest.mock('../../app/components/FeatureCards', () => {
    return function MockFeatureCards() {
      return <div data-testid="feature-cards">Feature Cards</div>;
    };
});

describe('Home Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        global.fetch.mockClear();
    });

    it('shoud renders without crashing', () => {
        render(<Home />);
        expect(screen.getByText('PlantPal')).toBeInTheDocument();
        expect(screen.getByText('Identify plants and get care instructions in seconds!')).toBeInTheDocument();
    });

    it('shoud handles successful image upload', async () => {
        // Mock successful API response
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ name: 'Test Plant' })
        });
    
        render(<Home />);
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
        const input = screen.getByTestId('file-input');
    
        fireEvent.change(input, { target: { files: [file] } });
    
        await waitFor(() => {
          expect(screen.getByTestId('plant-info')).toBeInTheDocument();
          expect(screen.getByText('Test Plant')).toBeInTheDocument();
        });
    });

    it('shoud displays error message on API failure', async () => {
        // Mock failed API response
        global.fetch.mockResolvedValueOnce({
            ok: false
        });
    
        render(<Home />);
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
        const input = screen.getByTestId('file-input');
    
        fireEvent.change(input, { target: { files: [file] } });
    
        await waitFor(() => {
            expect(screen.getByText('Failed to identify plant')).toBeInTheDocument();
        });
    });

    it('shows loading state during API call', async () => {
        // Mock delayed API response
        global.fetch.mockImplementationOnce(() => 
          new Promise(resolve => 
            setTimeout(() => 
                resolve({
                    ok: true,
                    json: async () => ({ name: 'Test Plant' })
                }), 
                100
            )
          )
        );
    
        render(<Home />);
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
        const input = screen.getByTestId('file-input');
    
        fireEvent.change(input, { target: { files: [file] } });
        expect(input).toBeDisabled();
    
        await waitFor(() => {
            expect(input).not.toBeDisabled();
        });
    });
});