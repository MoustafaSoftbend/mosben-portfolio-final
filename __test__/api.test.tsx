"user server";
import { createMocks } from "node-mocks-http";
import { GET, POST } from "../app/api/images/route";
import puppeteer from "puppeteer";
import { promises as fs } from "fs";

jest.mock("puppeteer");
jest.mock("fs", () => ({
  promises: {
    readdir: jest.fn(),
    unlink: jest.fn(),
  },
}));

describe("/api/images", () => {
  it("should return a JSON response with images for GET", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(expect.any(Array)); // Adjust expected data
  });

  it("should process POST request and return response", async () => {
    const mockScreenshot = "mockScreenshot.png";
    (puppeteer.launch as jest.Mock).mockResolvedValue({
      newPage: jest.fn().mockResolvedValue({
        goto: jest.fn(),
        evaluate: jest.fn().mockResolvedValue(1000), // Example value for document height
        screenshot: jest.fn().mockResolvedValue(mockScreenshot),
      }),
      close: jest.fn(),
    });

    fs.readdir.mockResolvedValue([mockScreenshot]);
    fs.unlink.mockResolvedValue();

    const { req, res } = createMocks({
      method: "POST",
      body: JSON.stringify({ url: "http://example.com", fullPage: true }),
    });

    await POST(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(expect.any(Array)); // Adjust expected data
  });
});
