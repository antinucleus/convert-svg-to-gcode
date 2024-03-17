"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSmoothCubicBezierCurvePoints = void 0;
const bezierCurvePointsGenerator_1 = require("./bezierCurvePointsGenerator");
const constants_1 = require("../constants");
const stores_1 = require("../stores");
const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
const { previousSvgCommand } = (0, stores_1.previousSvgCommandStore)();
const { previousCurveEndControlPoint, updatePreviousCurveEndControlPoint } = (0, stores_1.previousCurveEndPointStore)();
const { config: { sampleCount }, } = (0, stores_1.configStore)();
const calculateSmoothCubicBezierCurvePoints = (points, absolute) => {
    let start;
    let end;
    let startControlPoint;
    let endControlPoint;
    let controlPoints;
    const allCurvePoints = [];
    if (points[points.length - 1].endsWith("z")) {
        const updatedzPoint = points[points.length - 1].split("z")[0];
        points[points.length - 1] = updatedzPoint;
    }
    for (let i = 0; i < points.length; i += 4) {
        start = [previousPoint.x, previousPoint.y];
        endControlPoint = [
            absolute ? Number(points[i]) : previousPoint.x + Number(points[i]),
            absolute
                ? Number(points[i + 1])
                : previousPoint.y + Number(points[i + 1]),
        ];
        if (previousSvgCommand.cmd === constants_1.SvgCommand.C ||
            previousSvgCommand.cmd === constants_1.SvgCommand.c ||
            previousSvgCommand.cmd === constants_1.SvgCommand.S ||
            previousSvgCommand.cmd === constants_1.SvgCommand.s) {
            startControlPoint = reflectPoint({
                point: previousCurveEndControlPoint,
                respectTo: previousPoint,
            });
        }
        else {
            startControlPoint = start;
        }
        controlPoints = [startControlPoint, endControlPoint];
        end = [
            absolute
                ? Number(points[i + 2])
                : previousPoint.x + Number(points[i + 2]),
            absolute
                ? Number(points[i + 3])
                : previousPoint.y + Number(points[i + 3]),
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
const reflectPoint = ({ point, respectTo }) => {
    const _x = 2 * respectTo.x - point.x;
    const _y = 2 * respectTo.y - point.y;
    return [_x, _y];
};
//# sourceMappingURL=smoothCubicBezierCurveTo.js.map