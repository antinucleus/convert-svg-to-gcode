import { PreviousPoint, UpdatePreviousPoint } from "../types";
import { getBezierPoints } from "./bezierCurvePointsGenerator";
import { getConfig } from "./parseConfig";
import { defaultSampleCount } from "../constants";

let { sampleCount } = getConfig();
sampleCount = sampleCount ? sampleCount : defaultSampleCount;

const calculateCubicBezierCurvePoints = (
  points: string[],
  previousPoint: PreviousPoint,
  updatePreviousPoint: UpdatePreviousPoint,
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
  }

  return allCurvePoints;
};

export { calculateCubicBezierCurvePoints };
