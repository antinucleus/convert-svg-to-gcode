import { SvgCommand } from "../constants";
import { reflectPoint } from "./curveHelpers";
import { getBezierPoints } from "./bezierCurvePointsGenerator";
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
const { sampleCount } = getConfig();

const calculateSmoothQuadraticBezierCurvePoints = (
  points: number[],
  cmd: SvgCommand
) => {
  let start: number[];
  let end: number[];
  let startControlPoint: number[];
  let controlPoints: Array<Array<number>>;
  const allCurvePoints: Array<Array<Array<number>>> = [];
  const absolute = cmd === SvgCommand.T;

  for (let i = 0; i < points.length; i += 2) {
    start = [previousPoint.x, previousPoint.y];

    if (
      previousSvgCommand.cmd === SvgCommand.Q ||
      previousSvgCommand.cmd === SvgCommand.q ||
      previousSvgCommand.cmd === SvgCommand.T ||
      previousSvgCommand.cmd === SvgCommand.t
    ) {
      startControlPoint = reflectPoint({
        point: previousCurveEndControlPoint,
        respectTo: previousPoint,
      });
    } else {
      startControlPoint = start;
    }

    controlPoints = [startControlPoint, startControlPoint];

    end = [
      absolute ? points[i] : previousPoint.x + points[i],
      absolute ? points[i + 1] : previousPoint.y + points[i + 1],
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
      x: controlPoints[1][0],
      y: controlPoints[1][1],
    });
  }

  return allCurvePoints;
};

export { calculateSmoothQuadraticBezierCurvePoints };
