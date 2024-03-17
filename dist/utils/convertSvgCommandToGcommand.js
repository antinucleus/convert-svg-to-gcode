"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSvgCommandstoGcommands = void 0;
const constants_1 = require("../constants");
const stores_1 = require("../stores");
const { config: { seperator }, } = (0, stores_1.configStore)();
const convertSvgCommandstoGcommands = (d, log = false) => {
    const regex = new RegExp("\n", "g");
    const commandList = [];
    let currentChar = "";
    let gCommand = "";
    for (let i = 0; i < d.length; i++) {
        if (seperator && d[i] === seperator) {
            currentChar = " ";
        }
        else {
            currentChar = d[i];
        }
        if (constants_1.svgCommandList.includes(currentChar) || i === d.length - 1) {
            if (i === d.length - 1) {
                gCommand += currentChar;
            }
            if (gCommand !== "") {
                if (log) {
                    console.log({ gCommand });
                }
                commandList.push(gCommand.replace(regex, " ").trim());
                gCommand = "";
            }
            gCommand += currentChar.concat(" ");
        }
        else {
            gCommand += currentChar;
        }
    }
    return commandList;
};
exports.convertSvgCommandstoGcommands = convertSvgCommandstoGcommands;
//# sourceMappingURL=convertSvgCommandToGcommand.js.map