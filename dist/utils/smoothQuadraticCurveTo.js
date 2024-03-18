"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSmoothQuadraticBezierCurvePoints = void 0;
const constants_1 = require("../constants");
const curveHelpers_1 = require("./curveHelpers");
const bezierCurvePointsGenerator_1 = require("./bezierCurvePointsGenerator");
const stores_1 = require("../stores");
const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
const { previousSvgCommand } = (0, stores_1.previousSvgCommandStore)();
const { previousCurveEndControlPoint, updatePreviousCurveEndControlPoint } = (0, stores_1.previousCurveEndPointStore)();
const { config: { sampleCount }, } = (0, stores_1.configStore)();
const calculateSmoothQuadraticBezierCurvePoints = (points, absolute) => {
    let start;
    let end;
    let startControlPoint;
    let controlPoints;
    const allCurvePoints = [];
    for (let i = 0; i < points.length; i += 2) {
        start = [previousPoint.x, previousPoint.y];
        if (previousSvgCommand.cmd === constants_1.SvgCommand.Q ||
            previousSvgCommand.cmd === constants_1.SvgCommand.q ||
            previousSvgCommand.cmd === constants_1.SvgCommand.T ||
            previousSvgCommand.cmd === constants_1.SvgCommand.t) {
            startControlPoint = (0, curveHelpers_1.reflectPoint)({
                point: previousCurveEndControlPoint,
                respectTo: previousPoint,
            });
        }
        else {
            startControlPoint = start;
        }
        controlPoints = [startControlPoint, startControlPoint];
        end = [
            absolute ? points[i] : previousPoint.x + points[i],
            absolute ? points[i + 1] : previousPoint.y + points[i + 1],
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
            x: controlPoints[1][0],
            y: controlPoints[1][1],
        });
    }
    return allCurvePoints;
};
exports.calculateSmoothQuadraticBezierCurvePoints = calculateSmoothQuadraticBezierCurvePoints;
//# sourceMappingURL=smoothQuadraticCurveTo.js.map