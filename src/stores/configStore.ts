import { Options } from "../types";

const initialValues: Options = {
  svgFileName: "",
  initialCommand: [],
  lineNumbering: false,
  sampleCount: 30,
  unit: "mm",
  width: undefined,
  height: undefined,
};

let config: Options = initialValues;

function configStore() {
  function updateConfig(value: Options) {
    config = value;
  }

  return { config, updateConfig };
}

export { configStore };
