"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveGcodeFile = exports.getFile = void 0;
const promises_1 = require("node:fs/promises");
function getFile(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent;
        try {
            const data = yield (0, promises_1.readFile)(source, {
                encoding: "utf8",
            });
            fileContent = data;
        }
        catch (err) {
            throw new Error(err);
        }
        return fileContent;
    });
}
exports.getFile = getFile;
function saveGcodeFile(gcodes) {
    return __awaiter(this, void 0, void 0, function* () {
        let str = "";
        for (const gcode of gcodes) {
            str = str.concat(gcode, "\n");
        }
        try {
            yield (0, promises_1.writeFile)("output.gcode", str);
            console.log("File created successfully!");
        }
        catch (error) {
            console.log("File creation error!", error);
        }
    });
}
exports.saveGcodeFile = saveGcodeFile;
//# sourceMappingURL=fileOperations.js.map