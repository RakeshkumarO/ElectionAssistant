import { POST } from "../../src/app/api/chat/route";
import { GoogleGenAI } from "@google/genai";

// Mock the GoogleGenAI module
jest.mock("@google/genai", () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => {
      return {
        models: {
          generateContent: jest.fn().mockResolvedValue({
            text: "Mocked AI response",
          }),
        },
      };
    }),
  };
});

// Polyfill Response
if (typeof global.Response === 'undefined') {
  global.Response = class {
    constructor(body: any, init?: any) {
      (this as any).status = init?.status || 200;
      (this as any).body = body;
    }
    static json(data: any, init?: any) {
      return new Response(JSON.stringify(data), init) as any;
    }
    async json() {
      return JSON.parse((this as any).body);
    }
  } as any;
}

describe("Chat API Route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, GEMINI_API_KEY: "test_key" };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should return 400 if message is missing", async () => {
    const req = {
      json: async () => ({}),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid input.");
  });

  it("should return 500 if API key is not configured", async () => {
    delete process.env.GEMINI_API_KEY;
    const req = {
      json: async () => ({ message: "Hello" }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("API key not configured.");
  });

  it("should return AI response on valid input", async () => {
    const req = {
      json: async () => ({ message: "How do I register to vote?" }),
    } as unknown as Request;

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.message).toBe("Mocked AI response");
  });
});

