import { Options } from "../types";

const initialValues: Options = {
  initialCommand: [],
  lineNumbering: false,
  sampleCount: 30,
  svgFileName: "",
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
