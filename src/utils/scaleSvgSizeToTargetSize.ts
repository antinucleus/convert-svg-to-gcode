const scaleSvgSizeToTargetSize = (
  points: number[],
  conversion: number,
  multiplier: { mw: number; mh: number },
  svgScaleValue: { x: number; y: number }
) => {
  for (let i = 0; i < points.length; i += 2) {
    points[i] *= svgScaleValue.x * multiplier.mw * conversion; // x
    points[i + 1] *= svgScaleValue.y * multiplier.mh * conversion; // y

    points[i] = Number(points[i].toFixed(3));
    points[i + 1] = Number(points[i + 1].toFixed(3));
  }
};

export { scaleSvgSizeToTargetSize };
