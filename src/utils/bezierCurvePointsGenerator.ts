type BezierCurveParameters = {
  start: number[];
  controlPoints: number[][];
  end: number[];
  sampleCount?: number;
};

function bezierCurve({
  start,
  controlPoints,
  end,
  sampleCount,
}: BezierCurveParameters) {
  const points: Array<Array<number>> = [];
  const step = 1 / sampleCount;

  for (let t = 0; t <= 1; t += step) {
    const x = bezierPoint(
      start[0],
      controlPoints[0][0],
      controlPoints[1][0],
      end[0],
      t
    );
    const y = bezierPoint(
      start[1],
      controlPoints[0][1],
      controlPoints[1][1],
      end[1],
      t
    );
    points.push([+x.toFixed(3), +y.toFixed(3)]);
  }

  return points;
}

function bezierPoint(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
) {
  return (
    Math.pow(1 - t, 3) * p0 +
    3 * Math.pow(1 - t, 2) * t * p1 +
    3 * (1 - t) * Math.pow(t, 2) * p2 +
    Math.pow(t, 3) * p3
  );
}

const getBezierPoints = ({
  start,
  controlPoints,
  end,
  sampleCount,
}: BezierCurveParameters): number[][] => {
  const result = bezierCurve({ start, controlPoints, end, sampleCount });

  return result;
};

export { getBezierPoints };
