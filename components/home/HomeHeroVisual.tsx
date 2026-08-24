export function HomeHeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative isolate min-h-[280px] overflow-hidden rounded-[2rem] border border-border bg-[#e8eef2] shadow-[var(--shadow)] sm:min-h-[360px] lg:min-h-full lg:min-w-[28rem]"
    >
      <svg
        viewBox="0 0 640 520"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dce8f0" />
            <stop offset="55%" stopColor="#f0e6d4" />
            <stop offset="100%" stopColor="#d8e8dc" />
          </linearGradient>
          <linearGradient id="hero-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9eb8a8" />
            <stop offset="100%" stopColor="#6d8f82" />
          </linearGradient>
          <linearGradient id="hero-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a9e8a" />
            <stop offset="100%" stopColor="#4f7260" />
          </linearGradient>
        </defs>
        <rect width="640" height="520" fill="url(#hero-sky)" />
        <circle cx="470" cy="118" r="42" fill="#f5d9a8" opacity="0.95" />
        <path
          d="M0 250 L90 170 L150 210 L230 120 L310 190 L390 90 L480 180 L560 130 L640 200 V320 H0 Z"
          fill="url(#hero-far)"
          opacity="0.85"
        />
        <path
          d="M0 310 L80 250 L160 290 L250 220 L340 280 L430 210 L520 270 L640 230 V400 H0 Z"
          fill="url(#hero-mid)"
          opacity="0.9"
        />
        <path d="M410 268 L430 230 L448 250 L470 210 L498 255 L520 238 L548 268 V310 H410 Z" fill="#5a6a72" />
        <path d="M0 330 H640 V520 H0 Z" fill="#e8dfd4" />
        <path
          d="M120 520 C180 430 250 390 320 360 C400 325 470 330 640 280"
          fill="none"
          stroke="#ffffff"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M120 520 C180 430 250 390 320 360 C400 325 470 330 640 280"
          fill="none"
          stroke="#b6f04a"
          strokeWidth="4"
          strokeDasharray="14 16"
        />
        <g fill="#111318">
          <circle cx="168" cy="428" r="7" />
          <path d="M166 436 h4 v18 h-4 z" />
          <circle cx="214" cy="412" r="7" />
          <circle cx="228" cy="412" r="7" />
          <path d="M212 420 h6 v16 h-6 z M226 420 h6 v16 h-6 z" />
          <rect x="350" y="368" width="52" height="22" rx="6" fill="#ffffff" opacity="0.92" />
          <circle cx="362" cy="398" r="8" fill="#111318" />
          <circle cx="390" cy="398" r="8" fill="#111318" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4 sm:p-5">
        {["Mountains", "Roads", "Nature", "Cities", "People"].map((label) => (
          <span
            key={label}
            className="rounded-full border border-border bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground shadow-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
