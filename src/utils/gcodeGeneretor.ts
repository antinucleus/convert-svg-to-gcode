import { SvgCommand, GcodeCommand } from "../constants";
import { pushGcode, getGcodes } from "./gcodeOperations";
import { convertSvgCommandstoGcommands } from "./convertSvgCommandToGcommand";
import { calculateCubicBezierCurvePoints } from "./cubicBezierCurveTo";
import { calculateSmoothCubicBezierCurvePoints } from "./smoothCubicBezierCurveTo";
import { calculateQuadraticBezierCurvePoints } from "./quadraticBezierCurveTo";
import { calculateSmoothQuadraticBezierCurvePoints } from "./smoothQuadraticCurveTo";
import { previousPointStore } from "../stores";

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
    } else if (cmd === SvgCommand.L) {
      x = points[0];
      y = points[1];

      pushGcode(cmd, GcodeCommand.G1, x, y);
      updatePreviousPoint(x, y);
    } else if (cmd === SvgCommand.l) {
      for (let i = 0; i < points.length; i += 2) {
        x = previousPoint.x + points[i];
        y = previousPoint.y + points[i + 1];

        pushGcode(cmd, GcodeCommand.G1, x, y, "line to");
        updatePreviousPoint(x, y);
      }
    } else if (cmd === SvgCommand.C) {
      const allCurvePoints = calculateCubicBezierCurvePoints(points, true);

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.c) {
      const allCurvePoints = calculateCubicBezierCurvePoints(points, false);

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.S) {
      const allCurvePoints = calculateSmoothCubicBezierCurvePoints(
        points,
        true
      );

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.s) {
      const allCurvePoints = calculateSmoothCubicBezierCurvePoints(
        points,
        false
      );

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.Q) {
      const allCurvePoints = calculateQuadraticBezierCurvePoints(points, true);

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.q) {
      const allCurvePoints = calculateQuadraticBezierCurvePoints(points, false);

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.T) {
      const allCurvePoints = calculateSmoothQuadraticBezierCurvePoints(
        points,
        true
      );

      for (const curve of allCurvePoints) {
        for (const cp of curve) {
          x = cp[0];
          y = cp[1];

          pushGcode(cmd, GcodeCommand.G1, x, y);
        }
      }
    } else if (cmd === SvgCommand.t) {
      const allCurvePoints = calculateSmoothQuadraticBezierCurvePoints(
        points,
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
