import { checkConfigFile } from "../../src/utils";
import {
  defaultFill,
  defaultInitialCommand,
  defaultLineNumbering,
  defaultSampleCount,
  defaultUnit,
} from "../../src/constants";

describe("testing 'svgFileName' field.", () => {
  const config = {
    svgFileName: undefined,
    unit: defaultUnit,
    width: 100,
    height: 100,
    fill: defaultFill,
    initialCommand: defaultInitialCommand,
    lineNumbering: defaultLineNumbering,
    sampleCount: defaultSampleCount,
  };

  test("svgFileName field must be provided", () => {
    delete config.svgFileName;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(`"svgFileName" field must be provided.`);
    }
  });

  test("Type of svgFileName field must be string", () => {
    config.svgFileName = true;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(`"svgFileName" value must be string.`);
    }
  });
});

describe("testing 'unit' field.", () => {
  const config = {
    svgFileName: "test.svg",
    unit: undefined,
    width: 100,
    height: 100,
    fill: defaultFill,
    initialCommand: defaultInitialCommand,
    lineNumbering: defaultLineNumbering,
    sampleCount: defaultSampleCount,
  };

  test("If unit field is not provided, it must be set to default value", () => {
    const receivedConfig = checkConfigFile(JSON.stringify(config));
    expect(receivedConfig.unit).toBe(defaultUnit);
  });

  test("Type of unit field must be string", () => {
    config.unit = true;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(`"unit" field must be string.`);
    }
  });

  test("unit field must be 'mm' or 'in'", () => {
    config.unit = "cm";

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(`"unit" field must be "mm" or "in".`);
    }
  });
});

describe("testing 'width' and 'height' field.", () => {
  const config = {
    svgFileName: "test.svg",
    unit: "mm",
    width: undefined,
    height: undefined,
    fill: defaultFill,
    initialCommand: defaultInitialCommand,
    lineNumbering: defaultLineNumbering,
    sampleCount: defaultSampleCount,
  };

  test("At least one field must be provided", () => {
    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(
        `At least one of the "width" or "height" field must be provided.`
      );
    }
  });

  test("Type of 'width' field must be number", () => {
    config.height = undefined;
    config.width = true;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(`"width" field must be number.`);
    }
  });

  test("Type of 'height' field must be number", () => {
    config.width = undefined;
    config.height = true;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(`"height" field must be number.`);
    }
  });
});

describe("testing 'width' and 'height' field.", () => {
  const config = {
    svgFileName: "test.svg",
    unit: "mm",
    width: 100,
    height: 100,
    fill: undefined,
    initialCommand: defaultInitialCommand,
    lineNumbering: defaultLineNumbering,
    sampleCount: defaultSampleCount,
  };

  test("If 'fill' field is not provided, it must be set to default value", () => {
    const receivedConfig = checkConfigFile(JSON.stringify(config));
    expect(receivedConfig.fill).toBe(defaultFill);
  });

  test("Type of 'fill' field must be boolean", () => {
    try {
      config.fill = "fill";
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(`"fill" field must be boolean.`);
    }
  });
});
