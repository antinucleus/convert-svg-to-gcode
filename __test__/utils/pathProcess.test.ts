import { pathProcess } from "../../src/utils";
import { setConfig, getGcodes } from "../../src/stores";

describe("initial commands", () => {
  const config = {
    initialCommand: ["G90 G21 (Positioning = absolute, Unit = mm)"],
    lineNumbering: false,
    sampleCount: 30,
    svgFileName: "test0.svg",
    unit: "mm",
    width: 148,
    height: 210,
    fill: false,
  };

  test("initial commands should be added", () => {
    setConfig(config);
    pathProcess([]);
    const gCodes = getGcodes();

    expect(gCodes).toEqual(["G90 G21 (Positioning = absolute, Unit = mm)"]);
    expect(gCodes.length).toBe(1);
  });

  test("line numbers should be added", () => {
    config.lineNumbering = true;
    setConfig(config);
    const gCodes = getGcodes();
    gCodes.length = 0;
    pathProcess([]);

    expect(gCodes).toEqual(["N1 G90 G21 (Positioning = absolute, Unit = mm)"]);
    expect(gCodes.length).toBe(1);
  });
});
