import { SvgCommand } from "../constants";

/*To-do
reverse y values, because positive y value is downwards
*/

const scaleSvgSizeToTargetSize = (
  points: number[],
  cmd: string,
  conversion: number,
  multiplier: { mw: number; mh: number },
  svgScaleValue: { x: number; y: number }
) => {
  if (cmd === SvgCommand.H || cmd === SvgCommand.h) {
    points[0] *= svgScaleValue.x * multiplier.mw * conversion; // x
    points[0] = Number(points[0].toFixed(3));
  } else if (cmd === SvgCommand.V || cmd === SvgCommand.v) {
    points[0] *= svgScaleValue.y * multiplier.mh * conversion; // y
    points[0] = Number(points[0].toFixed(3));
  } else {
    for (let i = 0; i < points.length; i += 2) {
      points[i] *= svgScaleValue.x * multiplier.mw * conversion; // x
      points[i + 1] *= svgScaleValue.y * multiplier.mh * conversion; // y

      points[i] = Number(points[i].toFixed(3));
      points[i + 1] = Number(points[i + 1].toFixed(3));
    }
  }
};

export { scaleSvgSizeToTargetSize };
