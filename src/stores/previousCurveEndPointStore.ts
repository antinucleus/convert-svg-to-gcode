import { Point } from "../types";

const previousCurveEndControlPoint: Point = { x: 0, y: 0 };

function previousCurveEndPointStore() {
  function updatePreviousCurveEndControlPoint(value: Point) {
    previousCurveEndControlPoint.x = value.x;
    previousCurveEndControlPoint.y = value.y;
  }

  return { previousCurveEndControlPoint, updatePreviousCurveEndControlPoint };
}

export { previousCurveEndPointStore };
