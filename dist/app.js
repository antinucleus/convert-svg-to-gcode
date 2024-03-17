"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svg_parser_1 = require("svg-parser");
const utils_1 = require("./utils");
const stores_1 = require("./stores");
(0, utils_1.checkConfigFile)();
const { config: { svgFileName }, } = (0, stores_1.configStore)();
const fileDir = `./src/public/${svgFileName}`;
const allPaths = [];
(0, utils_1.getFile)(fileDir)
    .then((data) => {
    const parsed = (0, svg_parser_1.parse)(data);
    const svg = parsed.children;
    (0, utils_1.nestedPath)(svg[0].children, allPaths);
    const gCodes = (0, utils_1.pathProcess)(allPaths);
    (0, utils_1.saveGcodeFile)(gCodes);
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=app.js.map