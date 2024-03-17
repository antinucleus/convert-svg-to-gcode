import { readFileSync } from "node:fs";
import path from "node:path";

import { Options } from "../types";
import { defaultSampleCount } from "../constants";
import { configStore } from "../stores";

const filePath = path.join(__dirname, "../../src/config.json");
let config: Options;
const { updateConfig } = configStore();

const processFileContents = (fileContents: string) => {
  config = JSON.parse(fileContents) as Options;

  if (!config.svgFileName) {
    throw new Error(`"svgFileName" field must be provided.`);
  } else if (typeof config.svgFileName !== "string") {
    throw new Error(`"svgFileName" value must be string.`);
  }

  if (!config.initialCommand) {
    config.initialCommand = [];
  } else if (!Array.isArray(config.initialCommand)) {
    throw new Error(`"initialCommand" value must be array.`);
  }

  if (!config.lineNumbering) {
    config.lineNumbering = false;
  } else if (typeof config.lineNumbering !== "boolean") {
    throw new Error(`"lineNumbering" value must be true or false.`);
  }

  if (!config.sampleCount || config.sampleCount === 0) {
    config.sampleCount = defaultSampleCount;
  } else if (typeof config.sampleCount !== "number") {
    throw new Error(`"sampleCount" value must be number.`);
  } else if (config.sampleCount < 0) {
    throw new Error(
      `"sampleCount" value must be positive number. If it is 0, default value ${defaultSampleCount} will be used.`
    );
  }

  if (!config.separator) {
    config.separator = null;
  } else if (typeof config.separator !== "string") {
    throw new Error(`"separator" value must be string.`);
  }

  console.log("\nConfig: ", config);
  updateConfig(config);
};

const checkConfigFile = () => {
  try {
    console.info("Reading config file");

    const data = readFileSync(filePath, "utf8");
    processFileContents(data);
  } catch (error) {
    throw new Error(error);
  }
};

export { checkConfigFile };
