import { Point } from "./../types/point";
import { getBezierPoints } from "./bezierCurvePointsGenerator";
import { SvgCommand } from "../constants";
import {
  previousCurveEndPointStore,
  previousSvgCommandStore,
  previousPointStore,
  configStore,
} from "../stores";

const { previousPoint, updatePreviousPoint } = previousPointStore();
const { previousSvgCommand } = previousSvgCommandStore();
const { previousCurveEndControlPoint, updatePreviousCurveEndControlPoint } =
  previousCurveEndPointStore();
const {
  config: { sampleCount },
} = configStore();

const calculateSmoothCubicBezierCurvePoints = (
  points: string[],
  absolute: boolean
) => {
  let start: number[];
  let end: number[];
  let startControlPoint: number[];
  let endControlPoint: number[];
  let controlPoints: Array<Array<number>>;
  const allCurvePoints: Array<Array<Array<number>>> = [];

  if (points[points.length - 1].endsWith("z")) {
    const updatedzPoint = points[points.length - 1].split("z")[0];
    points[points.length - 1] = updatedzPoint;
  }

  for (let i = 0; i < points.length; i += 4) {
    start = [previousPoint.x, previousPoint.y];
    endControlPoint = [
      absolute ? Number(points[i]) : previousPoint.x + Number(points[i]),
      absolute
        ? Number(points[i + 1])
        : previousPoint.y + Number(points[i + 1]),
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
      absolute
        ? Number(points[i + 2])
        : previousPoint.x + Number(points[i + 2]),
      absolute
        ? Number(points[i + 3])
        : previousPoint.y + Number(points[i + 3]),
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
      x: endControlPoint[0],
      y: endControlPoint[1],
    });
  }

  return allCurvePoints;
};

type Reflect = {
  point: Point;
  respectTo: Point;
};

const reflectPoint = ({ point, respectTo }: Reflect): number[] => {
  const _x = 2 * respectTo.x - point.x;
  const _y = 2 * respectTo.y - point.y;

  return [_x, _y];
};

export { calculateSmoothCubicBezierCurvePoints };
