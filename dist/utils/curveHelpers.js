"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectPoint = void 0;
const reflectPoint = ({ point, respectTo }) => {
    const _x = 2 * respectTo.x - point.x;
    const _y = 2 * respectTo.y - point.y;
    return [_x, _y];
};
exports.reflectPoint = reflectPoint;
//# sourceMappingURL=curveHelpers.js.map