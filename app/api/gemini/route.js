import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
    try {
        if (!process.env.GOOGLE_API_KEY) {
            throw new Error('GOOGLE_API_KEY is not configured');
        }

        const body = await req.json();
        const { message, formData, messageHistory } = body;

        // Validate required fields
        if (!message || !formData) {
            return new Response(
                JSON.stringify({ 
                    error: 'Missing required fields' 
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Create context from form data and message history
        const context = `
            Business Context:
            - Industry: ${formData.industry || 'Not specified'}
            - Business Size: ${formData.employeeRange || 'Not specified'} employees
            - Location: ${formData.location || 'Not specified'}
            - Social Media Experience: ${formData.socialMediaExp || 'Not specified'}
            - Active Social Platforms: ${
                formData.socialPlatforms ? 
                Object.entries(formData.socialPlatforms)
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
                    .join(', ') : 
                'None'
            }
            - Business Description: ${formData.businessDesc || 'Not specified'}

            Previous conversation context:
            ${messageHistory ? messageHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n') : ''}

            Current user message: ${message}

            Instructions: You are a Website Creation Assistant designed to help users create or get a website. You should only provide guidance related to website development and avoid any unrelated topics. Your responses should be clear, structured, and based on the user's skill level and needs.
        `;

        const result = await model.generateContent(context);
        
        if (!result || !result.response) {
            throw new Error('Invalid response from Gemini API');
        }

        const text = result.response.text();
        
        if (!text) {
            throw new Error('Empty response from Gemini API');
        }

        return new Response(
            JSON.stringify({ 
                response: text,
                status: 'success'
            }), {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
            }
        );

    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({ 
                error: 'Failed to generate response',
                details: error.message,
                status: 'error'
            }), {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
            }
        );
    }
}