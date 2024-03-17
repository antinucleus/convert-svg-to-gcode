"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGcodes = exports.pushGcode = void 0;
const stores_1 = require("../stores");
const gCodes = [];
const { updatePreviousSvgCommand } = (0, stores_1.previousSvgCommandStore)();
const { config: { initialCommand, lineNumbering }, } = (0, stores_1.configStore)();
if (initialCommand.length > 0) {
    for (const ic of initialCommand) {
        const cmd = `${lineNumbering ? `N${gCodes.length + 1}` : ""} ${ic}`;
        gCodes.push(cmd);
    }
}
const pushGcode = (svgcmd, gcodecmd, x, y, comment, log = false) => {
    if (isNaN(x) || isNaN(y)) {
        throw Error(`Gcode points (x,y) cannot be "NaN"!. If svg file path values seperated with comma (,) or another seperator, set value of "seperator" field to this seperator in "config.json" file.`);
    }
    const gcode = `${lineNumbering ? `N${gCodes.length + 1}` : ""} ${gcodecmd} X${x} Y${y} Z0 ${comment ? `(${comment})` : ""}`;
    gCodes.push(gcode);
    updatePreviousSvgCommand(svgcmd);
    if (log) {
        console.log(`[${svgcmd} - CODE]:`, gcode);
    }
};
exports.pushGcode = pushGcode;
const getGcodes = () => gCodes;
exports.getGcodes = getGcodes;
//# sourceMappingURL=gcodeOperations.js.map