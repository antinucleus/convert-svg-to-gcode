"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCubicBezierCurvePoints = void 0;
const bezierCurvePointsGenerator_1 = require("./bezierCurvePointsGenerator");
const stores_1 = require("../stores");
const constants_1 = require("../constants");
const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
const { updatePreviousCurveEndControlPoint } = (0, stores_1.previousCurveEndPointStore)();
const { config: { sampleCount }, } = (0, stores_1.configStore)();
const calculateCubicBezierCurvePoints = (points, cmd) => {
    let start;
    let end;
    let controlPoints;
    const allCurvePoints = [];
    const absolute = cmd === constants_1.SvgCommand.C;
    for (let i = 0; i < points.length; i += 6) {
        start = [previousPoint.x, previousPoint.y];
        controlPoints = [
            [
                absolute ? points[i] : previousPoint.x + points[i],
                absolute ? points[i + 1] : previousPoint.y + points[i + 1],
            ],
            [
                absolute ? points[i + 2] : previousPoint.x + points[i + 2],
                absolute ? points[i + 3] : previousPoint.y + points[i + 3],
            ],
        ];
        end = [
            absolute ? points[i + 4] : previousPoint.x + points[i + 4],
            absolute ? points[i + 5] : previousPoint.y + points[i + 5],
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
exports.calculateCubicBezierCurvePoints = calculateCubicBezierCurvePoints;
//# sourceMappingURL=cubicBezierCurveTo.js.map