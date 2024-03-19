const absoluteCommands = ["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z"];
const relativeCommands = ["m", "l", "h", "v", "c", "s", "q", "t", "a", "z"];
const svgCommandList = absoluteCommands.concat(relativeCommands);
const defaultSampleCount: number = 30;

enum SvgCommand {
  __ = "", // Empty
  M = "M", // Absolute move to
  L = "L", // Absolute line to
  H = "H", // Absolute horizontal line to
  V = "V", // Absolute vertical line to
  C = "C", // Absolute cubic bezier curve to
  S = "S", // Absolute smooth cubic bezier curve to
  Q = "Q", // Absolute quadratic bezier curve to
  T = "T", // Absolute smooth quadratic bezier curve to
  A = "A", // Absolute elliptical arc to
  m = "m", // Relative move to
  l = "l", // Relative line to
  h = "h", // Relative horizontal line to
  v = "v", // Relative vertical line to
  c = "c", // Relative cubic bezier curve to
  s = "s", // Relative smooth cubic bezier curve to
  q = "q", // Relative smooth quadratic bezier curve to
  t = "t", // Relative smooth quadratic bezier curve to
  a = "a", // Relative elliptical arc to
  Z = "Z", // Close path
  z = "z", // Close path
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
