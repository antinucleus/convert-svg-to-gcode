import { Point } from "../types/point";

const previousPoint: Point = { x: 0, y: 0 };

function getPreviousPoint() {
  return previousPoint;
}

function setPreviousPoint(x: number, y: number) {
  previousPoint.x = x;
  previousPoint.y = y;
}

export { getPreviousPoint, setPreviousPoint };
