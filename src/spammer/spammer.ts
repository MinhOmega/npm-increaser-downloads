import { GaxiosError, GaxiosResponse, request } from "gaxios";
import { logComplete, logDownload, logError } from "../cli/logger";
import { getConfig } from "../config";
import { NpmjsResponse } from "../models/npmjs-response.model";
import { NpmsioResponse } from "../models/npmsio-response.model";
import { Stats } from "../models/stats.model";
import { getEncodedPackageName, stripOrganisationFromPackageName } from "./utils";

export const getNpmsioResponse = async () => {
  const encodedPackageName: string = getEncodedPackageName(getConfig().packageName);

  const npmsioResponse: GaxiosResponse<NpmsioResponse> = await request<NpmsioResponse>({
    baseUrl: "https://api.npms.io",
    url: `/v2/package/${encodedPackageName}`,
    method: "GET",
  }).catch((response: GaxiosError<NpmsioResponse>) => {
    throw Error(`Failed to download ${response.config.url}\n${response.message}`);
  });

  return npmsioResponse.data;
};

export const getNpmjsResponse = async (): Promise<NpmjsResponse> => {
  const encodedPackageName: string = getEncodedPackageName(getConfig().packageName);

  const npmsResponse: GaxiosResponse<NpmjsResponse> = await request<NpmjsResponse>({
    baseUrl: "https://registry.npmjs.org",
    url: `/${encodedPackageName}/latest`,
    method: "GET",
  }).catch((response: GaxiosError<NpmjsResponse>) => {
    throw Error(`Failed to download ${response.config.url}\n${response.message}`);
  });

  return npmsResponse.data;
};

export const getVersionPackage = async (): Promise<string> => {
  try {
    const npmioResponse = await getNpmsioResponse();
    return npmioResponse.collected.metadata.version;
  } catch (npmioError) {
    console.log("Package not found in npms.io, trying npmjs.com...");
    try {
      const npmjsResponse = await getNpmjsResponse();
      console.log(`Package found on npmjs.com with version ${npmjsResponse.version}`);
      return npmjsResponse.version;
    } catch (npmjsError) {
      throw new Error(`Failed to get package version: ${npmioError.message}, ${npmjsError.message}`);
    }
  }
}

export const downloadPackage = async (version: string, stats: Stats): Promise<unknown> => {
  const packageName: string = getConfig().packageName;
  const unscopedPackageName: string = stripOrganisationFromPackageName(packageName);

  return request<unknown>({
    baseUrl: "https://registry.yarnpkg.com",
    url: `/${packageName}/-/${unscopedPackageName}-${version}.tgz`,
    method: "GET",
    timeout: getConfig().downloadTimeout,
    responseType: "stream",
  })
    .then(() => {
      stats.successfulDownloads++;
    })
    .catch((error) => {
      stats.failedDownloads++;
      console.error("Download failed:", error.message);
    });
};

const spamDownloads = async (version: string, stats: Stats): Promise<void> => {
  const batchSize = Math.min(getConfig().maxConcurrentDownloads, 50); // Limit to 50 concurrent downloads
  const totalDownloads = getConfig().numDownloads;

  for (let i = 0; i < totalDownloads; i += batchSize) {
    const batch = Math.min(batchSize, totalDownloads - i);
    const requests: Promise<unknown>[] = [];

    for (let j = 0; j < batch; j++) {
      requests.push(downloadPackage(version, stats));
    }

    await Promise.all(requests);

    // Add a small delay between batches to allow for connection cleanup
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};

/**
 * Runs the download spammer.
 * @returns A Promise that resolves when the spamming is complete.
 */
export const run = async (): Promise<void> => {
  try {
    const version: string = await getVersionPackage();
    const startTime: number = Date.now();
    const stats: Stats = new Stats(startTime);

    const loggingInterval: NodeJS.Timeout = setInterval(() => logDownload(stats), 1000);
    await spamDownloads(version, stats);

    clearInterval(loggingInterval);
    logComplete();
  } catch (e: unknown) {
    logError(e as Error);
  }
};
