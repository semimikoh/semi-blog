'use client';

import { useRef, useCallback, useEffect } from 'react';

export function WalkingDog() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dogX = useRef(150);
  const direction = useRef(1); // 1 = right, -1 = left
  const frame = useRef(0);
  const targetX = useRef<number | null>(null);
  const jumpY = useRef(0);
  const jumping = useRef(false);
  const jumpVel = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    const dark = document.documentElement.classList.contains('dark');

    // 하늘
    ctx.fillStyle = dark ? '#1a1a2e' : '#e8f4f8';
    ctx.fillRect(0, 0, w, h * 0.6);

    // 잔디
    ctx.fillStyle = dark ? '#2d4a2d' : '#a8d5a2';
    ctx.fillRect(0, h * 0.6, w, h * 0.15);

    // 산책길
    ctx.fillStyle = dark ? '#3a3428' : '#d4c4a8';
    ctx.fillRect(0, h * 0.7, w, h * 0.15);

    // 산책길 점선
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = dark ? '#4a4438' : '#c4b498';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.775);
    ctx.lineTo(w, h * 0.775);
    ctx.stroke();
    ctx.setLineDash([]);

    // 아래 잔디
    ctx.fillStyle = dark ? '#2d4a2d' : '#a8d5a2';
    ctx.fillRect(0, h * 0.85, w, h * 0.15);

    // 구름
    ctx.fillStyle = dark ? '#333344' : '#ffffff';
    drawCloud(ctx, w * 0.2, h * 0.15, 30);
    drawCloud(ctx, w * 0.6, h * 0.25, 22);
    drawCloud(ctx, w * 0.85, h * 0.1, 26);

    // 나무
    drawTree(ctx, w * 0.1, h * 0.55, dark);
    drawTree(ctx, w * 0.9, h * 0.52, dark);

    // 랜덤 점프 (5초 이상 간격)
    if (
      !jumping.current &&
      frame.current > 0 &&
      frame.current % Math.floor(300 + Math.random() * 300) === 0
    ) {
      jumping.current = true;
      jumpVel.current = -6;
    }
    if (jumping.current) {
      jumpY.current += jumpVel.current;
      jumpVel.current += 0.4;
      if (jumpY.current >= 0) {
        jumpY.current = 0;
        jumping.current = false;
      }
    }

    // 목표 위치로 이동
    if (targetX.current !== null) {
      const diff = targetX.current - dogX.current;
      if (Math.abs(diff) < 3) {
        targetX.current = null;
      } else {
        direction.current = diff > 0 ? 1 : -1;
        dogX.current += direction.current * 3;
      }
    }

    // 도트 강아지
    const walkBounce =
      targetX.current !== null ? Math.sin(frame.current * 0.15) * 1.5 : 0;
    const bounce = walkBounce + jumpY.current;
    const legAnim = Math.sin(frame.current * 0.2) * 2;
    const dx = dogX.current;
    const groundY = h * 0.7;

    ctx.save();
    if (direction.current === -1) {
      ctx.translate(dx + 20, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(dx + 20), 0);
    }

    const p = 3; // pixel size

    // 다리 (4개)
    ctx.fillStyle = '#e8c98a';
    const legBounce = jumping.current ? bounce : 0;
    // 뒷다리
    ctx.fillRect(
      dx + p * 2,
      groundY - p * 3 + legAnim + legBounce,
      p * 2,
      p * 4,
    );
    ctx.fillRect(
      dx + p * 3,
      groundY - p * 3 - legAnim + legBounce,
      p * 2,
      p * 4,
    );
    // 앞다리
    ctx.fillRect(
      dx + p * 9,
      groundY - p * 3 - legAnim + legBounce,
      p * 2,
      p * 4,
    );
    ctx.fillRect(
      dx + p * 10,
      groundY - p * 3 + legAnim + legBounce,
      p * 2,
      p * 4,
    );

    // 몸통 (분홍 옷)
    ctx.fillStyle = '#f5a0b0';
    ctx.fillRect(dx + p * 1, groundY - p * 7 + bounce, p * 12, p * 5);
    // 옷 줄무늬
    ctx.fillStyle = '#e8909f';
    ctx.fillRect(dx + p * 1, groundY - p * 5 + bounce, p * 12, p);

    // 꼬리
    ctx.fillStyle = '#e8c98a';
    const tailWag = Math.sin(frame.current * 0.3) * 2;
    ctx.fillRect(dx, groundY - p * 8 + bounce + tailWag, p * 2, p * 3);

    // 머리 (크림색 둥근)
    ctx.fillStyle = '#f0d9a0';
    // 머리 본체
    ctx.fillRect(dx + p * 8, groundY - p * 13 + bounce, p * 8, p * 7);
    // 머리 윗부분 (곱슬)
    ctx.fillRect(dx + p * 9, groundY - p * 14 + bounce, p * 6, p);
    ctx.fillRect(dx + p * 10, groundY - p * 15 + bounce, p * 4, p);
    // 볼
    ctx.fillRect(dx + p * 7, groundY - p * 11 + bounce, p, p * 3);
    ctx.fillRect(dx + p * 16, groundY - p * 11 + bounce, p, p * 3);
    // 곱슬 (어두운 크림)
    ctx.fillStyle = '#dcc48a';
    ctx.fillRect(dx + p * 9, groundY - p * 14 + bounce, p, p);
    ctx.fillRect(dx + p * 14, groundY - p * 14 + bounce, p, p);
    ctx.fillRect(dx + p * 7, groundY - p * 12 + bounce, p, p);
    ctx.fillRect(dx + p * 16, groundY - p * 10 + bounce, p, p);

    // 눈
    ctx.fillStyle = '#222222';
    ctx.fillRect(dx + p * 10, groundY - p * 11 + bounce, p * 1.5, p * 1.5);
    ctx.fillRect(dx + p * 14, groundY - p * 11 + bounce, p * 1.5, p * 1.5);
    // 눈 하이라이트
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(dx + p * 10.5, groundY - p * 11.5 + bounce, p * 0.5, p * 0.5);
    ctx.fillRect(dx + p * 14.5, groundY - p * 11.5 + bounce, p * 0.5, p * 0.5);

    // 코
    ctx.fillStyle = '#333333';
    ctx.fillRect(dx + p * 12, groundY - p * 9 + bounce, p * 2, p * 1.5);

    // 귀
    ctx.fillStyle = '#dbb87a';
    ctx.fillRect(dx + p * 7, groundY - p * 13 + bounce, p * 2, p * 4);
    ctx.fillRect(dx + p * 15, groundY - p * 13 + bounce, p * 2, p * 4);

    ctx.restore();

    frame.current++;
  }, []);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      draw();
      animId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animId);
  }, [draw]);

  // 키보드 조작
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const maxX = canvas.getBoundingClientRect().width - 60;
      if (e.key === 'ArrowRight') {
        direction.current = 1;
        dogX.current = Math.min(maxX, dogX.current + 8);
      } else if (e.key === 'ArrowLeft') {
        direction.current = -1;
        dogX.current = Math.max(0, dogX.current - 8);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // 클릭/터치 → 목표 위치 설정
  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    const x = clientX - rect.left - 25;
    const maxX = rect.width - 60;
    targetX.current = Math.max(0, Math.min(maxX, x));
  };

  return (
    <canvas
      ref={canvasRef}
      className="block h-[120px] w-full max-w-full rounded-lg border-none sm:h-[150px]"
      style={{ touchAction: 'none', cursor: 'pointer' }}
      onClick={handleTap}
      onTouchStart={handleTap}
    />
  );
}

function drawCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.arc(x + r * 0.8, y - r * 0.2, r * 0.7, 0, Math.PI * 2);
  ctx.arc(x - r * 0.6, y - r * 0.1, r * 0.6, 0, Math.PI * 2);
  ctx.arc(x + r * 0.3, y - r * 0.4, r * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dark = false,
) {
  // 기둥
  ctx.fillStyle = dark ? '#5a4a20' : '#8B6914';
  ctx.fillRect(x - 4, y, 8, 20);
  // 잎
  ctx.fillStyle = dark ? '#2a5a2a' : '#6aad6a';
  ctx.beginPath();
  ctx.arc(x, y - 5, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = dark ? '#1a4a1a' : '#5a9d5a';
  ctx.beginPath();
  ctx.arc(x + 8, y - 2, 12, 0, Math.PI * 2);
  ctx.fill();
}
