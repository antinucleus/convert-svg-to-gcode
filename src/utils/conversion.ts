import { UnitConversion, units } from "../constants";
import { Options, Units } from "../types";

const calcualteConversion = (
  config: Options,
  fileW: string | number,
  fileH: string | number
) => {
  let svgFileUnit: Units = "px"; // if unit is not provided, default svg unit is px

  for (const unit of units) {
    if (fileW.toString().includes(unit)) {
      svgFileUnit = unit;
      break;
    }
  }

  const conversion: number = UnitConversion[config.unit as string][svgFileUnit];

  fileW = Number(fileW.toString().split(svgFileUnit)[0]) * conversion;
  fileH = Number(fileH.toString().split(svgFileUnit)[0]) * conversion;

  const targetSize = { w: config.width, h: config.height };
  const currentSize = { w: fileW, h: fileH };
  const aspectRatio = currentSize.w / currentSize.h;
  const svgScaleValue = { x: 0.1, y: 0.1 };
  const multiplier = { mw: 1, mh: 1 };

  if (!targetSize.w) {
    targetSize.w = targetSize.h * aspectRatio;
  }
  if (!targetSize.h) {
    targetSize.h = targetSize.w / aspectRatio;
  }
  if (currentSize.w > targetSize.w) {
    multiplier.mw = targetSize.w / currentSize.w;
  }
  if (currentSize.h > targetSize.h) {
    multiplier.mh = targetSize.h / currentSize.h;
  }

  return { conversion, multiplier, svgScaleValue };
};

export { calcualteConversion };
