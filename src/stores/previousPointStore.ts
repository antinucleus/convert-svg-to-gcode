import { Point } from "../types/point";

const previousPoint: Point = { x: 0, y: 0 };

function previousPointStore() {
  function updatePreviousPoint(x: number, y: number) {
    previousPoint.x = x;
    previousPoint.y = y;
  }

  return {
    previousPoint,
    updatePreviousPoint,
  };
}

export { previousPointStore };
