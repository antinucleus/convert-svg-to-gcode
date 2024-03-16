import { getConfig } from "./parseConfig";

const gCodes: string[] = [];
let addLineNumber = true;

function readConfig() {
  const { initialCommand, lineNumbering } = getConfig();

  if (lineNumbering === false) {
    addLineNumber = false;
  }
  if (initialCommand.length > 0) {
    for (const ic of initialCommand) {
      const cmd = `${addLineNumber ? `N${gCodes.length + 1}` : ""} ${ic}`;
      gCodes.push(cmd);
    }
  }
}

readConfig();

const pushGcode = (
  svgcmd: string,
  gcodecmd: string,
  x: number,
  y: number,
  comment?: string,
  log: boolean = false
): void | Error => {
  const gcode = `${
    addLineNumber ? `N${gCodes.length + 1}` : ""
  } ${gcodecmd} X${x} Y${y} Z0 ${comment ? `(${comment})` : ""}`;
  gCodes.push(gcode);

  if (isNaN(x) || isNaN(y)) {
    return Error("Provided NaN value!");
  }

  if (log) {
    console.log(`[${svgcmd} - CODE]:`, gcode);
  }
};

const getGcodes = (): string[] => gCodes;

export { pushGcode, getGcodes };
