"use client";

// Simple placeholder SVG card – removes complex shapes & animations
export function AvailableForWorkCard() {
  return (
    <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full block"
        role="img"
        aria-label="Placeholder graphic"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a1842" />
            <stop offset="100%" stopColor="#211437" />
          </linearGradient>
          <pattern
            id="grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0v24"
              fill="none"
              stroke="#ffffff10"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* background gradient + subtle grid */}
        <rect x="0" y="0" width="400" height="400" fill="url(#bg)" rx="28" />
        <rect x="0" y="0" width="400" height="400" fill="url(#grid)" rx="28" />

        {/* placeholder icon (circle + bars) */}
        <g transform="translate(120,120)" opacity="0.8">
          <circle cx="80" cy="80" r="56" fill="#7c3aed" fillOpacity="0.2" />
          <rect
            x="32"
            y="76"
            width="96"
            height="12"
            rx="6"
            fill="#ffffff"
            fillOpacity="0.18"
          />
          <rect
            x="48"
            y="98"
            width="64"
            height="12"
            rx="6"
            fill="#ffffff"
            fillOpacity="0.12"
          />
        </g>

        {/* label */}
        <g transform="translate(120,180)">
          <rect
            x="-12"
            y="-20"
            width="184"
            height="40"
            rx="20"
            fill="#0b0b0c"
            fillOpacity="0.9"
          />
          <circle cx="8" cy="0" r="4" fill="#10b981" />
          <text
            x="20"
            y="6"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
            fontSize="14"
            fill="#ffffff"
          >
            Available for Work
          </text>
        </g>
      </svg>
    </div>
  );
}
