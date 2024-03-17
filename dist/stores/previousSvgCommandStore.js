"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousSvgCommandStore = void 0;
const constants_1 = require("../constants");
const previousSvgCommand = { cmd: constants_1.SvgCommand.__ };
function previousSvgCommandStore() {
    function updatePreviousSvgCommand(value) {
        previousSvgCommand.cmd = value;
    }
    return {
        previousSvgCommand,
        updatePreviousSvgCommand,
    };
}
exports.previousSvgCommandStore = previousSvgCommandStore;
//# sourceMappingURL=previousSvgCommandStore.js.map