import { svgCommandList } from "../constants";

const convertSvgCommandstoGcommands = (d) => {
  const regex = new RegExp("\n", "g");
  const commandList = [];
  let currentChar = "";
  let gCommand = "";

  for (let i = 0; i < d.length; i++) {
    currentChar = d[i];

    if (svgCommandList.includes(currentChar) || i === d.length - 1) {
      if (i === d.length - 1) {
        gCommand += currentChar;
      }
      if (gCommand !== "") {
        // console.log({ gCommand });
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
