import { ElementNode, parse } from "svg-parser";

import {
  getFile,
  nestedPath,
  pathProcess,
  saveGcodeFile,
  checkConfigFile,
} from "./utils";
import { getConfig, setFileProperties, getGcodes } from "./stores";

checkConfigFile();

const { svgFileName } = getConfig();

const fileDir = `./src/public/${svgFileName}`;

const allPaths: Array<string | number> = [];

getFile(fileDir)
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
