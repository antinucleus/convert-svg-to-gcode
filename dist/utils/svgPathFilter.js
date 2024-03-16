"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedPath = void 0;
function nestedPath(child, allPath) {
    for (const el of child) {
        if (el.tagName === "path") {
            allPath.push(el.properties.d);
        }
        else {
            if (Object.keys(el).includes("children") && el.children.length > 0)
                nestedPath(el.children, allPath);
        }
    }
}
exports.nestedPath = nestedPath;
//# sourceMappingURL=svgPathFilter.js.map