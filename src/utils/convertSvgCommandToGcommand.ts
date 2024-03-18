import { svgCommandList } from "../constants";

const convertSvgCommandstoGcommands = (d: string[], log = false) => {
  const commandList = [];
  let currentChar = "";
  let gCommand = "";
  let cmd = "";

  for (let i = 0; i < d.length; i++) {
    currentChar = d[i];

    if (svgCommandList.includes(currentChar) || i === d.length - 1) {
      if (gCommand !== "") {
        if (log) {
          console.log({ gCommand });
        }

        gCommand = gCommand.trim();

        const res: Array<number | string> = extractNumbersFromString(gCommand);
        res.unshift(cmd);

        commandList.push(res);
        gCommand = "";
      }
      cmd = currentChar;
    } else {
      if (currentChar === "\n") {
        currentChar = " ";
      }

      if (currentChar === "Z" || currentChar === "z") {
        currentChar = "";
      }

      gCommand += currentChar;
    }
  }

  return commandList;
};

function extractNumbersFromString(inputString) {
  const regex = /(?:-?\d+(?:\.\d+)?|-?\.\d+)/g;
  const matches = inputString.match(regex);

  return matches.map((match) => parseFloat(match));
}

export { convertSvgCommandstoGcommands };
