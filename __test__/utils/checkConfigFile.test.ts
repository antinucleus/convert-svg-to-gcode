import { checkConfigFile } from "../../src/utils";
import {
  configFileDefaultValues,
  defaultUnit,
  errorMessages,
} from "../../src/constants";

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
      expect(error.message).toBe(svgFileName.missingFieldError);
    }
  });

  test("Type of svgFileName field must be string", () => {
    config.svgFileName = true;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(svgFileName.typeError);
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
      expect(error.message).toBe(unit.typeError);
    }
  });

  test("unit field must be 'mm' or 'in'", () => {
    config.unit = "cm";

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(unit.unmatchedValue);
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
      expect(error.message).toBe(width.missingFieldError);
    }
  });

  test("Type of 'width' field must be number", () => {
    config.height = undefined;
    config.width = true;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(width.typeError);
    }
  });

  test("Type of 'height' field must be number", () => {
    config.width = undefined;
    config.height = true;

    try {
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(height.typeError);
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
      expect(error.message).toBe(fill.typeError);
    }
  });
});

describe("testing 'initialCommand' field.", () => {
  const config = {
    svgFileName: "test.svg",
    unit: "mm",
    width: 100,
    height: 100,
    fill: defaultFill,
    initialCommand: undefined,
    lineNumbering: defaultLineNumbering,
    sampleCount: defaultSampleCount,
  };

  test("If 'initialCommand' field is not provided, it must be set to default value", () => {
    const receivedConfig = checkConfigFile(JSON.stringify(config));
    expect(receivedConfig.initialCommand).toBe(defaultInitialCommand);
  });

  test("Type of 'initialCommand' field must be boolean", () => {
    try {
      config.initialCommand = "commands";
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(initialCommand.typeError);
    }
  });
});

describe("testing 'lineNumbering' field.", () => {
  const config = {
    svgFileName: "test.svg",
    unit: "mm",
    width: 100,
    height: 100,
    fill: defaultFill,
    initialCommand: defaultInitialCommand,
    lineNumbering: undefined,
    sampleCount: defaultSampleCount,
  };

  test("If 'lineNumbering' field is not provided, it must be set to default value", () => {
    const receivedConfig = checkConfigFile(JSON.stringify(config));
    expect(receivedConfig.lineNumbering).toBe(defaultLineNumbering);
  });

  test("Type of 'lineNumbering' field must be boolean", () => {
    try {
      config.lineNumbering = "line";
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(lineNumbering.typeError);
    }
  });
});

describe("testing 'sampleCount' field.", () => {
  const config = {
    svgFileName: "test.svg",
    unit: "mm",
    width: 100,
    height: 100,
    fill: defaultFill,
    initialCommand: defaultInitialCommand,
    lineNumbering: defaultLineNumbering,
    sampleCount: undefined,
  };

  test("If 'sampleCount' field is not provided, it must be set to default value", () => {
    const receivedConfig = checkConfigFile(JSON.stringify(config));
    expect(receivedConfig.sampleCount).toBe(defaultSampleCount);
  });

  test("If 'sampleCount' field is 0, it must be set to default value", () => {
    config.sampleCount = 0;
    const receivedConfig = checkConfigFile(JSON.stringify(config));
    expect(receivedConfig.sampleCount).toBe(defaultSampleCount);
  });

  test("Type of 'sampleCount' field must be boolean", () => {
    try {
      config.sampleCount = "count";
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(sampleCount.typeError);
    }
  });

  test("If 'sampleCount' field is smaller than zero, it must be set to default value", () => {
    try {
      config.sampleCount = -5;
      checkConfigFile(JSON.stringify(config));
    } catch (error) {
      expect(error.message).toBe(sampleCount.smallerThanZero);
    }
  });
});
