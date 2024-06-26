import { SvgCommand } from "../constants";
import { getPreviousPoint, setPreviousPoint } from "../stores";

const previousPoint = getPreviousPoint();

const moveTo = (points: number[], cmd: SvgCommand) => {
  let moveTo: number[] = [];
  const absolute = cmd === SvgCommand.M;

  moveTo = [
    absolute ? points[0] : previousPoint.x + points[0],
    absolute ? points[1] : previousPoint.y + points[1],
  ];

  setPreviousPoint(moveTo[0], moveTo[1]);

  return moveTo;
};

export { moveTo };
