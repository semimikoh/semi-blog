'use client';

import { useState, useCallback, useRef } from 'react';
import { useCanvas } from './use-canvas';
import {
  linearSearchBreakPoint,
  parametricSearchBreakPoint,
} from '../lib/math';

const SAMPLE_TEXT =
  '안녕하세요, 캔버스 텍스트 에디터에서 줄바꿈 지점을 찾는 알고리즘입니다. 선형 탐색 vs 파라메트릭 서치!';

export function DemoLineBreak() {
  const [maxWidth, setMaxWidth] = useState(280);
  const [mode, setMode] = useState<'linear' | 'parametric'>('linear');
  const [animStep, setAnimStep] = useState(-1);
  const timerRef = useRef<number | null>(null);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
      ctx.font = '16px sans-serif';
      const measureFn = (end: number) =>
        ctx.measureText(SAMPLE_TEXT.substring(0, end)).width;
      const { result, steps } =
        mode === 'linear'
          ? linearSearchBreakPoint(measureFn, SAMPLE_TEXT.length, maxWidth)
          : parametricSearchBreakPoint(measureFn, SAMPLE_TEXT.length, maxWidth);

      const visibleSteps = animStep >= 0 ? steps.slice(0, animStep + 1) : steps;
      const textY = 50;
      const barStartX = 30;
      const barHeight = 24;
      const stepAreaY = textY + barHeight + 40;
      const stepH = 32;
      const maxVisible = Math.floor((ch - stepAreaY - 10) / stepH);
      const startIdx = Math.max(0, visibleSteps.length - maxVisible);
      const displaySteps = visibleSteps.slice(startIdx);

      // 텍스트 배경
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(
        barStartX,
        textY,
        ctx.measureText(SAMPLE_TEXT).width,
        barHeight,
      );

      // maxWidth 한계선
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(barStartX + maxWidth, textY - 10);
      ctx.lineTo(barStartX + maxWidth, textY + barHeight + 10);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ef4444';
      ctx.font = '12px monospace';
      ctx.fillText(
        `maxWidth = ${maxWidth}px`,
        barStartX + maxWidth + 5,
        textY - 2,
      );

      // 텍스트
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#1a1a1a';
      ctx.fillText(SAMPLE_TEXT, barStartX, textY + 17);

      // 생략 표시
      if (startIdx > 0) {
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px monospace';
        ctx.fillText(`... ${startIdx}개 스텝 생략`, barStartX, stepAreaY - 8);
      }

      // 스텝 시각화
      ctx.font = '12px monospace';
      displaySteps.forEach((step, i) => {
        const y = stepAreaY + i * stepH;
        const barW = Math.min(step.width, cw - barStartX - 20);

        ctx.fillStyle = step.fits
          ? 'rgba(34,197,94,0.2)'
          : 'rgba(239,68,68,0.2)';
        ctx.fillRect(barStartX, y, barW, 22);
        ctx.strokeStyle = step.fits ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 1;
        ctx.strokeRect(barStartX, y, barW, 22);

        ctx.fillStyle = '#6b7280';
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
          `${step.width.toFixed(0)}px ${step.fits ? '✓' : '✗'}`,
          barStartX + 4,
          y + 15,
        );
      });

      // 결과 표시
      if (animStep < 0 || animStep >= steps.length - 1) {
        const rw = ctx.measureText(SAMPLE_TEXT.substring(0, result)).width;
        ctx.fillStyle = 'rgba(59,130,246,0.12)';
        ctx.fillRect(barStartX, textY, rw, barHeight);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.strokeRect(barStartX, textY, rw, barHeight);
      }
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

  const startAnimation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setAnimStep(0);
    let step = 0;
    timerRef.current = window.setInterval(() => {
      step++;
      setAnimStep(step);
      if (step >= 30) {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 500);
  };

  const counts = getStepCounts();

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        className="h-[400px] w-full rounded-lg border border-border bg-background"
      />

      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-muted">
          최대 너비:{' '}
          <span className="font-semibold text-foreground">{maxWidth}px</span>
        </span>
        <input
          type="range"
          min={100}
          max={450}
          step={10}
          value={maxWidth}
          onChange={(e) => {
            setMaxWidth(Number(e.target.value));
            setAnimStep(-1);
          }}
          className="flex-1 accent-[var(--primary)]"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setMode('linear');
            setAnimStep(-1);
          }}
          className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
            mode === 'linear'
              ? 'bg-foreground text-background font-semibold'
              : 'bg-card text-muted hover:text-foreground'
          }`}
        >
          선형 탐색 O(n)
        </button>
        <button
          onClick={() => {
            setMode('parametric');
            setAnimStep(-1);
          }}
          className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
            mode === 'parametric'
              ? 'bg-foreground text-background font-semibold'
              : 'bg-card text-muted hover:text-foreground'
          }`}
        >
          파라메트릭 서치 O(log n)
        </button>
        <button
          onClick={startAnimation}
          className="rounded-md bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100"
        >
          ▶ 애니메이션
        </button>
      </div>

      <div className="rounded-lg border border-border bg-background p-4">
        <h3 className="mb-2 font-bold text-foreground">
          {mode === 'linear' ? '선형 탐색' : '파라메트릭 서치'}
        </h3>
        <p className="text-sm text-muted">
          {mode === 'linear'
            ? '한 글자씩 순차적으로 측정하며 maxWidth를 초과하는 지점을 찾습니다.'
            : '이분 탐색으로 조건을 만족하는 최대 인덱스를 찾습니다.'}
        </p>
        <p className="mt-1 text-sm text-muted">
          시간복잡도:{' '}
          <strong className="text-foreground">
            {mode === 'linear' ? 'O(n)' : 'O(log n)'}
          </strong>
        </p>

        <table className="mt-3 w-full text-xs">
          <thead>
            <tr className="text-muted">
              <th className="py-1 text-left"></th>
              <th className="py-1 text-right">선형</th>
              <th className="py-1 text-right">파라메트릭</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-0.5 text-muted">복잡도</td>
              <td className="py-0.5 text-right">O(n)</td>
              <td className="py-0.5 text-right">O(log n)</td>
            </tr>
            <tr>
              <td className="py-0.5 text-muted">탐색 수</td>
              <td className="py-0.5 text-right font-semibold">
                {counts.linear}
              </td>
              <td className="py-0.5 text-right font-semibold">
                {counts.param}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
