export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">

      {/* ── 메시 그라디언트 레이어 ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 15% 15%, rgba(255,255,255,0.055) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 85% 85%, rgba(200,200,200,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 45% 55% at 50% 105%, rgba(180,180,180,0.03) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── 미세 격자 패턴 ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── 오브 1: 좌상단 대형 ── */}
      <div
        className="absolute -top-52 -left-52 w-[520px] h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.075) 0%, rgba(200,200,200,0.02) 45%, transparent 70%)',
          animation: 'orb-float 12s ease-in-out infinite',
        }}
      />

      {/* ── 오브 2: 우상단 중형 ── */}
      <div
        className="absolute -top-24 -right-36 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(220,220,220,0.045) 0%, transparent 70%)',
          animation: 'orb-float-slow 19s ease-in-out infinite reverse',
          animationDelay: '-5s',
        }}
      />

      {/* ── 오브 3: 중앙 좌측 ── */}
      <div
        className="absolute top-[45%] -left-28 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(200,200,200,0.04) 0%, transparent 70%)',
          animation: 'orb-float 15s ease-in-out infinite',
          animationDelay: '-7s',
        }}
      />

      {/* ── 오브 4: 하단 중앙 넓은 타원 ── */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[720px] h-60 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
          animation: 'orb-float-slow 22s ease-in-out infinite',
          animationDelay: '-9s',
        }}
      />

      {/* ── 오브 5: 우하단 소형 ── */}
      <div
        className="absolute bottom-28 right-14 w-52 h-52 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(180,180,180,0.05) 0%, transparent 70%)',
          animation: 'orb-float 10s ease-in-out infinite',
          animationDelay: '-3s',
        }}
      />

      {/* ── Vignette 가장자리 어둡게 ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 110% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}
