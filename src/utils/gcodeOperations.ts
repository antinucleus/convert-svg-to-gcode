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
  if (isNaN(x) || isNaN(y)) {
    throw Error(
      `Gcode points (x,y) cannot be "NaN"!. If svg file path values seperated with comma (,) or another separator, set value of "separator" field to this separator in "config.json" file.`
    );
  }

  const gcode = `${
    lineNumbering ? `N${gCodes.length + 1}` : ""
  } ${gcodecmd} X${x} Y${y} Z0 ${comment ? `(${comment})` : ""}`;

  gCodes.push(gcode);
  updatePreviousSvgCommand(svgcmd);

  if (log) {
    console.log(`[${svgcmd} - CODE]:`, gcode);
  }
};

const getGcodes = (): string[] => gCodes;

export { pushGcode, getGcodes };
