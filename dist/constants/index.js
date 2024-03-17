"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcodeCommand = exports.SvgCommand = exports.defaultSampleCount = exports.svgCommandList = void 0;
const absoluteCommands = ["M", "L", "C", "S"];
const relativeCommands = ["m", "l", "c", "s"];
const svgCommandList = absoluteCommands.concat(relativeCommands);
exports.svgCommandList = svgCommandList;
const defaultSampleCount = 30;
exports.defaultSampleCount = defaultSampleCount;
var SvgCommand;
(function (SvgCommand) {
    SvgCommand["__"] = "";
    SvgCommand["M"] = "M";
    SvgCommand["L"] = "L";
    SvgCommand["C"] = "C";
    SvgCommand["S"] = "S";
    SvgCommand["m"] = "m";
    SvgCommand["l"] = "l";
    SvgCommand["c"] = "c";
    SvgCommand["s"] = "s";
})(SvgCommand || (exports.SvgCommand = SvgCommand = {}));
var GcodeCommand;
(function (GcodeCommand) {
    GcodeCommand["G0"] = "G0";
    GcodeCommand["G1"] = "G1";
    GcodeCommand["G90"] = "G90";
    GcodeCommand["G91"] = "G91";
    GcodeCommand["G20"] = "G20";
    GcodeCommand["G21"] = "G21";
})(GcodeCommand || (exports.GcodeCommand = GcodeCommand = {}));
//# sourceMappingURL=index.js.map