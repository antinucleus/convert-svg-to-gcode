"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousPointStore = void 0;
const previousPoint = { x: 0, y: 0 };
function previousPointStore() {
    function updatePreviousPoint(x, y) {
        previousPoint.x = x;
        previousPoint.y = y;
    }
    return {
        previousPoint,
        updatePreviousPoint,
    };
}
exports.previousPointStore = previousPointStore;
//# sourceMappingURL=previousPointStore.js.map