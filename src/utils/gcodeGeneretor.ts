import { SvgCommand, GcodeCommand } from "../constants";
import { pushGcode, getGcodes } from "./gcodeOperations";
import { convertSvgCommandstoGcommands } from "./convertSvgCommandToGcommand";
import { calculateCubicBezierCurvePoints } from "./cubicBezierCurveTo";
import { calculateSmoothCubicBezierCurvePoints } from "./smoothCubicBezierCurveTo";
import { calculateQuadraticBezierCurvePoints } from "./quadraticBezierCurveTo";
import { calculateSmoothQuadraticBezierCurvePoints } from "./smoothQuadraticCurveTo";
import { lineTo } from "./lineTo";
import { moveTo } from "./moveTo";
import { horizontalLineTo } from "./horizontalLineTo";
import { verticalLineTo } from "./verticalLineTo";

const pathProcess = (paths) => {
  for (const path of paths) {
    const commandList = convertSvgCommandstoGcommands(path);
    generateGcode(commandList);
  }

  return getGcodes();
};

const generateGcode = (commandList: any[]) => {
  let x: number, y: number;
  const firstPoint = { x: 0, y: 0 };

  for (const command of commandList) {
    const cmd = command[0] as SvgCommand;
    const points = command.splice(1);
    let curvePoints: Array<Array<Array<number>>> = [];

    if (cmd === SvgCommand.M || cmd === SvgCommand.m) {
      const moveToPoints = moveTo(points, cmd);
      firstPoint.x = moveToPoints[0];
      firstPoint.y = moveToPoints[1];

      pushGcode(cmd, GcodeCommand.G0, moveToPoints[0], moveToPoints[1]);
    } else if (cmd === SvgCommand.L || cmd === SvgCommand.l) {
      const linePoints = lineTo(points, cmd);

      for (const line of linePoints) {
        x = line[0];
        y = line[1];

        pushGcode(cmd, GcodeCommand.G1, x, y);
      }
    } else if (cmd === SvgCommand.H || cmd === SvgCommand.h) {
      const hLinePoints = horizontalLineTo(points, cmd);
      pushGcode(cmd, GcodeCommand.G1, hLinePoints[0], hLinePoints[1]);
    } else if (cmd === SvgCommand.V || cmd === SvgCommand.v) {
      const vLinePoints = verticalLineTo(points, cmd);
      pushGcode(cmd, GcodeCommand.G1, vLinePoints[0], vLinePoints[1]);
    } else if (cmd === SvgCommand.C || cmd === SvgCommand.c) {
      curvePoints = calculateCubicBezierCurvePoints(points, cmd);
    } else if (cmd === SvgCommand.S || cmd === SvgCommand.s) {
      curvePoints = calculateSmoothCubicBezierCurvePoints(points, cmd);
    } else if (cmd === SvgCommand.Q || cmd === SvgCommand.q) {
      curvePoints = calculateQuadraticBezierCurvePoints(points, cmd);
    } else if (cmd === SvgCommand.T || cmd === SvgCommand.t) {
      curvePoints = calculateSmoothQuadraticBezierCurvePoints(points, cmd);
    } else if (cmd === SvgCommand.Z || cmd === SvgCommand.z) {
      pushGcode(cmd, GcodeCommand.G1, firstPoint.x, firstPoint.y);
    } else {
      throw new Error(`Command not found '${cmd}'`);
    }

    for (const curve of curvePoints) {
      for (const cp of curve) {
        x = cp[0];
        y = cp[1];

        pushGcode(cmd, GcodeCommand.G1, x, y);
      }
    }
  }
};

export { pathProcess };
