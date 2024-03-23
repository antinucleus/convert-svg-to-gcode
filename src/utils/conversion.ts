import { UnitConversion, units } from "../constants";
import { Options, Units } from "../types";

const calcualteConversion = (
  config: Options,
  fileW: string | number,
  fileH: string | number,
  fill = false
) => {
  let svgFileUnit: Units = "px"; // if unit is not provided, default svg unit is px

  for (const unit of units) {
    if (fileW.toString().includes(unit)) {
      svgFileUnit = unit;
      break;
    }
  }

  /* To-do
  1 - get svgScale value from svg file, check if it will be multiplied with currentSize before aspect ratio calculation
  */

  const conversion: number = UnitConversion[config.unit as string][svgFileUnit];

  fileW = Number(fileW.toString().split(svgFileUnit)[0]) * conversion;
  fileH = Number(fileH.toString().split(svgFileUnit)[0]) * conversion;

  const targetSize = { w: config.width, h: config.height };
  const currentSize = { w: fileW, h: fileH };
  const aspectRatio = currentSize.w / currentSize.h;
  const multiplier = { mw: 1, mh: 1 };
  const svgScaleValue = { x: 0.1, y: 0.1 };

  if (!targetSize.w) {
    targetSize.w = targetSize.h * aspectRatio;
  }
  if (!targetSize.h) {
    targetSize.h = targetSize.w / aspectRatio;
  }

  const w2 = targetSize.h * aspectRatio;
  const h2 = targetSize.w / aspectRatio;

  if (fill) {
    multiplier.mw = targetSize.w / currentSize.w;
    multiplier.mh = targetSize.h / currentSize.h;
  } else {
    if (currentSize.w > targetSize.w || currentSize.h > targetSize.h) {
      if (w2 <= targetSize.w) {
        multiplier.mw = w2 / currentSize.w;
        multiplier.mh = targetSize.h / currentSize.h;
      }

      if (h2 <= targetSize.h) {
        multiplier.mh = h2 / currentSize.h;
        multiplier.mw = targetSize.w / currentSize.w;
      }
    }
  }

  return { conversion, multiplier, svgScaleValue };
};

export { calcualteConversion };
