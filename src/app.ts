import { ElementNode, parse } from "svg-parser";

import {
  getFile,
  nestedPath,
  pathProcess,
  saveGcodeFile,
  checkConfigFile,
} from "./utils";
import { configStore, filePropertiesStore } from "./stores";

checkConfigFile();

const {
  config: { svgFileName },
} = configStore();

const fileDir = `./src/public/${svgFileName}`;

const allPaths: Array<string | number> = [];

getFile(fileDir)
  .then((data) => {
    const { updateFileProperties } = filePropertiesStore();

    const parsed = parse(data);
    const svg = parsed.children as ElementNode[];
    const properties = svg[0].properties;

    updateFileProperties({
      width: properties.width,
      height: properties.height,
    });

    nestedPath(svg[0].children as ElementNode[], allPaths);
    const gCodes = pathProcess(allPaths);
    saveGcodeFile(gCodes);
  })
  .catch((error) => {
    console.log(error);
  });
