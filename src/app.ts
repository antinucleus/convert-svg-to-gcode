import { ElementNode, parse } from "svg-parser";

import {
  getFile,
  nestedPath,
  pathProcess,
  saveGcodeFile,
  readConfigFile,
  checkConfigFile,
} from "./utils";
import { setFileProperties, getGcodes, setConfig, resetGcodes } from "./stores";

export const start = () => {
  const filePath = `${process.cwd()}/gcode.config.json`;
  const data = readConfigFile(filePath);
  const config = checkConfigFile(data);

  const svgFilePath = `${process.cwd()}/public/${config.svgFileName}`;

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

      resetGcodes();
      allPaths.length = 0;
    })
    .catch((error) => {
      console.log(error);
    });
};

start();
