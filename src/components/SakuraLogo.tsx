interface SakuraLogoProps {
  className?: string;
}

export function SakuraLogo({ className = "w-10 h-10" }: SakuraLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

      
      className={className}
    >
      {/* Tree trunk */}
      <path
        d="M45 95 L45 65 Q46 50 50 45 Q54 50 55 65 L55 95 Z"
        fill="#8B4513"
        stroke="#5C2D12"
        strokeWidth="0.5"
      />
      
      {/* Main branches */}
      <path
        d="M50 45 Q40 40 30 35"
        stroke="#8B4513"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 45 Q60 40 70 35"
        stroke="#8B4513"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 50 Q38 48 28 45"
        stroke="#efd1bb"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M50 50 Q62 48 72 45"
        stroke="#dccec3"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Sakura blossoms - left side */}
      <g transform="translate(30, 35)">
        <circle cx="0" cy="0" r="4" fill="#FFB7C5" />
        <circle cx="-3" cy="-2" r="3" fill="#FFD1DC" />
        <circle cx="3" cy="-2" r="3" fill="#FFD1DC" />
        <circle cx="-2" cy="2" r="3" fill="#FFD1DC" />
        <circle cx="2" cy="2" r="3" fill="#FFD1DC" />
        <circle cx="0" cy="0" r="1.5" fill="#FF69B4" />
      </g>
      
      {/* Sakura blossoms - right side */}
      <g transform="translate(70, 35)">
        <circle cx="0" cy="0" r="4" fill="#FFB7C5" />
        <circle cx="-3" cy="-2" r="3" fill="#FFD1DC" />
        <circle cx="3" cy="-2" r="3" fill="#FFD1DC" />
        <circle cx="-2" cy="2" r="3" fill="#FFD1DC" />
        <circle cx="2" cy="2" r="3" fill="#FFD1DC" />
        <circle cx="0" cy="0" r="1.5" fill="#FF69B4" />
      </g>
      
      {/* Sakura blossoms - middle left */}
      <g transform="translate(28, 45)">
        <circle cx="0" cy="0" r="3.5" fill="#FFB7C5" />
        <circle cx="-2.5" cy="-1.5" r="2.5" fill="#FFD1DC" />
        <circle cx="2.5" cy="-1.5" r="2.5" fill="#FFD1DC" />
        <circle cx="-1.5" cy="1.8" r="2.5" fill="#FFD1DC" />
        <circle cx="1.5" cy="1.8" r="2.5" fill="#FFD1DC" />
        <circle cx="0" cy="0" r="1" fill="#FF69B4" />
      </g>
      
      {/* Sakura blossoms - middle right */}
      <g transform="translate(72, 45)">
        <circle cx="0" cy="0" r="3.5" fill="#FFB7C5" />
        <circle cx="-2.5" cy="-1.5" r="2.5" fill="#FFD1DC" />
        <circle cx="2.5" cy="-1.5" r="2.5" fill="#FFD1DC" />
        <circle cx="-1.5" cy="1.8" r="2.5" fill="#FFD1DC" />
        <circle cx="1.5" cy="1.8" r="2.5" fill="#FFD1DC" />
        <circle cx="0" cy="0" r="1" fill="#FF69B4" />
      </g>
      
      {/* Top blossom */}
      <g transform="translate(50, 30)">
        <circle cx="0" cy="0" r="5" fill="#FFB7C5" />
        <circle cx="-3.5" cy="-2.5" r="3.5" fill="#FFD1DC" />
        <circle cx="3.5" cy="-2.5" r="3.5" fill="#FFD1DC" />
        <circle cx="-2.5" cy="2.5" r="3.5" fill="#FFD1DC" />
        <circle cx="2.5" cy="2.5" r="3.5" fill="#FFD1DC" />
        <circle cx="0" cy="0" r="2" fill="#FF69B4" />
      </g>
      
      {/* Small accent blossoms */}
      <g transform="translate(40, 38)">
        <circle cx="0" cy="0" r="2.5" fill="#FFB7C5" />
        <circle cx="-1.5" cy="-1" r="1.8" fill="#FFD1DC" />
        <circle cx="1.5" cy="-1" r="1.8" fill="#FFD1DC" />
        <circle cx="0" cy="1.5" r="1.8" fill="#FFD1DC" />
      </g>
      
      <g transform="translate(60, 38)">
        <circle cx="0" cy="0" r="2.5" fill="#FFB7C5" />
        <circle cx="-1.5" cy="-1" r="1.8" fill="#FFD1DC" />
        <circle cx="1.5" cy="-1" r="1.8" fill="#FFD1DC" />
        <circle cx="0" cy="1.5" r="1.8" fill="#FFD1DC" />
      </g>
    </svg>
  );
}
