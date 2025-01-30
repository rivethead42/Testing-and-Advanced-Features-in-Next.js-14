import { GET } from "@/app/api/about/route";
import { createMocks } from 'node-mocks-http';

describe('About API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return data with status 200', async () => {
        const response = await GET();
        const body = await response.json();
    
        expect(response.status).toBe(200);
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('content');
        expect(typeof body.content).toBe('string');
    });

    it('should return a 200 response with a message on GET', async () => {
        const { req } = createMocks({
            method: 'GET',
        });
    
        const response = await GET(req);
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('content');
        expect(typeof body.content).toBe('string');
    });
});