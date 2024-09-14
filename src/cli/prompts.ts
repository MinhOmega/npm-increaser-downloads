import { input, number } from '@inquirer/prompts';
import { Config } from "../models/config.model";
import { validateNumbers, validatePackageName } from "./validators";

export const getPackageName = async (): Promise<string> => {
  return input({
    message: "Package name: ",
    validate: (name: string) => validatePackageName(name),
  });
};

export const getNumberOfDownloads = async (): Promise<number> => {
  const result = await number({
    message: "Number of downloads: ",
    default: 1000,
    validate: (downloads: number | undefined) => validateNumbers(downloads),
  });
  return result ?? 1000;
};

export const getMaxConcurrentDownloads = async (): Promise<number> => {
  const result = await number({
    message: "Number of concurrent downloads: ",
    default: 300,
    validate: (downloads: number | undefined) => validateNumbers(downloads),
  });
  return result ?? 300;
};

export const getDownloadTimeout = async (): Promise<number> => {
  const result = await number({
    message: "Time to wait for a download to complete (in ms): ",
    default: 3000,
    validate: (downloads: number | undefined) => validateNumbers(downloads),
  });
  return result ?? 3000;
};

const getEmptyConfig = (): Config => {
  return {
    packageName: "",
    numDownloads: 0,
    maxConcurrentDownloads: 0,
    downloadTimeout: 0,
  };
};

export const getConfigFromCli = async (): Promise<Config> => {
  const config: Config = getEmptyConfig();

  config.packageName = await getPackageName();
  config.numDownloads = await getNumberOfDownloads();
  config.maxConcurrentDownloads = await getMaxConcurrentDownloads();
  config.downloadTimeout = await getDownloadTimeout();

  return config;
};
