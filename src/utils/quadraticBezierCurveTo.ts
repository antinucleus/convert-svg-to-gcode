import { getBezierPoints } from "./bezierCurvePointsGenerator";
import {
  previousPointStore,
  previousCurveEndPointStore,
  configStore,
} from "../stores";
import { SvgCommand } from "../constants";

const { previousPoint, updatePreviousPoint } = previousPointStore();
const { updatePreviousCurveEndControlPoint } = previousCurveEndPointStore();
const {
  config: { sampleCount },
} = configStore();

const calculateQuadraticBezierCurvePoints = (
  points: number[],
  cmd: SvgCommand
) => {
  let start: number[];
  let end: number[];
  let controlPoints: Array<Array<number>>;
  const allCurvePoints: Array<Array<Array<number>>> = [];
  const absolute = cmd === SvgCommand.Q;

  for (let i = 0; i < points.length; i += 4) {
    start = [previousPoint.x, previousPoint.y];

    controlPoints = [
      [
        absolute ? points[i] : previousPoint.x + points[i],
        absolute ? points[i + 1] : previousPoint.y + points[i + 1],
      ],
      [
        absolute ? points[i] : previousPoint.x + points[i],
        absolute ? points[i + 1] : previousPoint.y + points[i + 1],
      ],
    ];

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
    updatePreviousPoint(end[0], end[1]);
    updatePreviousCurveEndControlPoint({
      x: controlPoints[1][0],
      y: controlPoints[1][1],
    });
  }

  return allCurvePoints;
};

export { calculateQuadraticBezierCurvePoints };
