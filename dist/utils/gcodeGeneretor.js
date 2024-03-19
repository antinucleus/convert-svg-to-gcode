"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathProcess = void 0;
const constants_1 = require("../constants");
const gcodeOperations_1 = require("./gcodeOperations");
const convertSvgCommandToGcommand_1 = require("./convertSvgCommandToGcommand");
const cubicBezierCurveTo_1 = require("./cubicBezierCurveTo");
const smoothCubicBezierCurveTo_1 = require("./smoothCubicBezierCurveTo");
const quadraticBezierCurveTo_1 = require("./quadraticBezierCurveTo");
const smoothQuadraticCurveTo_1 = require("./smoothQuadraticCurveTo");
const stores_1 = require("../stores");
const lineTo_1 = require("./lineTo");
const pathProcess = (paths) => {
    for (const path of paths) {
        const commandList = (0, convertSvgCommandToGcommand_1.convertSvgCommandstoGcommands)(path);
        generateGcode(commandList);
    }
    return (0, gcodeOperations_1.getGcodes)();
};
exports.pathProcess = pathProcess;
const generateGcode = (commandList) => {
    const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
    let x, y;
    for (const command of commandList) {
        const cmd = command[0];
        const points = command.splice(1);
        if (cmd === constants_1.SvgCommand.M) {
            x = points[0];
            y = points[1];
            (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G0, x, y);
            updatePreviousPoint(x, y);
        }
        else if (cmd === constants_1.SvgCommand.m) {
            x = previousPoint.x + points[0];
            y = previousPoint.y + points[1];
            (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G0, x, y);
            updatePreviousPoint(x, y);
        }
        else if (cmd === constants_1.SvgCommand.L || cmd === constants_1.SvgCommand.l) {
            const lineToPoints = (0, lineTo_1.lineTo)(points, cmd);
            for (const line of lineToPoints) {
                x = line[0];
                y = line[1];
                (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y, "linetoo");
            }
            (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
        }
        else if (cmd === constants_1.SvgCommand.C || cmd === constants_1.SvgCommand.c) {
            const allCurvePoints = (0, cubicBezierCurveTo_1.calculateCubicBezierCurvePoints)(points, cmd);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.S || cmd === constants_1.SvgCommand.s) {
            const allCurvePoints = (0, smoothCubicBezierCurveTo_1.calculateSmoothCubicBezierCurvePoints)(points, cmd);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.Q || cmd === constants_1.SvgCommand.q) {
            const allCurvePoints = (0, quadraticBezierCurveTo_1.calculateQuadraticBezierCurvePoints)(points, cmd);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.T || cmd === constants_1.SvgCommand.t) {
            const allCurvePoints = (0, smoothQuadraticCurveTo_1.calculateSmoothQuadraticBezierCurvePoints)(points, cmd);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else {
            console.error("Command not found:", cmd);
        }
    }
};
//# sourceMappingURL=gcodeGeneretor.js.map