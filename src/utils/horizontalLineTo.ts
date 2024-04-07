import { SvgCommand } from "../constants";
import { getPreviousPoint, setPreviousPoint } from "../stores";

const previousPoint = getPreviousPoint();

const horizontalLineTo = (points: number[], cmd: SvgCommand) => {
  let lineToPoints: number[] = [];
  const absolute = cmd === SvgCommand.H;

  lineToPoints = [
    absolute ? points[0] : previousPoint.x + points[0],
    previousPoint.y,
  ];

  setPreviousPoint(lineToPoints[0], lineToPoints[1]);

  return lineToPoints;
};

export { horizontalLineTo };
