"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousCurveEndPointStore = void 0;
const previousCurveEndControlPoint = { x: 0, y: 0 };
function previousCurveEndPointStore() {
    function updatePreviousCurveEndControlPoint(value) {
        previousCurveEndControlPoint.x = value.x;
        previousCurveEndControlPoint.y = value.y;
    }
    return { previousCurveEndControlPoint, updatePreviousCurveEndControlPoint };
}
exports.previousCurveEndPointStore = previousCurveEndPointStore;
//# sourceMappingURL=previousCurveEndPointStore.js.map