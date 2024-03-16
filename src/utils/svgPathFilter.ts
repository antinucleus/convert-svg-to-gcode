import { ElementNode } from "svg-parser";

function nestedPath(
  child: Array<ElementNode>,
  allPath: Array<string | number>
) {
  for (const el of child) {
    if (el.tagName === "path") {
      allPath.push(el.properties.d);
    } else {
      if (Object.keys(el).includes("children") && el.children.length > 0)
        nestedPath(el.children as ElementNode[], allPath);
    }
  }
}

export { nestedPath };
