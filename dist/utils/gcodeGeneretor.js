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
        else if (cmd === constants_1.SvgCommand.L) {
            x = points[0];
            y = points[1];
            (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
            updatePreviousPoint(x, y);
        }
        else if (cmd === constants_1.SvgCommand.l) {
            for (let i = 0; i < points.length; i += 2) {
                x = previousPoint.x + points[i];
                y = previousPoint.y + points[i + 1];
                (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y, "line to");
                updatePreviousPoint(x, y);
            }
        }
        else if (cmd === constants_1.SvgCommand.C) {
            const allCurvePoints = (0, cubicBezierCurveTo_1.calculateCubicBezierCurvePoints)(points, true);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.c) {
            const allCurvePoints = (0, cubicBezierCurveTo_1.calculateCubicBezierCurvePoints)(points, false);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.S) {
            const allCurvePoints = (0, smoothCubicBezierCurveTo_1.calculateSmoothCubicBezierCurvePoints)(points, true);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.s) {
            const allCurvePoints = (0, smoothCubicBezierCurveTo_1.calculateSmoothCubicBezierCurvePoints)(points, false);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.Q) {
            const allCurvePoints = (0, quadraticBezierCurveTo_1.calculateQuadraticBezierCurvePoints)(points, true);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.q) {
            const allCurvePoints = (0, quadraticBezierCurveTo_1.calculateQuadraticBezierCurvePoints)(points, false);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.T) {
            const allCurvePoints = (0, smoothQuadraticCurveTo_1.calculateSmoothQuadraticBezierCurvePoints)(points, true);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.t) {
            const allCurvePoints = (0, smoothQuadraticCurveTo_1.calculateSmoothQuadraticBezierCurvePoints)(points, false);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
    }
};
//# sourceMappingURL=gcodeGeneretor.js.map