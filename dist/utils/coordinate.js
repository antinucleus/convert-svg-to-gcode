"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinate = void 0;
class Coordinate {
    constructor(x, y) {
        this.previousPoint = { x, y };
    }
    updatePreviousPoint(x, y) {
        //  x and y must be number
        this.previousPoint.x = +x;
        this.previousPoint.y = +y;
    }
}
exports.Coordinate = Coordinate;
//# sourceMappingURL=coordinate.js.map