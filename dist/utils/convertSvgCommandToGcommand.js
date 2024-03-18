"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSvgCommandstoGcommands = void 0;
const constants_1 = require("../constants");
const convertSvgCommandstoGcommands = (d, log = false) => {
    const commandList = [];
    let currentChar = "";
    let gCommand = "";
    let cmd = "";
    for (let i = 0; i < d.length; i++) {
        currentChar = d[i];
        if (constants_1.svgCommandList.includes(currentChar) || i === d.length - 1) {
            if (gCommand !== "") {
                if (log) {
                    console.log({ gCommand });
                }
                gCommand = gCommand.trim();
                const res = extractNumbersFromString(gCommand);
                res.unshift(cmd);
                commandList.push(res);
                gCommand = "";
            }
            cmd = currentChar;
        }
        else {
            if (currentChar === "\n") {
                currentChar = " ";
            }
            if (currentChar === "Z" || currentChar === "z") {
                currentChar = "";
            }
            gCommand += currentChar;
        }
    }
    return commandList;
};
exports.convertSvgCommandstoGcommands = convertSvgCommandstoGcommands;
function extractNumbersFromString(inputString) {
    const regex = /(?:-?\d+(?:\.\d+)?|-?\.\d+)/g;
    const matches = inputString.match(regex);
    return matches.map((match) => parseFloat(match));
}
//# sourceMappingURL=convertSvgCommandToGcommand.js.map