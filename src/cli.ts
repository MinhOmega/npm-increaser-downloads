#!/usr/bin/env node

import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";
import { getConfigFromCli } from "./cli/prompts";
import { setConfig } from "./config";
import { Config } from "./models/config.model";
import { run } from "./spammer/spammer";

const argv = yargs(hideBin(process.argv))
  .usage(
    "Usage: nid [options]\n\n" +
      "Note: if no options are provided, nid will prompt for input interactively.\n\n" +
      "For advanced configuration, use npm-increaser-downloads.config.ts in the root directory.\n" +
      "See also the sample: https://github.com/MinhOmega/npm-increaser-downloads#readme\n\n" +
      "Examples:\n\n" +
      "  $ nid\n" +
      "  $ nid -p my-package -n 1000 -m 300 -t 3000\n" +
      "  $ nid --package-name my-package --num-downloads 1000 --max-concurrent-downloads 300 --download-timeout 3000\n\n" +
      "All options are documented under: nid help",
  )
  .option("package-name", {
    alias: "p",
    type: "string",
    description: "NPM package to increase the downloads of",
  })
  .option("num-downloads", {
    alias: "n",
    type: "number",
    description: "Number of times to download the package",
  })
  .option("max-concurrent-downloads", {
    alias: "m",
    type: "number",
    description: "Amount of downloads to run in parallel at once",
  })
  .option("download-timeout", {
    alias: "t",
    type: "number",
    description: "Max time (in ms) to wait for a download to complete",
  })
  .help()
  .alias("help", "h")
  .epilogue("For more information, visit https://github.com/MinhOmega/npm-increaser-downloads").argv;

const runWithArgs = (
  args: Arguments<{
    "package-name"?: string;
    "num-downloads"?: number;
    "max-concurrent-downloads"?: number;
    "download-timeout"?: number;
  }>,
) => {
  // Check if any relevant argument was provided
  const hasAnyArg = ["package-name", "num-downloads", "max-concurrent-downloads", "download-timeout"].some(
    (arg) => args[arg] !== undefined
  );

  if (!hasAnyArg) {
    // If no relevant arguments were provided, fall back to CLI prompts
    getConfigFromCli().then(setConfig).then(run);
    return;
  }

  const config: Partial<Config> = {
    packageName: args["package-name"],
    numDownloads: args["num-downloads"],
    maxConcurrentDownloads: args["max-concurrent-downloads"],
    downloadTimeout: args["download-timeout"],
  };

  const isConfigComplete = Object.values(config).every((value) => value !== undefined);

  if (isConfigComplete) {
    setConfig(config as Config);
    run();
  } else {
    // If any argument was provided but config is incomplete, show help and exit
    console.log("Incomplete configuration. Please provide all required options or run without arguments for interactive mode.");
    yargs.showHelp();
    process.exit(1);
  }
};

runWithArgs(
  argv as Arguments<{
    "package-name"?: string;
    "num-downloads"?: number;
    "max-concurrent-downloads"?: number;
    "download-timeout"?: number;
  }>,
);
