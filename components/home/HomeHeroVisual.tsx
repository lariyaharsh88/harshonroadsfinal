export function HomeHeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="float relative isolate min-h-[280px] overflow-hidden rounded-[2rem] border border-blue/10 bg-[#0b1220] shadow-[var(--shadow)] sm:min-h-[360px] lg:min-h-full lg:min-w-[28rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.35),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(13,148,136,0.2),transparent_45%)]" />
      <svg
        viewBox="0 0 640 520"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f2744" />
            <stop offset="55%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="hero-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e4976" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="hero-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="hero-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#c27803" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect width="640" height="520" fill="url(#hero-sky)" />
        <circle className="hero-sun origin-[470px_118px]" cx="470" cy="118" r="42" fill="#fbbf24" opacity="0.95" />
        <path d="M0 250 L90 170 L150 210 L230 120 L310 190 L390 90 L480 180 L560 130 L640 200 V320 H0 Z" fill="url(#hero-far)" opacity="0.85" />
        <path d="M0 310 L80 250 L160 290 L250 220 L340 280 L430 210 L520 270 L640 230 V400 H0 Z" fill="url(#hero-mid)" opacity="0.9" />
        <path d="M410 268 L430 230 L448 250 L470 210 L498 255 L520 238 L548 268 V310 H410 Z" fill="#1e293b" />
        <path d="M0 330 H640 V520 H0 Z" fill="#0f172a" />
        <path d="M120 520 C180 430 250 390 320 360 C400 325 470 330 640 280" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="20" strokeLinecap="round" />
        <path className="hero-road-dash" d="M120 520 C180 430 250 390 320 360 C400 325 470 330 640 280" fill="none" stroke="url(#hero-glow)" strokeWidth="4" strokeDasharray="14 16" />
        <g fill="#e2e8f0">
          <circle cx="168" cy="428" r="7" />
          <path d="M166 436 h4 v18 h-4 z" />
          <circle cx="214" cy="412" r="7" />
          <circle cx="228" cy="412" r="7" />
          <path d="M212 420 h6 v16 h-6 z M226 420 h6 v16 h-6 z" />
          <rect x="350" y="368" width="52" height="22" rx="6" fill="#ffffff" opacity="0.92" />
          <circle cx="362" cy="398" r="8" fill="#0b1220" />
          <circle cx="390" cy="398" r="8" fill="#0b1220" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4 sm:p-5">
        {["Mountains", "Roads", "Nature", "Cities", "People"].map((label) => (
          <span
            key={label}
            className="tag-float rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
