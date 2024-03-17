"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStore = void 0;
const initialValues = {
    initialCommand: [],
    lineNumbering: false,
    sampleCount: 30,
    seperator: null,
    svgFileName: "",
};
let config = initialValues;
function configStore() {
    function updateConfig(value) {
        config = value;
    }
    return { config, updateConfig };
}
exports.configStore = configStore;
//# sourceMappingURL=configStore.js.map