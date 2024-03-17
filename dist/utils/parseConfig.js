"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfigFile = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const constants_1 = require("../constants");
const stores_1 = require("../stores");
const filePath = node_path_1.default.join(__dirname, "../../src/config.json");
let config;
const { updateConfig } = (0, stores_1.configStore)();
const processFileContents = (fileContents) => {
    config = JSON.parse(fileContents);
    if (!config.svgFileName) {
        throw new Error(`"svgFileName" field must be provided.`);
    }
    else if (typeof config.svgFileName !== "string") {
        throw new Error(`"svgFileName" value must be string.`);
    }
    if (!config.initialCommand) {
        config.initialCommand = [];
    }
    else if (!Array.isArray(config.initialCommand)) {
        throw new Error(`"initialCommand" value must be array.`);
    }
    if (!config.lineNumbering) {
        config.lineNumbering = false;
    }
    else if (typeof config.lineNumbering !== "boolean") {
        throw new Error(`"lineNumbering" value must be true or false.`);
    }
    if (!config.sampleCount || config.sampleCount === 0) {
        config.sampleCount = constants_1.defaultSampleCount;
    }
    else if (typeof config.sampleCount !== "number") {
        throw new Error(`"sampleCount" value must be number.`);
    }
    else if (config.sampleCount < 0) {
        throw new Error(`"sampleCount" value must be positive number. If it is 0, default value ${constants_1.defaultSampleCount} will be used.`);
    }
    if (!config.seperator) {
        config.seperator = null;
    }
    else if (typeof config.seperator !== "string") {
        throw new Error(`"seperator" value must be string.`);
    }
    console.log("\nConfig: ", config);
    updateConfig(config);
};
const checkConfigFile = () => {
    try {
        console.info("Reading config file");
        const data = (0, node_fs_1.readFileSync)(filePath, "utf8");
        processFileContents(data);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.checkConfigFile = checkConfigFile;
//# sourceMappingURL=parseConfig.js.map