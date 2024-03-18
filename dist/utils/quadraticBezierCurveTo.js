"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateQuadraticBezierCurvePoints = void 0;
const bezierCurvePointsGenerator_1 = require("./bezierCurvePointsGenerator");
const stores_1 = require("../stores");
const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
const { updatePreviousCurveEndControlPoint } = (0, stores_1.previousCurveEndPointStore)();
const { config: { sampleCount }, } = (0, stores_1.configStore)();
const calculateQuadraticBezierCurvePoints = (points, absolute) => {
    let start;
    let end;
    let controlPoints;
    const allCurvePoints = [];
    for (let i = 0; i < points.length; i += 4) {
        start = [previousPoint.x, previousPoint.y];
        controlPoints = [
            [
                absolute ? points[i] : previousPoint.x + points[i],
                absolute ? points[i + 1] : previousPoint.y + points[i + 1],
            ],
            [
                absolute ? points[i] : previousPoint.x + points[i],
                absolute ? points[i + 1] : previousPoint.y + points[i + 1],
            ],
        ];
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
            x: controlPoints[1][0],
            y: controlPoints[1][1],
        });
    }
    return allCurvePoints;
};
exports.calculateQuadraticBezierCurvePoints = calculateQuadraticBezierCurvePoints;
//# sourceMappingURL=quadraticBezierCurveTo.js.map