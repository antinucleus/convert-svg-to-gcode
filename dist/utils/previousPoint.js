"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousPointController = void 0;
const previousPoint = { x: 0, y: 0 };
function previousPointController() {
    function updatePreviousPoint(x, y) {
        previousPoint.x = x;
        previousPoint.y = y;
    }
    return {
        previousPoint,
        updatePreviousPoint,
    };
}
exports.previousPointController = previousPointController;
//# sourceMappingURL=previousPoint.js.map