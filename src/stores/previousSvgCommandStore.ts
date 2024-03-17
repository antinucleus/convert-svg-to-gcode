import { SvgCommand } from "../constants";

const previousSvgCommand: { cmd: SvgCommand } = { cmd: SvgCommand.__ };

function previousSvgCommandStore() {
  function updatePreviousSvgCommand(value: SvgCommand) {
    previousSvgCommand.cmd = value;
  }

  return {
    previousSvgCommand,
    updatePreviousSvgCommand,
  };
}

export { previousSvgCommandStore };
