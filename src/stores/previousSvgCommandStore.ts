import { SvgCommand } from "../constants";

const previousSvgCommand: { cmd: SvgCommand } = { cmd: SvgCommand.__ };

function getPreviousSvgCommand() {
  return previousSvgCommand;
}

function setPreviousSvgCommand(value: SvgCommand) {
  previousSvgCommand.cmd = value;
}

export { getPreviousSvgCommand, setPreviousSvgCommand };
