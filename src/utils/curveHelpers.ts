import { Point } from "../types";

type Reflect = {
  point: Point;
  respectTo: Point;
};

const reflectPoint = ({ point, respectTo }: Reflect): number[] => {
  const _x = 2 * respectTo.x - point.x;
  const _y = 2 * respectTo.y - point.y;

  return [_x, _y];
};

export { reflectPoint };
