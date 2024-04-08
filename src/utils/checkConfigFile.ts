import { Options } from "../types";
import {
  configFileDefaultValues,
  defaultUnit,
  errorMessages,
} from "../constants";

let config: Options;

const checkConfigFile = (fileContents: string) => {
  config = JSON.parse(fileContents) as Options;

  const {
    defaultFill,
    defaultInitialCommand,
    defaultLineNumbering,
    defaultSampleCount,
  } = configFileDefaultValues;

  const {
    configFileErrorMessages: {
      fill,
      height,
      initialCommand,
      lineNumbering,
      sampleCount,
      svgFileName,
      unit,
      width,
    },
  } = errorMessages;

  if (config.svgFileName === undefined) {
    throw new Error(svgFileName.missingFieldError);
  } else if (typeof config.svgFileName !== "string") {
    throw new Error(svgFileName.typeError);
  }

  if (config.unit === undefined) {
    config.unit = defaultUnit;
  } else if (typeof config.unit !== "string") {
    throw new Error(unit.typeError);
  } else if (config.unit !== "in" && config.unit !== "mm") {
    throw new Error(unit.unmatchedValue);
  }

  if (config.width === undefined && config.height === undefined) {
    throw new Error(width.missingFieldError);
  } else if (config.width && typeof config.width !== "number") {
    throw new Error(width.typeError);
  } else if (config.height && typeof config.height !== "number") {
    throw new Error(height.typeError);
  }

  if (config.fill === undefined) {
    config.fill = defaultFill;
  } else if (typeof config.fill !== "boolean") {
    throw new Error(fill.typeError);
  }

  if (config.initialCommand === undefined) {
    config.initialCommand = defaultInitialCommand;
  } else if (!Array.isArray(config.initialCommand)) {
    throw new Error(initialCommand.typeError);
  }

  if (config.lineNumbering === undefined) {
    config.lineNumbering = defaultLineNumbering;
  } else if (typeof config.lineNumbering !== "boolean") {
    throw new Error(lineNumbering.typeError);
  }

  if (config.sampleCount === undefined || config.sampleCount === 0) {
    config.sampleCount = defaultSampleCount;
  } else if (typeof config.sampleCount !== "number") {
    throw new Error(sampleCount.typeError);
  } else if (config.sampleCount < 0) {
    throw new Error(sampleCount.smallerThanZero);
  }

  return config;
};

export { checkConfigFile };
