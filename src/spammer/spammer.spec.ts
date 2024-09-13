import MockConsole from "jest-mock-console";
import { cleanAll } from "nock";

import { setMockConfig } from "../../test-utils/mock-config";
import { getMockStats } from "../../test-utils/mock-stats";
import { MOCK_PACKAGE_VERSION, setMockErrorResponses, setMockResponses } from "../../test-utils/set-http-mocks";

import { downloadPackage, getNpmjsResponse, getNpmsioResponse, getVersionPackage, run } from "./spammer";

describe("spammer", () => {
  beforeEach(() => {
    cleanAll();
    MockConsole();
    setMockConfig();
  });

  describe("getNpmsioResponse()", () => {
    it("resolves when response is 200", async () => {
      setMockResponses();
      await expect(getNpmsioResponse()).resolves.not.toThrowError();
    });

    it("throws error when request fails", async () => {
      setMockErrorResponses();
      await expect(getNpmsioResponse()).rejects.toThrowError(
        new Error(
          `Failed to download https://api.npms.io/v2/package/code-review-leaderboard\n` +
            `request to https://api.npms.io/v2/package/code-review-leaderboard failed, reason: test message`,
        ),
      );
    });
  });

  describe("getNpmjsResponse()", () => {
    it("resolves when response is 200", async () => {
      setMockResponses({ npms: false, npmjs: true });
      await expect(getNpmjsResponse()).resolves.not.toThrowError();
    });

    it("throws error when request fails", async () => {
      setMockErrorResponses();
      await expect(getNpmjsResponse()).rejects.toThrowError(
        new Error(
          `Failed to download https://registry.npmjs.org/code-review-leaderboard/latest\n` +
            `request to https://registry.npmjs.org/code-review-leaderboard/latest failed, reason: test message`,
        ),
      );
    });
  });

  describe("getVersionPackage()", () => {
    it("resolves with version from npms.io when available", async () => {
      setMockResponses({ npms: true, npmjs: false });
      await expect(getVersionPackage()).resolves.toBe(MOCK_PACKAGE_VERSION);
    });

    it("falls back to npmjs.com when npms.io fails", async () => {
      setMockErrorResponses({ npms: true, npmjs: false });
      setMockResponses({ npms: false, npmjs: true });
      console.log = jest.fn(); // Mock console.log to avoid output during tests
      await expect(getVersionPackage()).resolves.toBe(MOCK_PACKAGE_VERSION);
    });

    it("throws error when both npms.io and npmjs.com fail", async () => {
      setMockErrorResponses({ npms: true, npmjs: true });
      await expect(getVersionPackage()).rejects.toThrow(/Failed to get package version/);
    });
  });

  describe("downloadPackage()", () => {
    it("increments successfulDownloads when response is 200", async () => {
      setMockResponses();
      const stats = getMockStats();
      await downloadPackage(MOCK_PACKAGE_VERSION, stats);
      expect(stats.successfulDownloads).toBe(501);
    });

    it("increments failedDownloads when request fails", async () => {
      setMockErrorResponses();
      const stats = getMockStats();
      await downloadPackage(MOCK_PACKAGE_VERSION, stats);
      expect(stats.failedDownloads).toBe(301);
    });
  });

  describe("run()", () => {
    it("resolves when responses are all successful", async () => {
      setMockResponses();
      await expect(run()).resolves.not.toThrowError();
    });

    it("resolves when responses include failures", async () => {
      setMockErrorResponses();
      await expect(run()).resolves.not.toThrowError();
    });
  });
});
