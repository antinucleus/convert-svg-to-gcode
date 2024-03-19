import { SvgCommand } from "../constants";
import { previousPointStore } from "../stores";

const { previousPoint, updatePreviousPoint } = previousPointStore();

const verticalLineTo = (points: number[], cmd: SvgCommand) => {
  let lineToPoints: number[] = [];
  const absolute = cmd === SvgCommand.V;

  lineToPoints = [
    previousPoint.x,
    absolute ? points[0] : previousPoint.y + points[0],
  ];

  updatePreviousPoint(lineToPoints[0], lineToPoints[1]);

  return lineToPoints;
};

export { verticalLineTo };
