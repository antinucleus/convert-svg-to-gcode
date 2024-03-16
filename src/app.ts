import { ElementNode, parse } from "svg-parser";

import { getFile, nestedPath, pathProcess, saveGcodeFile } from "./utils";

const fileDir = "./src/public/result0.svg";

const allPaths: Array<string | number> = [];

getFile(fileDir).then((data) => {
  const parsed = parse(data);
  const svg = parsed.children as ElementNode[];

  nestedPath(svg[0].children as ElementNode[], allPaths);

  const gCodes = pathProcess(allPaths);
  saveGcodeFile(gCodes);
});
