import { SvgCommand } from "../constants";
import { setPreviousSvgCommand, getGcodes, setGcodes } from "../stores";

const gCodes = getGcodes();

const pushGcode = (
  svgcmd: SvgCommand,
  gcodecmd: string,
  x: number,
  y: number,
  lineNumbering: boolean,
  comment?: string,
  log: boolean = false
): void | Error => {
  if (log) {
    console.log(`[${svgcmd} - CODE]:`, { x, y });
  }

  if (isNaN(x) || isNaN(y)) {
    throw Error(`Gcode points (x,y) cannot be "NaN"!, (${x},${y})`);
  }

  // console.log({ linenumber: config.lineNumbering });

  const gcode = `${
    lineNumbering ? `N${gCodes.length + 1}` : ""
  } ${gcodecmd} X${x} Y${y} Z0 ${comment ? `(${comment})` : ""}`;

  setGcodes(gcode);
  setPreviousSvgCommand(svgcmd);
};

export { pushGcode };
