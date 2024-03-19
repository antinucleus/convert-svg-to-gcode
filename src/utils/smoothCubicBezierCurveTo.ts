import { getBezierPoints } from "./bezierCurvePointsGenerator";
import { SvgCommand } from "../constants";
import { reflectPoint } from "./curveHelpers";
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
  points: number[],
  cmd: SvgCommand
) => {
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
    updatePreviousPoint(end[0], end[1]);
    updatePreviousCurveEndControlPoint({
      x: endControlPoint[0],
      y: endControlPoint[1],
    });
  }

  return allCurvePoints;
};

export { calculateSmoothCubicBezierCurvePoints };
