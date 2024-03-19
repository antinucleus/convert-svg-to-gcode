"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineTo = void 0;
const constants_1 = require("../constants");
const stores_1 = require("../stores");
const { previousPoint, updatePreviousPoint } = (0, stores_1.previousPointStore)();
const lineTo = (points, cmd) => {
    let lineToPoints = [];
    const result = [];
    const absolute = cmd === constants_1.SvgCommand.L;
    for (let i = 0; i < points.length; i += 2) {
        lineToPoints = [
            absolute ? points[i] : previousPoint.x + points[i],
            absolute ? points[i + 1] : previousPoint.y + points[i + 1],
        ];
        result.push(lineToPoints);
        updatePreviousPoint(lineToPoints[0], lineToPoints[1]);
    }
    return result;
};
exports.lineTo = lineTo;
//# sourceMappingURL=lineTo.js.map