import {
  defaultFill,
  defaultInitialCommand,
  defaultLineNumbering,
  defaultSampleCount,
  defaultUnit,
} from "../constants";
import { Options } from "../types";

const initialValues: Options = {
  svgFileName: "",
  initialCommand: defaultInitialCommand,
  lineNumbering: defaultLineNumbering,
  sampleCount: defaultSampleCount,
  unit: defaultUnit,
  width: undefined,
  height: undefined,
  fill: defaultFill,
};

let config: Options = initialValues;

function configStore() {
  function updateConfig(value: Options) {
    config = value;
  }

  return { config, updateConfig };
}

export { configStore };
