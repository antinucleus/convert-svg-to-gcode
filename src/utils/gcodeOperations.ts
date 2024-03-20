import { SvgCommand } from "../constants";
import { previousSvgCommandStore, configStore } from "../stores";

const gCodes: string[] = [];
const { updatePreviousSvgCommand } = previousSvgCommandStore();
const {
  config: { initialCommand, lineNumbering },
} = configStore();

if (initialCommand.length > 0) {
  for (const ic of initialCommand) {
    const cmd = `${lineNumbering ? `N${gCodes.length + 1}` : ""} ${ic}`;
    gCodes.push(cmd);
  }
}

const pushGcode = (
  svgcmd: SvgCommand,
  gcodecmd: string,
  x: number,
  y: number,
  comment?: string,
  log: boolean = false
): void | Error => {
  if (log) {
    console.log(`[${svgcmd} - CODE]:`, { x, y });
  }

  // console.log({ divider });

  if (isNaN(x) || isNaN(y)) {
    throw Error(`Gcode points (x,y) cannot be "NaN"!`);
  }

  const gcode = `${
    lineNumbering ? `N${gCodes.length + 1}` : ""
  }${gcodecmd} X${x} Y${y} Z0 ${comment ? `(${comment})` : ""}`;

  gCodes.push(gcode);
  updatePreviousSvgCommand(svgcmd);
};

const getGcodes = (): string[] => gCodes;

export { pushGcode, getGcodes };
