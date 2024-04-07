import path from "node:path";
import { ElementNode, parse } from "svg-parser";

import {
  getFile,
  nestedPath,
  pathProcess,
  saveGcodeFile,
  readConfigFile,
  checkConfigFile,
} from "./utils";
import { setFileProperties, getGcodes, setConfig } from "./stores";

const filePath = path.join(__dirname, "../../gcode.config.json");
const data = readConfigFile(filePath);
const config = checkConfigFile(data);

const svgFilePath = `./src/public/${config.svgFileName}`;
setConfig(config);

const allPaths: Array<string | number> = [];

getFile(svgFilePath)
  .then((data) => {
    const parsed = parse(data);
    const svg = parsed.children as ElementNode[];
    const properties = svg[0].properties;

    setFileProperties({
      width: properties.width,
      height: properties.height,
    });

    nestedPath(svg[0].children as ElementNode[], allPaths);
    pathProcess(allPaths);
    const gCodes = getGcodes();
    saveGcodeFile(gCodes);
  })
  .catch((error) => {
    console.log(error);
  });
