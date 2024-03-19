"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSmoothCubicBezierCurvePoints = void 0;
const bezierCurvePointsGenerator_1 = require("./bezierCurvePointsGenerator");
const constants_1 = require("../constants");
const curveHelpers_1 = require("./curveHelpers");
const stores_1 = require("../stores");
const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
const { previousSvgCommand } = (0, stores_1.previousSvgCommandStore)();
const { previousCurveEndControlPoint, updatePreviousCurveEndControlPoint } = (0, stores_1.previousCurveEndPointStore)();
const { config: { sampleCount }, } = (0, stores_1.configStore)();
const calculateSmoothCubicBezierCurvePoints = (points, cmd) => {
    let start;
    let end;
    let startControlPoint;
    let endControlPoint;
    let controlPoints;
    const allCurvePoints = [];
    const absolute = cmd === constants_1.SvgCommand.S;
    for (let i = 0; i < points.length; i += 4) {
        start = [previousPoint.x, previousPoint.y];
        endControlPoint = [
            absolute ? points[i] : previousPoint.x + points[i],
            absolute ? points[i + 1] : previousPoint.y + points[i + 1],
        ];
        if (previousSvgCommand.cmd === constants_1.SvgCommand.C ||
            previousSvgCommand.cmd === constants_1.SvgCommand.c ||
            previousSvgCommand.cmd === constants_1.SvgCommand.S ||
            previousSvgCommand.cmd === constants_1.SvgCommand.s) {
            startControlPoint = (0, curveHelpers_1.reflectPoint)({
                point: previousCurveEndControlPoint,
                respectTo: previousPoint,
            });
        }
        else {
            startControlPoint = start;
        }
        controlPoints = [startControlPoint, endControlPoint];
        end = [
            absolute ? points[i + 2] : previousPoint.x + points[i + 2],
            absolute ? points[i + 3] : previousPoint.y + points[i + 3],
        ];
        const curvePoints = (0, bezierCurvePointsGenerator_1.getBezierPoints)({
            start,
            controlPoints,
            end,
            sampleCount,
        });
        allCurvePoints.push(curvePoints);
        updatePreviousPoint(end[0], end[1]);
        updatePreviousCurveEndControlPoint({
            x: endControlPoint[0],
            y: endControlPoint[1],
        });
    }
    return allCurvePoints;
};
exports.calculateSmoothCubicBezierCurvePoints = calculateSmoothCubicBezierCurvePoints;
//# sourceMappingURL=smoothCubicBezierCurveTo.js.map