import { readFileSync } from "node:fs";
import path from "node:path";

import { Options } from "../types";
import { defaultSampleCount } from "../constants";

const filePath = path.join(__dirname, "../../src/config.json");
let config: Options;

const processFileContents = (fileContents: string) => {
  config = JSON.parse(fileContents) as Options;

  if (!config.initialCommand) {
    config.initialCommand = [];
  }
  if (typeof config.lineNumbering !== "boolean") {
    throw new Error(`"lineNumbering" must be true or false.`);
  }
  if (config.sampleCount < 0) {
    throw new Error(
      `"sampleCount" must be positive number. If it is 0, default value ${defaultSampleCount} will be used.`
    );
  }
};

const getConfig = () => config;

try {
  const data = readFileSync(filePath, "utf8");
  processFileContents(data);
} catch (error) {
  console.error(error);
}

export { getConfig };
