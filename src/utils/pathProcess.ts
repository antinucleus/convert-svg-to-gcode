import { getConfig, getGcodes, setGcodes } from "../stores";
import { convertSvgCommandstoGcommands } from "./convertSvgCommandToGcommand";
import { generateGcode } from "./gcodeGeneretor";

const pathProcess = (paths) => {
  const { initialCommand, lineNumbering, centerX, centerY } = getConfig();

  const gCodes = getGcodes();

  if (initialCommand.length > 0) {
    for (const ic of initialCommand) {
      const cmd = `${lineNumbering ? `N${gCodes.length + 1} ` : ""}${ic}`;
      setGcodes(cmd);
    }
  }

  for (const path of paths) {
    const commandList = convertSvgCommandstoGcommands(path);
    generateGcode({
      commandList,
      lineNumbering,
      centerX,
      centerY,
    });
  }
};

export { pathProcess };
