import { GaxiosError } from "gaxios";
import nock from "nock";
import { getConfig } from "../src/config";
import mockNpmsResponse from "./mock-npms-response.json";
import mockNpmjsResponse from "./mock-npmjs-response.json";

export const MOCK_PACKAGE_VERSION = mockNpmsResponse.collected.metadata.version;

const MOCK_ERROR_RESPONSE: GaxiosError<unknown> = {
  config: {
    url: "test url",
  },
  message: "test message",
  name: "test name",
};

const setMockNpmsResponse = (): void => {
  nock("https://api.npms.io").get(`/v2/package/${getConfig().packageName}`).reply(200, mockNpmsResponse);
};

const setMockNpmjsResponse = (): void => {
  nock("https://registry.npmjs.org").get(`/${getConfig().packageName}/latest`).reply(200, mockNpmjsResponse);
};

const setMockDownloadResponse = (): void => {
  nock("https://registry.yarnpkg.com")
    .get(`/${getConfig().packageName}/-/${getConfig().packageName}-${MOCK_PACKAGE_VERSION}.tgz`)
    .reply(200, {});
};

const setMockNpmsErrorResponse = (): void => {
  nock("https://api.npms.io").get(`/v2/package/${getConfig().packageName}`).replyWithError(MOCK_ERROR_RESPONSE);
};

const setMockNpmjsErrorResponse = (): void => {
  nock("https://registry.npmjs.org").get(`/${getConfig().packageName}/latest`).replyWithError(MOCK_ERROR_RESPONSE);
};

const setMockDownloadErrorResponse = (): void => {
  nock("https://registry.yarnpkg.com")
    .get(`/${getConfig().packageName}/-/${getConfig().packageName}-${MOCK_PACKAGE_VERSION}.tgz`)
    .replyWithError(MOCK_ERROR_RESPONSE);
};

export const setMockResponses = (options = { npms: true, npmjs: false }): void => {
  if (options.npms) {
    setMockNpmsResponse();
  }
  if (options.npmjs) {
    setMockNpmjsResponse();
  }
  for (let i = 0; i <= getConfig().numDownloads; i++) {
    setMockDownloadResponse();
  }
};

export const setMockErrorResponses = (options = { npms: true, npmjs: true }): void => {
  if (options.npms) {
    setMockNpmsErrorResponse();
  }
  if (options.npmjs) {
    setMockNpmjsErrorResponse();
  }
  setMockDownloadErrorResponse();
};
