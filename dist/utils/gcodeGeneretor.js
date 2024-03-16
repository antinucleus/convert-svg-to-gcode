"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathProcess = void 0;
const constants_1 = require("../constants");
const cubicBezierCurveTo_1 = require("./cubicBezierCurveTo");
const gcodeOperations_1 = require("./gcodeOperations");
const previousPoint = { x: 0, y: 0 };
const pathProcess = (paths) => {
    for (const path of paths) {
        const commandList = convertSvgCommandstoGcommands(path);
        generateGcode(commandList);
    }
    return (0, gcodeOperations_1.getGcodes)();
};
exports.pathProcess = pathProcess;
const generateGcode = (commandList) => {
    let x, y;
    for (const command of commandList) {
        const points = command.split(" ").splice(1);
        const cmd = command[0];
        if (cmd === constants_1.SvgCommand.M) {
            x = +points[0];
            y = +points[1];
            (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G0, x, y);
            updatePreviousPoint(x, y);
        }
        else if (cmd === constants_1.SvgCommand.m) {
            x = previousPoint.x + Number(points[0]);
            y = previousPoint.y + Number(points[1]);
            (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G0, x, y);
            updatePreviousPoint(x, y);
        }
        else if (cmd === constants_1.SvgCommand.L) {
            x = +points[0];
            y = +points[1];
            (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
            updatePreviousPoint(x, y);
        }
        else if (cmd === constants_1.SvgCommand.l) {
            for (let i = 0; i < points.length; i += 2) {
                x = previousPoint.x + Number(points[i]);
                if (points[points.length - 1].endsWith("z")) {
                    y = previousPoint.y + Number(points[i + 1].split("z")[0]);
                }
                else {
                    y = previousPoint.y + Number(points[i + 1]);
                }
                (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                updatePreviousPoint(x, y);
            }
        }
        else if (cmd === constants_1.SvgCommand.C) {
            const allCurvePoints = (0, cubicBezierCurveTo_1.calculateCubicBezierCurvePoints)(points, previousPoint, updatePreviousPoint, true);
            for (const curve of allCurvePoints) {
                for (const cp of curve) {
                    x = cp[0];
                    y = cp[1];
                    (0, gcodeOperations_1.pushGcode)(cmd, constants_1.GcodeCommand.G1, x, y);
                }
            }
        }
        else if (cmd === constants_1.SvgCommand.c) {
            const allCurvePoints = (0, cubicBezierCurveTo_1.calculateCubicBezierCurvePoints)(points, previousPoint, updatePreviousPoint, false);
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
const convertSvgCommandstoGcommands = (d) => {
    const regex = new RegExp("\n", "g");
    const commandList = [];
    let currentChar = "";
    let gCommand = "";
    for (let i = 0; i < d.length; i++) {
        currentChar = d[i];
        if (constants_1.svgCommandList.includes(currentChar) || i === d.length - 1) {
            if (i === d.length - 1) {
                gCommand += currentChar;
            }
            if (gCommand !== "") {
                // console.log({ gCommand });
                commandList.push(gCommand.replace(regex, " ").trim());
                gCommand = "";
            }
            gCommand += currentChar.concat(" ");
        }
        else {
            gCommand += currentChar;
        }
    }
    return commandList;
};
const updatePreviousPoint = (x, y) => {
    previousPoint.x = +x;
    previousPoint.y = +y;
};
//# sourceMappingURL=gcodeGeneretor.js.map