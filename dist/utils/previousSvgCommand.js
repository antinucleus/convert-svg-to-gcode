"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousSvgCommandController = void 0;
const constants_1 = require("../constants");
const previousSvgCommand = { val: constants_1.SvgCommand.__ };
function previousSvgCommandController() {
    function updatePreviousSvgCommand(value) {
        previousSvgCommand.val = value;
    }
    return {
        previousSvgCommand,
        updatePreviousSvgCommand,
    };
}
exports.previousSvgCommandController = previousSvgCommandController;
//# sourceMappingURL=previousSvgCommand.js.map