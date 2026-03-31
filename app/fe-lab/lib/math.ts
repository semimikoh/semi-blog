export interface Point {
  x: number;
  y: number;
}

export function boundingSize(w: number, h: number, angleDeg: number) {
  const θ = (angleDeg * Math.PI) / 180;
  return {
    W: w * Math.abs(Math.cos(θ)) + h * Math.abs(Math.sin(θ)),
    H: w * Math.abs(Math.sin(θ)) + h * Math.abs(Math.cos(θ)),
  };
}

export function recoverDimensions(W: number, H: number, angleDeg: number) {
  const θ = (angleDeg * Math.PI) / 180;
  const cosθ = Math.abs(Math.cos(θ));
  const sinθ = Math.abs(Math.sin(θ));
  const denom = cosθ * cosθ - sinθ * sinθ;
  if (Math.abs(denom) < 1e-9) return { w: NaN, h: NaN };
  return {
    w: Math.abs((W * cosθ - H * sinθ) / denom),
    h: Math.abs((H * cosθ - W * sinθ) / denom),
  };
}

export function findVertices(
  cx: number,
  cy: number,
  w: number,
  h: number,
  angleDeg: number,
): [Point, Point, Point, Point] {
  const θ = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(θ),
    sin = Math.sin(θ);
  const hw = w / 2,
    hh = h / 2;
  const corners: [number, number][] = [
    [-hw, -hh],
    [hw, -hh],
    [hw, hh],
    [-hw, hh],
  ];
  return corners.map(([lx, ly]) => ({
    x: lx * cos - ly * sin + cx,
    y: lx * sin + ly * cos + cy,
  })) as [Point, Point, Point, Point];
}

export interface SearchStep {
  left: number;
  right: number;
  mid: number;
  width: number;
  fits: boolean;
}

export function linearSearchBreakPoint(
  measureFn: (end: number) => number,
  textLen: number,
  maxWidth: number,
) {
  const steps: SearchStep[] = [];
  let result = 0;
  for (let i = 1; i <= textLen; i++) {
    const width = measureFn(i);
    const fits = width <= maxWidth;
    steps.push({ left: 0, right: textLen, mid: i, width, fits });
    if (fits) result = i;
    else break;
  }
  return { result, steps };
}

export function parametricSearchBreakPoint(
  measureFn: (end: number) => number,
  textLen: number,
  maxWidth: number,
) {
  const steps: SearchStep[] = [];
  let left = 0,
    right = textLen,
    result = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const width = measureFn(mid);
    const fits = width <= maxWidth;
    steps.push({ left, right, mid, width, fits });
    if (fits) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return { result, steps };
}
