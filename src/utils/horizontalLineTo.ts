import { SvgCommand } from "../constants";
import { previousPointStore } from "../stores";

const { previousPoint, updatePreviousPoint } = previousPointStore();

const horizontalLineTo = (points: number[], cmd: SvgCommand) => {
  let lineToPoints: number[] = [];
  const absolute = cmd === SvgCommand.H;

  lineToPoints = [
    absolute ? points[0] : previousPoint.x + points[0],
    previousPoint.y,
  ];

  updatePreviousPoint(lineToPoints[0], lineToPoints[1]);

  return lineToPoints;
};

export { horizontalLineTo };
