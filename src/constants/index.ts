const absoluteCommands = ["M", "L", "C", "S"];
const relativeCommands = ["m", "l", "c", "s"];
const svgCommandList = absoluteCommands.concat(relativeCommands);
const defaultSampleCount: number = 30;

enum SvgCommand {
  __ = "", // Empty
  M = "M", // Absolute move to
  L = "L", // Absolute line to
  C = "C", // Absolute cubic bezier curve to
  S = "S", // Absolute smooth cubic bezier curve to
  m = "m", // Relative move to
  l = "l", // Relative line to
  c = "c", // Relative cubic bezier curve to
  s = "s", // Relative smooth cubic bezier curve to
}

enum GcodeCommand {
  G0 = "G0", // Rapid movement (Pen up)
  G1 = "G1", // Linear movement (Pen down)
  G90 = "G90", // Use absolute positioning
  G91 = "G91", // Use incremental positioning
  G20 = "G20", // Set unit to inches
  G21 = "G21", // Set unit to mm
}

export { svgCommandList, defaultSampleCount, SvgCommand, GcodeCommand };
