import { Point } from "../types";

const previousCurveEndControlPoint: Point = { x: 0, y: 0 };

function getPreviousCurveEndControlPoint() {
  return previousCurveEndControlPoint;
}

function setPreviousCurveEndControlPoint(value: Point) {
  previousCurveEndControlPoint.x = value.x;
  previousCurveEndControlPoint.y = value.y;
}

export { getPreviousCurveEndControlPoint, setPreviousCurveEndControlPoint };
