export function AvailableForWorkCard() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 900 900"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background glow */}
        <rect width="900" height="900" fill="url(#bgGlow)" />

        <g clipPath="url(#clip0)">
          {/* Soft shape glows underneath */}
          <g
            filter="url(#softGlow)"
            opacity="0.55"
            style={{ mixBlendMode: "lighten" }}
          >
            <circle
              cx="616.768"
              cy="543.294"
              r="135.984"
              transform="rotate(75 616.768 543.294)"
              fill="url(#gradientGreen)"
            />
            <circle
              cx="541.933"
              cy="245.457"
              r="139.446"
              transform="rotate(75 541.933 245.457)"
              fill="url(#gradientBlue)"
            />
            <rect
              x="332.673"
              y="198.409"
              width="265.586"
              height="265.586"
              rx="25"
              transform="rotate(60 332.673 198.409)"
              fill="url(#gradientGreen)"
            />
            <rect
              x="409.996"
              y="494.252"
              width="264.466"
              height="265.586"
              rx="25"
              transform="rotate(60 409.996 494.252)"
              fill="url(#gradientBlue)"
            />
          </g>

          {/* Main shapes */}
          <circle
            cx="616.768"
            cy="543.294"
            r="135.984"
            transform="rotate(75 616.768 543.294)"
            fill="url(#gradientGreen)"
          />
          <circle
            cx="541.933"
            cy="245.457"
            r="139.446"
            transform="rotate(75 541.933 245.457)"
            fill="url(#gradientBlue)"
          />
          <rect
            x="332.673"
            y="198.409"
            width="265.586"
            height="265.586"
            rx="25"
            transform="rotate(60 332.673 198.409)"
            fill="url(#gradientGreen)"
          />
          <rect
            x="409.996"
            y="494.252"
            width="264.466"
            height="265.586"
            rx="25"
            transform="rotate(60 409.996 494.252)"
            fill="url(#gradientBlue)"
          />
        </g>

        <defs>
          {/* Background radial gradient glow */}
          <radialGradient id="bgGlow" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>

          {/* Soft blur for glows */}
          <filter
            id="softGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="60" />
          </filter>

          {/* Shape gradients */}
          <linearGradient
            id="gradientGreen"
            x1="481.518"
            y1="407.31"
            x2="752.017"
            y2="679.279"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4BF3BE" />
            <stop offset="1" stopColor="#12AF7B" />
          </linearGradient>
          <linearGradient
            id="gradientBlue"
            x1="403.24"
            y1="106.011"
            x2="680.626"
            y2="384.903"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7EB9FF" />
            <stop offset="1" stopColor="#3D8BFF" />
          </linearGradient>

          <clipPath id="clip0">
            <rect width="900" height="900" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
