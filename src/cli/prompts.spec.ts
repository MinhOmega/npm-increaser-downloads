import { input, number } from '@inquirer/prompts';
import { getPackageName, getNumberOfDownloads, getMaxConcurrentDownloads, getDownloadTimeout, getConfigFromCli } from "./prompts";
import { Config } from "../models/config.model";

// Mock the @inquirer/prompts module
jest.mock('@inquirer/prompts', () => ({
  input: jest.fn(),
  number: jest.fn(),
}));

describe("cli prompts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getPackageName", () => {
    it("should return the package name when prompted", async () => {
      (input as jest.Mock).mockResolvedValue("test-package");
      const result = await getPackageName();
      expect(result).toBe("test-package");
    });
  });

  describe("getNumberOfDownloads", () => {
    it("should return the number of downloads when prompted", async () => {
      (number as jest.Mock).mockResolvedValue(1000);
      const result = await getNumberOfDownloads();
      expect(result).toBe(1000);
    });
  });

  describe("getMaxConcurrentDownloads", () => {
    it("should return the max concurrent downloads when prompted", async () => {
      (number as jest.Mock).mockResolvedValue(300);
      const result = await getMaxConcurrentDownloads();
      expect(result).toBe(300);
    });
  });

  describe("getDownloadTimeout", () => {
    it("should return the download timeout when prompted", async () => {
      (number as jest.Mock).mockResolvedValue(3000);
      const result = await getDownloadTimeout();
      expect(result).toBe(3000);
    });
  });

  describe("getConfigFromCli", () => {
    it("should return a complete config object when all prompts are answered", async () => {
      (input as jest.Mock).mockResolvedValueOnce("test-package");
      (number as jest.Mock).mockResolvedValueOnce(1000)
        .mockResolvedValueOnce(300)
        .mockResolvedValueOnce(3000);

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
