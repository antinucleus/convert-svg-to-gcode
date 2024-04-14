import { svgCommandList } from "../constants";
import { getConfig, getFileProperties } from "../stores";
import { calcualteConversion } from "./conversion";
import { scaleSvgSizeToTargetSize } from "./scaleSvgSizeToTargetSize";
import { extractPointsFromPath } from "./extractPointsFromPath";

const convertSvgCommandstoGcommands = (d: string[], log = false) => {
  const config = getConfig();
  const properties = getFileProperties();
  const commandList = [];
  let currentChar = "";
  let gCommand = "";
  let cmd = "";
  let points: Array<number | string> = [];

  const values = calcualteConversion(
    config,
    properties.width,
    properties.height
  );

  if (log) {
    console.log({ d });
  }

  for (let i = 0; i < d.length; i++) {
    currentChar = d[i];

    if (svgCommandList.includes(currentChar) || i === d.length - 1) {
      if (gCommand !== "" && gCommand !== " ") {
        gCommand += currentChar;
        points = extractPointsFromPath(gCommand.trim());

        scaleSvgSizeToTargetSize(
          points as number[],
          cmd,
          values.conversion,
          values.multiplier,
          values.svgScaleValue
        );

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

export { convertSvgCommandstoGcommands };
