'use client';

import { useState, useCallback, useRef } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useCanvas } from './use-canvas';
import {
  linearSearchBreakPoint,
  parametricSearchBreakPoint,
} from '../lib/math';

const SAMPLE_TEXT =
  '안녕하세요, 캔버스 텍스트 에디터에서 줄바꿈 지점을 찾는 알고리즘입니다. 선형 탐색 vs 파라메트릭 서치!';

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

export function DemoLineBreak() {
  const [maxWidth, setMaxWidth] = useState(280);
  const [mode, setMode] = useState<'linear' | 'parametric'>('linear');
  const [animStep, setAnimStep] = useState(-1);
  const timerRef = useRef<number | null>(null);
  const dragging = useRef(false);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
      ctx.font = '16px sans-serif';
      const measureFn = (end: number) =>
        ctx.measureText(SAMPLE_TEXT.substring(0, end)).width;
      const { result, steps } =
        mode === 'linear'
          ? linearSearchBreakPoint(measureFn, SAMPLE_TEXT.length, maxWidth)
          : parametricSearchBreakPoint(measureFn, SAMPLE_TEXT.length, maxWidth);

      const visibleSteps = animStep >= 0 ? steps.slice(0, animStep + 1) : [];
      const textY = 30;
      const barStartX = 0;
      const barHeight = 34;
      const stepAreaY = textY + barHeight + 25;
      const stepH = 26;
      const maxVisible = Math.floor((ch - stepAreaY - 10) / stepH);
      const startIdx = Math.max(0, visibleSteps.length - maxVisible);
      const displaySteps = visibleSteps.slice(startIdx);

      ctx.fillStyle = '#88888826';
      ctx.fillRect(barStartX, textY, maxWidth, barHeight);

      const lineX = barStartX + maxWidth;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(lineX, textY - 14);
      ctx.lineTo(lineX, textY + barHeight + 10);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(lineX, textY - 10);
      ctx.lineTo(lineX - 8, textY - 22);
      ctx.lineTo(lineX + 8, textY - 22);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '12px monospace';
      ctx.fillText(`${maxWidth}px`, lineX + 10, textY - 7);

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#666666';
      ctx.textBaseline = 'middle';
      ctx.fillText(SAMPLE_TEXT, barStartX, textY + barHeight / 2);
      ctx.textBaseline = 'alphabetic';

      if (startIdx > 0) {
        ctx.fillStyle = '#888888';
        ctx.font = '12px monospace';
        ctx.fillText(`... ${startIdx}개 스텝 생략`, barStartX, stepAreaY - 8);
      }

      ctx.font = '12px monospace';
      displaySteps.forEach((step, i) => {
        const y = stepAreaY + i * stepH;
        const barW = Math.min(step.width, cw - barStartX - 20);

        ctx.fillStyle = step.fits ? '#22c55e33' : '#ef444433';
        ctx.fillRect(barStartX, y, barW, 22);
        ctx.strokeStyle = step.fits ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 1;
        ctx.strokeRect(barStartX, y, barW, 22);

        ctx.fillStyle = '#888888';
        if (mode === 'parametric') {
          ctx.fillText(
            `[${step.left},${step.right}] mid=${step.mid}`,
            barStartX + barW + 8,
            y + 15,
          );
        } else {
          ctx.fillText(`i=${step.mid}`, barStartX + barW + 8, y + 15);
        }

        ctx.fillStyle = step.fits ? '#22c55e' : '#ef4444';
        ctx.fillText(
          `${step.width.toFixed(0)}px ${step.fits ? '\u2713' : '\u2717'}`,
          barStartX + 4,
          y + 15,
        );
      });
    },
    [maxWidth, mode, animStep],
  );

  const { canvasRef } = useCanvas(draw);

  const getStepCounts = () => {
    const canvas = canvasRef.current;
    if (!canvas) return { linear: 0, param: 0 };
    const ctx = canvas.getContext('2d')!;
    ctx.font = '16px sans-serif';
    const measureFn = (end: number) =>
      ctx.measureText(SAMPLE_TEXT.substring(0, end)).width;
    return {
      linear: linearSearchBreakPoint(measureFn, SAMPLE_TEXT.length, maxWidth)
        .steps.length,
      param: parametricSearchBreakPoint(measureFn, SAMPLE_TEXT.length, maxWidth)
        .steps.length,
    };
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const startAnimation = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setAnimStep(0);
    setIsPlaying(true);
    let step = 0;
    let lastTime = performance.now();
    const STEP_INTERVAL = 500;

    const tick = (now: number) => {
      if (now - lastTime >= STEP_INTERVAL) {
        step++;
        setAnimStep(step);
        lastTime = now;
        if (step >= 30) {
          setIsPlaying(false);
          timerRef.current = null;
          return;
        }
      }
      timerRef.current = requestAnimationFrame(tick);
    };
    timerRef.current = requestAnimationFrame(tick);
  };

  const pauseAnimation = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = null;
    setIsPlaying(false);
  };

  const stopAnimation = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = null;
    setIsPlaying(false);
    setAnimStep(-1);
  };

  const handleStart = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>,
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pos = getCanvasPos(canvas, e);
      const textY = 30;
      if (
        Math.abs(pos.x - maxWidth) < 15 &&
        pos.y >= textY - 30 &&
        pos.y <= textY
      ) {
        dragging.current = true;
      }
    },
    [canvasRef, maxWidth],
  );

  const handleMove = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>,
    ) => {
      if (!dragging.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pos = getCanvasPos(canvas, e);
      const newWidth = Math.round(Math.max(50, Math.min(500, pos.x)));
      setMaxWidth(newWidth);
      setAnimStep(-1);
    },
    [canvasRef],
  );

  const handleEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  const counts = getStepCounts();

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <p className="text-[12px] text-foreground/30">
        노란색 삼각형을 클릭하면 텍스트 너비를 조정할 수 있습니다
      </p>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Text line break search algorithm visualization"
        className="block h-[310px] w-full max-w-full rounded-lg border-none bg-background sm:h-[280px]"
        style={{ touchAction: 'none' }}
        onMouseDown={handleStart}
        onMouseMove={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const pos = getCanvasPos(canvas, e);
          const textY = 30;
          const nearHandle =
            Math.abs(pos.x - maxWidth) < 15 &&
            pos.y >= textY - 30 &&
            pos.y <= textY;
          canvas.style.cursor = nearHandle ? 'col-resize' : 'default';
          handleMove(e);
        }}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        텍스트 줄바꿈 탐색 알고리즘 시각화
      </canvas>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setMode('linear');
            setAnimStep(-1);
          }}
          className={`text-[14px] font-semibold transition-colors ${
            mode === 'linear'
              ? 'text-foreground/70 [background:linear-gradient(transparent_60%,var(--highlight)_60%)]'
              : 'text-muted hover:text-foreground'
          }`}
        >
          선형 탐색 O(n)
        </button>
        <button
          onClick={() => {
            setMode('parametric');
            setAnimStep(-1);
          }}
          className={`text-[14px] font-semibold transition-colors ${
            mode === 'parametric'
              ? 'text-foreground/70 [background:linear-gradient(transparent_60%,var(--highlight)_60%)]'
              : 'text-muted hover:text-foreground'
          }`}
        >
          파라메트릭 서치 O(log n)
        </button>
        <span className="block w-full sm:hidden" />
        <span className="hidden sm:inline"> </span>
        <button
          onClick={startAnimation}
          className="flex items-center gap-1 text-[14px] font-semibold text-foreground/50 transition-colors hover:text-foreground/70"
        >
          <Play size={14} /> 재생
        </button>
        <button
          onClick={pauseAnimation}
          className="flex items-center gap-1 text-[14px] font-semibold text-foreground/50 transition-colors hover:text-foreground/70"
        >
          <Pause size={14} /> 일시정지
        </button>
        <button
          onClick={stopAnimation}
          className="flex items-center gap-1 text-[14px] font-semibold text-foreground/50 transition-colors hover:text-foreground/70"
        >
          <Square size={14} /> 멈춤
        </button>
      </div>

      <p className="text-[14px] text-muted">
        {mode === 'linear'
          ? '한 글자씩 순차적으로 측정하며 maxWidth를 초과하는 지점을 찾습니다.'
          : '파라메트릭 서치로 조건을 만족하는 최대 인덱스를 찾습니다.'}
      </p>

      <table className="solid-borders max-w-xs text-[12px]">
        <thead>
          <tr>
            <th className="border-b border-foreground/15 px-5 py-1.5 text-center text-muted"></th>
            <th className="border-b border-foreground/15 px-5 py-1.5 text-center font-bold text-muted">
              선형
            </th>
            <th className="border-b border-foreground/15 px-5 py-1.5 text-center font-bold text-muted">
              파라메트릭
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5 py-1.5 text-center text-muted">복잡도</td>
            <td className="px-5 py-1.5 text-center">O(n)</td>
            <td className="px-5 py-1.5 text-center">O(log n)</td>
          </tr>
          <tr>
            <td className="px-5 py-1.5 text-center text-muted">탐색 수</td>
            <td className="px-5 py-1.5 text-center font-semibold text-amber">
              {counts.linear}
            </td>
            <td className="px-5 py-1.5 text-center font-semibold text-primary">
              {counts.param}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
