import { ElementNode, parse } from "svg-parser";

import {
  getFile,
  nestedPath,
  pathProcess,
  saveGcodeFile,
  getConfig,
} from "./utils";

const { svgFileName } = getConfig();

const fileDir = `./src/public/${svgFileName}`;

const allPaths: Array<string | number> = [];

getFile(fileDir)
  .then((data) => {
    const parsed = parse(data);
    const svg = parsed.children as ElementNode[];

    nestedPath(svg[0].children as ElementNode[], allPaths);

    const gCodes = pathProcess(allPaths);
    saveGcodeFile(gCodes);
  })
  .catch((error) => console.log(error));
