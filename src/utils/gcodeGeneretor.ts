import { SvgCommand, GcodeCommand } from "../constants";
import { pushGcode, getGcodes } from "./gcodeOperations";
import { convertSvgCommandstoGcommands } from "./convertSvgCommandToGcommand";
import { calculateCubicBezierCurvePoints } from "./cubicBezierCurveTo";
import { calculateSmoothCubicBezierCurvePoints } from "./smoothCubicBezierCurveTo";
import { calculateQuadraticBezierCurvePoints } from "./quadraticBezierCurveTo";
import { calculateSmoothQuadraticBezierCurvePoints } from "./smoothQuadraticCurveTo";
import { previousPointStore } from "../stores";
import { lineTo } from "./lineTo";

const pathProcess = (paths) => {
  for (const path of paths) {
    const commandList = convertSvgCommandstoGcommands(path);
    generateGcode(commandList);
  }

  return getGcodes();
};

const generateGcode = (commandList: any[]) => {
  const { previousPoint, updatePreviousPoint } = previousPointStore();
  let x: number, y: number;

  for (const command of commandList) {
    const cmd = command[0] as SvgCommand;
    const points = command.splice(1);

    if (cmd === SvgCommand.M) {
      x = points[0];
      y = points[1];

      pushGcode(cmd, GcodeCommand.G0, x, y);
      updatePreviousPoint(x, y);
    } else if (cmd === SvgCommand.m) {
      x = previousPoint.x + points[0];
      y = previousPoint.y + points[1];

      pushGcode(cmd, GcodeCommand.G0, x, y);
      updatePreviousPoint(x, y);
    } else if (cmd === SvgCommand.L || cmd === SvgCommand.l) {
      const lineToPoints = lineTo(points, cmd);

      for (const line of lineToPoints) {
        x = line[0];
        y = line[1];

        pushGcode(cmd, GcodeCommand.G1, x, y);
      }

      pushGcode(cmd, GcodeCommand.G1, x, y);
    } else if (cmd === SvgCommand.C || cmd === SvgCommand.c) {
      const allCurvePoints = calculateCubicBezierCurvePoints(points, cmd);

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.S || cmd === SvgCommand.s) {
      const allCurvePoints = calculateSmoothCubicBezierCurvePoints(points, cmd);

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.Q || cmd === SvgCommand.q) {
      const allCurvePoints = calculateQuadraticBezierCurvePoints(points, cmd);

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.T || cmd === SvgCommand.t) {
      const allCurvePoints = calculateSmoothQuadraticBezierCurvePoints(
        points,
        cmd
      );

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else {
      console.error("Command not found:", cmd);
    }
  }
};

export { pathProcess };
