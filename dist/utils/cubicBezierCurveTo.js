"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCubicBezierCurvePoints = void 0;
const bezierCurvePointsGenerator_1 = require("./bezierCurvePointsGenerator");
const parseConfig_1 = require("./parseConfig");
const constants_1 = require("../constants");
let { sampleCount } = (0, parseConfig_1.getConfig)();
sampleCount = sampleCount ? sampleCount : constants_1.defaultSampleCount;
const calculateCubicBezierCurvePoints = (points, previousPoint, updatePreviousPoint, absolute) => {
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
    }
    return allCurvePoints;
};
exports.calculateCubicBezierCurvePoints = calculateCubicBezierCurvePoints;
//# sourceMappingURL=cubicBezierCurveTo.js.map