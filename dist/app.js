"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svg_parser_1 = require("svg-parser");
const utils_1 = require("./utils");
const fileDir = "./src/public/result0.svg";
const allPaths = [];
(0, utils_1.getFile)(fileDir).then((data) => {
    const parsed = (0, svg_parser_1.parse)(data);
    const svg = parsed.children;
    (0, utils_1.nestedPath)(svg[0].children, allPaths);
    const gCodes = (0, utils_1.pathProcess)(allPaths);
    (0, utils_1.saveGcodeFile)(gCodes);
});
//# sourceMappingURL=app.js.map