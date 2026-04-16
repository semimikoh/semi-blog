export const COMBINED_CODE = `interface RealRect {
  width: number;
  height: number;
  cx: number;
  cy: number;
  vertices: { x: number; y: number }[];
  angle: number;
}

function getRealRect(
  element: HTMLElement,
  angleDeg?: number
): RealRect | null {
  const angle = angleDeg ?? getRotationDeg(element);
  const θ = (angle * Math.PI) / 180;
  const { x, y, width: W, height: H } = element.getBoundingClientRect();
  const absC = Math.abs(Math.cos(θ));
  const absS = Math.abs(Math.sin(θ));
  const denom = absC * absC - absS * absS;

  if (Math.abs(denom) < 1e-9) return null;

  const width  = Math.abs((W * absC - H * absS) / denom);
  const height = Math.abs((H * absC - W * absS) / denom);
  const cx = x + W / 2;
  const cy = y + H / 2;

  const cos = Math.cos(θ), sin = Math.sin(θ);
  const hw = width / 2, hh = height / 2;
  const corners = [[-hw,-hh],[hw,-hh],[hw,hh],[-hw,hh]];
  const vertices = corners.map(([lx, ly]) => ({
    x: lx * cos - ly * sin + cx,
    y: lx * sin + ly * cos + cy,
  }));

  return { width, height, cx, cy, vertices, angle };
}

function getRotationDeg(el: HTMLElement): number {
  const st = getComputedStyle(el).transform;
  if (!st || st === 'none') return 0;
  const m = st.match(/matrix\\(([^)]+)\\)/);
  if (!m) return 0;
  const [a, b] = m[1].split(',').map(Number);
  return Math.atan2(b, a) * (180 / Math.PI);
}`;
