import { Options } from "../types";
import {
  defaultFill,
  defaultInitialCommand,
  defaultLineNumbering,
  defaultSampleCount,
  defaultUnit,
} from "../constants";

let config: Options;

const checkConfigFile = (fileContents: string) => {
  config = JSON.parse(fileContents) as Options;

  if (config.svgFileName === undefined) {
    throw new Error(`"svgFileName" field must be provided.`);
  } else if (typeof config.svgFileName !== "string") {
    throw new Error(`"svgFileName" value must be string.`);
  }

  if (config.unit === undefined) {
    config.unit = defaultUnit;
  } else if (typeof config.unit !== "string") {
    throw new Error(`"unit" field must be string.`);
  } else if (config.unit !== "in" && config.unit !== "mm") {
    throw new Error(`"unit" field must be "mm" or "in".`);
  }

  if (config.width === undefined && config.height === undefined) {
    throw new Error(
      `At least one of the "width" or "height" field must be provided.`
    );
  } else if (config.width && typeof config.width !== "number") {
    throw new Error(`"width" field must be number.`);
  } else if (config.height && typeof config.height !== "number") {
    throw new Error(`"height" field must be number.`);
  }

  if (config.fill === undefined) {
    config.fill = defaultFill;
  } else if (typeof config.fill !== "boolean") {
    throw new Error(`"fill" field must be boolean.`);
  }

  if (!config.initialCommand) {
    config.initialCommand = defaultInitialCommand;
  } else if (!Array.isArray(config.initialCommand)) {
    throw new Error(`"initialCommand" value must be an array.`);
  }

  if (config.lineNumbering === undefined) {
    config.lineNumbering = defaultLineNumbering;
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

  return config;
};

export { checkConfigFile };
