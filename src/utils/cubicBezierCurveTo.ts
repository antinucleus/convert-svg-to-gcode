import { getBezierPoints } from "./bezierCurvePointsGenerator";
import {
  getPreviousPoint,
  setPreviousPoint,
  setPreviousCurveEndControlPoint,
  getConfig,
} from "../stores";
import { SvgCommand } from "../constants";

const previousPoint = getPreviousPoint();

const calculateCubicBezierCurvePoints = (points: number[], cmd: SvgCommand) => {
  const { sampleCount } = getConfig();

  let start: number[];
  let end: number[];
  let controlPoints: Array<Array<number>>;
  const allCurvePoints: Array<Array<Array<number>>> = [];
  const absolute = cmd === SvgCommand.C;

  for (let i = 0; i < points.length; i += 6) {
    start = [previousPoint.x, previousPoint.y];

    controlPoints = [
      [
        absolute ? points[i] : previousPoint.x + points[i],
        absolute ? points[i + 1] : previousPoint.y + points[i + 1],
      ],
      [
        absolute ? points[i + 2] : previousPoint.x + points[i + 2],
        absolute ? points[i + 3] : previousPoint.y + points[i + 3],
      ],
    ];

    end = [
      absolute ? points[i + 4] : previousPoint.x + points[i + 4],
      absolute ? points[i + 5] : previousPoint.y + points[i + 5],
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

export { calculateCubicBezierCurvePoints };
