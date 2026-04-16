import { useRef, useEffect, useCallback } from 'react';

export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);
    draw(ctx, rect.width, rect.height);
  }, [draw]);

  useEffect(() => {
    render();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => render());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [render]);

  return { canvasRef, render };
}
