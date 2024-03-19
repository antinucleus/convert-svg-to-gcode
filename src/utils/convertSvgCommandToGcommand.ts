import { svgCommandList } from "../constants";

const convertSvgCommandstoGcommands = (d: string[], log = false) => {
  const commandList = [];
  let currentChar = "";
  let gCommand = "";
  let cmd = "";
  let points: Array<number | string> = [];

  if (log) {
    console.log({ d });
  }

  for (let i = 0; i < d.length; i++) {
    currentChar = d[i];

    if (svgCommandList.includes(currentChar) || i === d.length - 1) {
      if (gCommand !== "" && gCommand !== " ") {
        gCommand += currentChar;
        points = extractPoitsFromPath(gCommand.trim());
        points.unshift(cmd);
        commandList.push(points);

        if (log) {
          console.log({ points });
        }

        gCommand = "";
      }
      if (currentChar === "z" || currentChar === "Z") {
        commandList.push([currentChar]);
      }

      cmd = currentChar;
    } else {
      if (currentChar === "\n") {
        currentChar = " ";
      }

      gCommand += currentChar;
    }
  }

  return commandList;
};

function extractPoitsFromPath(path: string) {
  const regex = /-?\d+\.?\d*(?:e-?\d+)?/g;
  const matches = path.match(regex);

  return matches.map((match) => parseFloat(match));
}

export { convertSvgCommandstoGcommands };
