import { SvgCommand } from "../constants";
import { previousPointStore } from "../stores";

const { previousPoint, updatePreviousPoint } = previousPointStore();

const lineTo = (points: number[], cmd: SvgCommand) => {
  let lineToPoints: number[] = [];
  const result: Array<Array<number>> = [];
  const absolute = cmd === SvgCommand.L;

  for (let i = 0; i < points.length; i += 2) {
    lineToPoints = [
      absolute ? points[i] : previousPoint.x + points[i],
      absolute ? points[i + 1] : previousPoint.y + points[i + 1],
    ];

    result.push(lineToPoints);
    updatePreviousPoint(lineToPoints[0], lineToPoints[1]);
  }

  return result;
};

export { lineTo };
