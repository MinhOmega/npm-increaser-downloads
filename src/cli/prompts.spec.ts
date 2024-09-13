import prompts from "prompts";
import { getPackageName, getNumberOfDownloads, getMaxConcurrentDownloads, getDownloadTimeout, getConfigFromCli } from "./prompts";
import { Config } from "../models/config.model";

// Mock the prompts module
jest.mock("prompts");
const mockPrompts = prompts as jest.MockedFunction<typeof prompts>;

describe("cli prompts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getPackageName", () => {
    it("should return the package name when prompted", async () => {
      mockPrompts.mockResolvedValue({ value: "test-package" });
      const result = await getPackageName();
      expect(result).toBe("test-package");
    });
  });

  describe("getNumberOfDownloads", () => {
    it("should return the number of downloads when prompted", async () => {
      mockPrompts.mockResolvedValue({ value: 1000 });
      const result = await getNumberOfDownloads();
      expect(result).toBe(1000);
    });
  });

  describe("getMaxConcurrentDownloads", () => {
    it("should return the max concurrent downloads when prompted", async () => {
      mockPrompts.mockResolvedValue({ value: 300 });
      const result = await getMaxConcurrentDownloads();
      expect(result).toBe(300);
    });
  });

  describe("getDownloadTimeout", () => {
    it("should return the download timeout when prompted", async () => {
      mockPrompts.mockResolvedValue({ value: 3000 });
      const result = await getDownloadTimeout();
      expect(result).toBe(3000);
    });
  });

  describe("getConfigFromCli", () => {
    it("should return a complete config object when all prompts are answered", async () => {
      mockPrompts.mockResolvedValueOnce({ value: "test-package" })
        .mockResolvedValueOnce({ value: 1000 })
        .mockResolvedValueOnce({ value: 300 })
        .mockResolvedValueOnce({ value: 3000 });

      const expectedConfig: Config = {
        packageName: "test-package",
        numDownloads: 1000,
        maxConcurrentDownloads: 300,
        downloadTimeout: 3000,
      };

      const result = await getConfigFromCli();
      expect(result).toEqual(expectedConfig);
    });
  });
});
