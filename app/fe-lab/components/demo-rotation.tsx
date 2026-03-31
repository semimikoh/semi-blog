'use client';

import { useState, useCallback, useRef } from 'react';
import { useCanvas } from './use-canvas';
import { CopyBlock } from './copy-block';
import { boundingSize, recoverDimensions, findVertices } from '../lib/math';
import { COMBINED_CODE } from '../lib/snippet';

const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#a855f7'];
const LABELS = ['TL', 'TR', 'BR', 'BL'];
const BOUNDING_KEYS = [
  'x',
  'y',
  'width',
  'height',
  'top',
  'right',
  'bottom',
  'left',
] as const;

type DragMode = null | 'rotate' | { type: 'vertex'; index: number };

function getCanvasPos(
  canvas: HTMLCanvasElement,
  e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent,
) {
  const rect = canvas.getBoundingClientRect();
  if ('touches' in e) {
    const touch = e.touches[0] || e.changedTouches[0];
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }
  return {
    x: (e as MouseEvent).clientX - rect.left,
    y: (e as MouseEvent).clientY - rect.top,
  };
}

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

export function DemoRotation() {
  const [angle, setAngle] = useState(30);
  const [w, setW] = useState(200);
  const [h, setH] = useState(200);
  const dragMode = useRef<DragMode>(null);
  const canvasCenter = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
      const cx = cw / 2;
      const cy = ch / 2 - 10;
      canvasCenter.current = { x: cx, y: cy };
      const { W, H } = boundingSize(w, h, angle);

      // 캔버스에 맞게 스케일 계산 (여백 60px)
      const margin = 60;
      const scale = Math.min((cw - margin * 2) / W, (ch - margin * 2) / H, 1);
      scaleRef.current = scale;
      const sw = w * scale;
      const sh = h * scale;
      const sW = W * scale;
      const sH = H * scale;

      // 바운딩렉트 (노랑 점선)
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - sW / 2, cy - sH / 2, sW, sH);
      ctx.setLineDash([]);
      ctx.restore();

      // 회전 사각형 (초록 실선)
      const θ = (angle * Math.PI) / 180;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(θ);
      ctx.fillStyle = '#22c55e0d';
      ctx.fillRect(-sw / 2, -sh / 2, sw, sh);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.strokeRect(-sw / 2, -sh / 2, sw, sh);
      ctx.restore();

      // 꼭짓점 (스케일된 좌표)
      const verts = findVertices(cx, cy, sw, sh, angle);
      verts.forEach((v, i) => {
        // 중심→꼭짓점 점선
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = COLORS[i];
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // 점
        ctx.beginPath();
        ctx.arc(v.x, v.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[i];
        ctx.fill();

        // 라벨
        ctx.fillStyle = COLORS[i];
        ctx.font = '12px monospace';
        ctx.fillText(
          `${LABELS[i]} (${v.x.toFixed(2)}, ${v.y.toFixed(2)})`,
          v.x + 8,
          v.y - 8,
        );
      });

      // 중심
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#888888';
      ctx.fill();

      // 라벨
      ctx.fillStyle = '#f59e0b';
      ctx.font = '12px monospace';
      ctx.fillText(
        `W=${W.toFixed(2)}, H=${H.toFixed(2)}`,
        cx + sW / 2 + 8,
        cy - sH / 2 + 14,
      );
      ctx.fillStyle = '#22c55e';
      ctx.fillText(`w=${w}, h=${h}`, cx + sW / 2 + 8, cy - sH / 2 + 30);
    },
    [angle, w, h],
  );

  const { canvasRef } = useCanvas(draw);
  const { W, H } = boundingSize(w, h, angle);
  const recovered = recoverDimensions(W, H, angle);
  const isDegenerate = isNaN(recovered.w);
  const verts = findVertices(0, 0, w, h, angle);
  const recoveredVerts = isDegenerate
    ? []
    : findVertices(0, 0, recovered.w, recovered.h, angle);

  // getBoundingClientRect 시뮬레이션 (원점 중심 기준)
  const bounding = {
    x: -W / 2,
    y: -H / 2,
    width: W,
    height: H,
    top: -H / 2,
    right: W / 2,
    bottom: H / 2,
    left: -W / 2,
  };

  // 역산 값으로 계산한 동일 정보
  const recoveredBounding = isDegenerate
    ? null
    : {
        x: bounding.x,
        y: bounding.y,
        width: recovered.w,
        height: recovered.h,
        top: bounding.top,
        right: bounding.right,
        bottom: bounding.bottom,
        left: bounding.left,
      };

  const handleStart = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>,
    ) => {
      if ('touches' in e) e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pos = getCanvasPos(canvas, e);
      const { x: cx, y: cy } = canvasCenter.current;
      const scale = scaleRef.current;
      const sw = w * scale;
      const sh = h * scale;
      const canvasVerts = findVertices(cx, cy, sw, sh, angle);

      // 꼭짓점 hit 판정 (반경 12px)
      for (let i = 0; i < canvasVerts.length; i++) {
        if (dist(pos.x, pos.y, canvasVerts[i].x, canvasVerts[i].y) < 12) {
          dragMode.current = { type: 'vertex', index: i };
          return;
        }
      }

      // 그 외 → 회전 드래그
      dragMode.current = 'rotate';
    },
    [canvasRef, w, h, angle],
  );

  const handleMove = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>,
    ) => {
      if ('touches' in e) e.preventDefault();
      if (!dragMode.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pos = getCanvasPos(canvas, e);
      const { x: cx, y: cy } = canvasCenter.current;
      const scale = scaleRef.current;

      if (dragMode.current === 'rotate') {
        // 마우스 → 중심 각도 계산
        const newAngle = Math.atan2(pos.y - cy, pos.x - cx) * (180 / Math.PI);
        setAngle(Math.round(((newAngle % 360) + 360) % 360));
      } else if (dragMode.current.type === 'vertex') {
        // 꼭짓점 드래그 → 크기 조절
        const dx = pos.x - cx;
        const dy = pos.y - cy;
        const θ = (angle * Math.PI) / 180;
        const cos = Math.cos(-θ);
        const sin = Math.sin(-θ);
        // 마우스를 로컬 좌표로 역회전
        const localX = dx * cos - dy * sin;
        const localY = dx * sin + dy * cos;
        const newW = Math.round(
          Math.max(20, Math.min(400, Math.abs(localX) * 2)),
        );
        const newH = Math.round(
          Math.max(20, Math.min(400, Math.abs(localY) * 2)),
        );
        if (isFinite(newW) && isFinite(newH)) {
          setW(newW);
          setH(newH);
        }
      }
    },
    [canvasRef, angle],
  );

  const handleEnd = useCallback(() => {
    dragMode.current = null;
  }, []);

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <p className="text-[14px] text-foreground/60">
        θ={angle}° · w={w} · h={h}
      </p>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="block h-[250px] w-full max-w-full rounded-lg border-none bg-background sm:h-[300px]"
          style={{ cursor: 'crosshair', touchAction: 'none' }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
        <p className="absolute bottom-2 left-2 text-[12px] text-foreground/30">
          클릭해서 마우스를 움직이면 회전 가능합니다
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p
            className="mb-1 text-[14px] font-bold"
            style={{ color: '#f59e0b' }}
          >
            getBoundingClientRect()
          </p>
          <pre className="rounded-lg bg-foreground/5 p-3 text-[13px] leading-relaxed">
            <code>{`{\n  "width": ${W.toFixed(2)},\n  "height": ${H.toFixed(2)},\n  "vertices": [\n    { "TL": [${(-W / 2).toFixed(2)}, ${(-H / 2).toFixed(2)}] },\n    { "TR": [${(W / 2).toFixed(2)}, ${(-H / 2).toFixed(2)}] },\n    { "BR": [${(W / 2).toFixed(2)}, ${(H / 2).toFixed(2)}] },\n    { "BL": [${(-W / 2).toFixed(2)}, ${(H / 2).toFixed(2)}] }\n  ]\n}`}</code>
          </pre>
        </div>
        <div>
          <p className="mb-1 text-[14px] font-bold text-primary">역산 결과</p>
          <pre className="rounded-lg bg-foreground/5 p-3 text-[13px] leading-relaxed">
            <code>
              {isDegenerate
                ? '// θ ≈ 45°: 역산 불가'
                : `{\n  "width": ${recovered.w.toFixed(2)},\n  "height": ${recovered.h.toFixed(2)},\n  "vertices": [\n${recoveredVerts.map((v, i) => `    { "${LABELS[i]}": [${v.x.toFixed(2)}, ${v.y.toFixed(2)}] }`).join(',\n')}\n  ]\n}`}
            </code>
          </pre>
        </div>
      </div>

      <CopyBlock code={COMBINED_CODE} />
    </div>
  );
}
