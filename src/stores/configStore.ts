import { Options } from "../types";

const initialValues: Options = {
  initialCommand: [],
  lineNumbering: false,
  sampleCount: 30,
  separator: null,
  svgFileName: "",
};

let config: Options = initialValues;

function configStore() {
  function updateConfig(value: Options) {
    config = value;
  }

  return { config, updateConfig };
}

export { configStore };
