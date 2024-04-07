import path from "node:path";

import { readConfigFile } from "../../src/utils";

test("expecting file reading error", () => {
  const filePath = path.join(__dirname, "./gcode.config.json");

  try {
    readConfigFile(filePath);
  } catch (error) {
    expect(error.message).toContain("ENOENT: no such file or directory");
  }
});

test("config file should be read properly", () => {
  const filePath = path.join(__dirname, "../../gcode.config.json");

  const expectedFileContent = {
    initialCommand: ["G90 G21 (Positioning = absolute, Unit = mm)"],
    lineNumbering: false,
    sampleCount: 30,
    svgFileName: "test0.svg",
    unit: "mm",
    width: 148,
    height: 210,
    fill: false,
  };

  const data = JSON.parse(readConfigFile(filePath));

  expect(data).toEqual(expectedFileContent);
});
