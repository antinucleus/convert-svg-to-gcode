"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCubicBezierCurvePoints = void 0;
const bezierCurvePointsGenerator_1 = require("./bezierCurvePointsGenerator");
const stores_1 = require("../stores");
const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
const { updatePreviousCurveEndControlPoint } = (0, stores_1.previousCurveEndPointStore)();
const { config: { sampleCount }, } = (0, stores_1.configStore)();
const calculateCubicBezierCurvePoints = (points, absolute) => {
    let start;
    let end;
    let controlPoints;
    const allCurvePoints = [];
    if (points[points.length - 1].endsWith("z")) {
        const updatedzPoint = points[points.length - 1].split("z")[0];
        points[points.length - 1] = updatedzPoint;
    }
    for (let i = 0; i < points.length; i += 6) {
        start = [previousPoint.x, previousPoint.y];
        controlPoints = [
            [
                absolute ? Number(points[i]) : previousPoint.x + Number(points[i]),
                absolute
                    ? Number(points[i + 1])
                    : previousPoint.y + Number(points[i + 1]),
            ],
            [
                absolute
                    ? Number(points[i + 2])
                    : previousPoint.x + Number(points[i + 2]),
                absolute
                    ? Number(points[i + 3])
                    : previousPoint.y + Number(points[i + 3]),
            ],
        ];
        end = [
            absolute
                ? Number(points[i + 4])
                : previousPoint.x + Number(points[i + 4]),
            absolute
                ? Number(points[i + 5])
                : previousPoint.y + Number(points[i + 5]),
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