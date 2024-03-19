import { svgCommandList } from "../constants";

const convertSvgCommandstoGcommands = (d: string[], log = false) => {
  const commandList = [];
  let currentChar = "";
  let gCommand = "";
  let cmd = "";
  let points: Array<number | string> = [];

  for (let i = 0; i < d.length; i++) {
    currentChar = d[i];

    if (svgCommandList.includes(currentChar) || i === d.length - 1) {
      if (i === d.length - 1) {
        gCommand += currentChar;
      }

      if (gCommand !== "") {
        if (log) {
          console.log({ gCommand });
        }

        points = extractPoitsFromPath(gCommand.trim());
        points.unshift(cmd);
        commandList.push(points);
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

function extractPoitsFromPath(path: string) {
  const regex = /(?:-?\d+(?:\.\d+)?|-?\.\d+)/g;
  const matches = path.match(regex);

  return matches.map((match) => parseFloat(match));
}

export { convertSvgCommandstoGcommands };
