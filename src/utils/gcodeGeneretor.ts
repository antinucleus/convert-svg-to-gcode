import { SvgCommand, GcodeCommand } from "../constants";
import { calculateCubicBezierCurvePoints } from "./cubicBezierCurveTo";
import { pushGcode, getGcodes } from "./gcodeOperations";
import { convertSvgCommandstoGcommands } from "./convertSvgCommandToGcommand";

const previousPoint = { x: 0, y: 0 };

const updatePreviousPoint = (x: number, y: number) => {
  previousPoint.x = +x;
  previousPoint.y = +y;
};

const pathProcess = (paths) => {
  for (const path of paths) {
    const commandList = convertSvgCommandstoGcommands(path);
    generateGcode(commandList);
  }

  return getGcodes();
};

const generateGcode = (commandList: string[]) => {
  let x: number, y: number;

  for (const command of commandList) {
    const points = command.split(" ").splice(1);
    const cmd = command[0];

    if (cmd === SvgCommand.M) {
      x = +points[0];
      y = +points[1];

      pushGcode(cmd, GcodeCommand.G0, x, y);
      updatePreviousPoint(x, y);
    } else if (cmd === SvgCommand.m) {
      x = previousPoint.x + Number(points[0]);
      y = previousPoint.y + Number(points[1]);

      pushGcode(cmd, GcodeCommand.G0, x, y);
      updatePreviousPoint(x, y);
    } else if (cmd === SvgCommand.L) {
      x = +points[0];
      y = +points[1];

      pushGcode(cmd, GcodeCommand.G1, x, y);
      updatePreviousPoint(x, y);
    } else if (cmd === SvgCommand.l) {
      for (let i = 0; i < points.length; i += 2) {
        x = previousPoint.x + Number(points[i]);

        if (points[points.length - 1].endsWith("z")) {
          y = previousPoint.y + Number(points[i + 1].split("z")[0]);
        } else {
          y = previousPoint.y + Number(points[i + 1]);
        }

        pushGcode(cmd, GcodeCommand.G1, x, y);
        updatePreviousPoint(x, y);
      }
    } else if (cmd === SvgCommand.C) {
      const allCurvePoints = calculateCubicBezierCurvePoints(
        points,
        previousPoint,
        updatePreviousPoint,
        true
      );

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.c) {
      const allCurvePoints = calculateCubicBezierCurvePoints(
        points,
        previousPoint,
        updatePreviousPoint,
        false
      );

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    }
  }
};

export { pathProcess };
