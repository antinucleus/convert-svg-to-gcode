import { SvgCommand } from "../constants";
import { getPreviousPoint, setPreviousPoint } from "../stores";

const previousPoint = getPreviousPoint();

const verticalLineTo = (points: number[], cmd: SvgCommand) => {
  let lineToPoints: number[] = [];
  const absolute = cmd === SvgCommand.V;

  lineToPoints = [
    previousPoint.x,
    absolute ? points[0] : previousPoint.y + points[0],
  ];

  setPreviousPoint(lineToPoints[0], lineToPoints[1]);

  return lineToPoints;
};

export { verticalLineTo };
