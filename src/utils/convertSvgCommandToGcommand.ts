import { svgCommandList } from "../constants";
import { configStore } from "../stores";

const {
  config: { separator },
} = configStore();

const convertSvgCommandstoGcommands = (d: string[], log = false) => {
  const regex = new RegExp("\n", "g");
  const commandList = [];
  let currentChar = "";
  let gCommand = "";

  for (let i = 0; i < d.length; i++) {
    if (separator && d[i] === separator) {
      currentChar = " ";
    } else {
      currentChar = d[i];
    }

    if (svgCommandList.includes(currentChar) || i === d.length - 1) {
      if (i === d.length - 1) {
        gCommand += currentChar;
      }

      if (gCommand !== "") {
        if (log) {
          console.log({ gCommand });
        }
        commandList.push(gCommand.replace(regex, " ").trim());
        gCommand = "";
      }
      gCommand += currentChar.concat(" ");
    } else {
      gCommand += currentChar;
    }
  }

  return commandList;
};

export { convertSvgCommandstoGcommands };
