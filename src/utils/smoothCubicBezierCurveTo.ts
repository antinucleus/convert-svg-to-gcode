import { getBezierPoints } from "./bezierCurvePointsGenerator";
import { SvgCommand } from "../constants";
import { reflectPoint } from "./curveHelpers";
import {
  getPreviousPoint,
  setPreviousPoint,
  getPreviousCurveEndControlPoint,
  setPreviousCurveEndControlPoint,
  getPreviousSvgCommand,
  getConfig,
} from "../stores";

const previousPoint = getPreviousPoint();
const previousCurveEndControlPoint = getPreviousCurveEndControlPoint();
const previousSvgCommand = getPreviousSvgCommand();

const calculateSmoothCubicBezierCurvePoints = (
  points: number[],
  cmd: SvgCommand
) => {
  const { sampleCount } = getConfig();
  let start: number[];
  let end: number[];
  let startControlPoint: number[];
  let endControlPoint: number[];
  let controlPoints: Array<Array<number>>;
  const allCurvePoints: Array<Array<Array<number>>> = [];
  const absolute = cmd === SvgCommand.S;

  for (let i = 0; i < points.length; i += 4) {
    start = [previousPoint.x, previousPoint.y];
    endControlPoint = [
      absolute ? points[i] : previousPoint.x + points[i],
      absolute ? points[i + 1] : previousPoint.y + points[i + 1],
    ];

    if (
      previousSvgCommand.cmd === SvgCommand.C ||
      previousSvgCommand.cmd === SvgCommand.c ||
      previousSvgCommand.cmd === SvgCommand.S ||
      previousSvgCommand.cmd === SvgCommand.s
    ) {
      startControlPoint = reflectPoint({
        point: previousCurveEndControlPoint,
        respectTo: previousPoint,
      });
    } else {
      startControlPoint = start;
    }

    controlPoints = [startControlPoint, endControlPoint];

    end = [
      absolute ? points[i + 2] : previousPoint.x + points[i + 2],
      absolute ? points[i + 3] : previousPoint.y + points[i + 3],
    ];

    const curvePoints = getBezierPoints({
      start,
      controlPoints,
      end,
      sampleCount,
    });

    allCurvePoints.push(curvePoints);
    setPreviousPoint(end[0], end[1]);
    setPreviousCurveEndControlPoint({
      x: endControlPoint[0],
      y: endControlPoint[1],
    });
  }

  return allCurvePoints;
};

export { calculateSmoothCubicBezierCurvePoints };
