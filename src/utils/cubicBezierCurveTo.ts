import { getBezierPoints } from "./bezierCurvePointsGenerator";
import {
  previousPointStore,
  previousCurveEndPointStore,
  configStore,
} from "../stores";

const { previousPoint, updatePreviousPoint } = previousPointStore();
const { updatePreviousCurveEndControlPoint } = previousCurveEndPointStore();
const {
  config: { sampleCount },
} = configStore();

const calculateCubicBezierCurvePoints = (
  points: string[],
  absolute: boolean
) => {
  let start: number[];
  let end: number[];
  let controlPoints: Array<Array<number>>;
  const allCurvePoints: Array<Array<Array<number>>> = [];

  if (points[points.length - 1].endsWith("z")) {
    const updatedzPoint = points[points.length - 1].split("z")[0];
    points[points.length - 1] = updatedzPoint;
  }

  for (let i = 0; i < points.length; i += 6) {
    start = [previousPoint.x, previousPoint.y];

    controlPoints = [
      [
        absolute ? Number(points[i]) : previousPoint.x + Number(points[i]),
        absolute
          ? Number(points[i + 1])
          : previousPoint.y + Number(points[i + 1]),
      ],
      [
        absolute
          ? Number(points[i + 2])
          : previousPoint.x + Number(points[i + 2]),
        absolute
          ? Number(points[i + 3])
          : previousPoint.y + Number(points[i + 3]),
      ],
    ];

    end = [
      absolute
        ? Number(points[i + 4])
        : previousPoint.x + Number(points[i + 4]),
      absolute
        ? Number(points[i + 5])
        : previousPoint.y + Number(points[i + 5]),
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

export { calculateCubicBezierCurvePoints };
