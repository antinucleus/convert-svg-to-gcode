"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const constants_1 = require("../constants");
const filePath = node_path_1.default.join(__dirname, "../../src/config.json");
let config;
const processFileContents = (fileContents) => {
    config = JSON.parse(fileContents);
    console.log({ config });
    if (!config.initialCommand) {
        config.initialCommand = [];
    }
    if (typeof config.lineNumbering !== "boolean") {
        throw new Error(`"lineNumbering" must be true or false.`);
    }
    if (config.sampleCount < 0) {
        throw new Error(`"sampleCount" must be positive number. If it is 0, default value ${constants_1.defaultSampleCount} will be used.`);
    }
};
const getConfig = () => config;
exports.getConfig = getConfig;
try {
    const data = (0, node_fs_1.readFileSync)(filePath, "utf8");
    processFileContents(data);
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=parseConfig.js.map