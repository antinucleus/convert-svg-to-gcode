"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGcodes = exports.pushGcode = void 0;
const parseConfig_1 = require("./parseConfig");
const gCodes = [];
let addLineNumber = true;
function readConfig() {
    const { initialCommand, lineNumbering } = (0, parseConfig_1.getConfig)();
    if (lineNumbering === false) {
        addLineNumber = false;
    }
    if (initialCommand.length > 0) {
        for (const ic of initialCommand) {
            const cmd = `${addLineNumber ? `N${gCodes.length + 1}` : ""} ${ic}`;
            gCodes.push(cmd);
        }
    }
}
readConfig();
const pushGcode = (svgcmd, gcodecmd, x, y, comment, log = false) => {
    const gcode = `${addLineNumber ? `N${gCodes.length + 1}` : ""} ${gcodecmd} X${x} Y${y} Z0 ${comment ? `(${comment})` : ""}`;
    gCodes.push(gcode);
    if (isNaN(x) || isNaN(y)) {
        return Error("Provided NaN value!");
    }
    if (log) {
        console.log(`[${svgcmd} - CODE]:`, gcode);
    }
};
exports.pushGcode = pushGcode;
const getGcodes = () => gCodes;
exports.getGcodes = getGcodes;
//# sourceMappingURL=gcodeOperations.js.map