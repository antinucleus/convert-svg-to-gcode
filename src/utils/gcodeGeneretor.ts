import { SvgCommand, GcodeCommand } from "../constants";
import { pushGcode, getGcodes } from "./gcodeOperations";
import { convertSvgCommandstoGcommands } from "./convertSvgCommandToGcommand";
import { calculateCubicBezierCurvePoints } from "./cubicBezierCurveTo";
import { calculateSmoothCubicBezierCurvePoints } from "./smoothCubicBezierCurveTo";
import { calculateQuadraticBezierCurvePoints } from "./quadraticBezierCurveTo";
import { calculateSmoothQuadraticBezierCurvePoints } from "./smoothQuadraticCurveTo";
import { lineTo } from "./lineTo";
import { moveTo } from "./moveTo";

const pathProcess = (paths) => {
  for (const path of paths) {
    const commandList = convertSvgCommandstoGcommands(path);
    generateGcode(commandList);
  }

  return getGcodes();
};

const generateGcode = (commandList: any[]) => {
  let x: number, y: number;

  for (const command of commandList) {
    const cmd = command[0] as SvgCommand;
    const points = command.splice(1);
    let curvePoints: Array<Array<Array<number>>> = [];

    if (cmd === SvgCommand.M || cmd === SvgCommand.m) {
      const moveToPoints = moveTo(points, cmd);

      pushGcode(cmd, GcodeCommand.G0, moveToPoints[0], moveToPoints[1]);
    } else if (cmd === SvgCommand.L || cmd === SvgCommand.l) {
      const lineToPoints = lineTo(points, cmd);

      for (const line of lineToPoints) {
        x = line[0];
        y = line[1];

        pushGcode(cmd, GcodeCommand.G1, x, y);
      }
    } else if (cmd === SvgCommand.C || cmd === SvgCommand.c) {
      curvePoints = calculateCubicBezierCurvePoints(points, cmd);
    } else if (cmd === SvgCommand.S || cmd === SvgCommand.s) {
      curvePoints = calculateSmoothCubicBezierCurvePoints(points, cmd);
    } else if (cmd === SvgCommand.Q || cmd === SvgCommand.q) {
      curvePoints = calculateQuadraticBezierCurvePoints(points, cmd);
    } else if (cmd === SvgCommand.T || cmd === SvgCommand.t) {
      curvePoints = calculateSmoothQuadraticBezierCurvePoints(points, cmd);
    } else {
      console.error("Command not found:", cmd);
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
