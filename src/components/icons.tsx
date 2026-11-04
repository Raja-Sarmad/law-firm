import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { draw?: boolean };

function Svg({ draw, className, children, ...props }: IconProps & { children: ReactNode }) {
  void draw;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function stroke(draw?: boolean) {
  return draw ? "draw-stroke" : undefined;
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" />
    </Svg>
  );
}

export function ChevronIcon({ className = "h-4 w-4", direction = "down" }: IconProps & { direction?: "down" | "left" | "right" }) {
  const d =
    direction === "left" ? "M14 6l-6 6 6 6" : direction === "right" ? "M10 6l6 6-6 6" : "M6 9l6 6 6-6";
  return (
    <Svg className={className}>
      <path d={d} />
    </Svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function StarIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#c6a35a"
        d="M12 3.2l2.4 5.1 5.6.7-4.1 3.8 1.1 5.5L12 15.8 7 18.3l1.1-5.5L4 9l5.6-.7L12 3.2z"
      />
    </svg>
  );
}

export function CapIcon({ className = "h-7 w-7", draw }: IconProps) {
  return (
    <Svg className={className}>
      <path className={stroke(draw)} d="M3 10l9-5 9 5-9 5-9-5z" />
      <path className={stroke(draw)} d="M7 12v4.5c0 1.4 2.2 3 5 3s5-1.6 5-3V12" />
      <path className={stroke(draw)} d="M21 10v6" />
    </Svg>
  );
}

export function MedalIcon({ className = "h-7 w-7", draw }: IconProps) {
  return (
    <Svg className={className}>
      <circle className={stroke(draw)} cx="12" cy="9" r="5" />
      <path className={stroke(draw)} d="M9 13.5L7.2 21 12 18.2 16.8 21 15 13.5" />
    </Svg>
  );
}

export function LaptopIcon({ className = "h-7 w-7", draw }: IconProps) {
  return (
    <Svg className={className}>
      <rect className={stroke(draw)} x="4" y="5" width="16" height="10" rx="1.5" />
      <path className={stroke(draw)} d="M2 19h20" />
    </Svg>
  );
}

export function CaseIcon({ className = "h-7 w-7", draw }: IconProps) {
  return (
    <Svg className={className}>
      <rect className={stroke(draw)} x="3" y="7" width="18" height="12" rx="2" />
      <path className={stroke(draw)} d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
    </Svg>
  );
}

export function ClockIcon({ className = "h-4 w-4", draw }: IconProps) {
  return (
    <Svg className={className}>
      <circle className={stroke(draw)} cx="12" cy="12" r="8" />
      <path className={stroke(draw)} d="M12 8v5l3 2" />
    </Svg>
  );
}

export function BookIcon({ className = "h-4 w-4", draw }: IconProps) {
  return (
    <Svg className={className}>
      <path className={stroke(draw)} d="M4 5.5h6.5A2.5 2.5 0 0 1 13 8v11a2.5 2.5 0 0 0-2.5-2.5H4z" />
      <path className={stroke(draw)} d="M20 5.5h-6.5A2.5 2.5 0 0 0 11 8v11a2.5 2.5 0 0 1 2.5-2.5H20z" />
    </Svg>
  );
}

export function UsersIcon({ className = "h-7 w-7", draw }: IconProps) {
  return (
    <Svg className={className}>
      <circle className={stroke(draw)} cx="9" cy="8" r="3" />
      <circle className={stroke(draw)} cx="16.5" cy="9" r="2.2" />
      <path className={stroke(draw)} d="M3.5 19c.8-2.6 3-4 5.5-4s4.7 1.4 5.5 4" />
      <path className={stroke(draw)} d="M14 15.2c1.4-.4 2.8-.3 4 .4 1 1.2 1.5 2.6 1.7 4.4" />
    </Svg>
  );
}

export function HeartIcon({ className = "h-7 w-7", draw }: IconProps) {
  return (
    <Svg className={className}>
      <path
        className={stroke(draw)}
        d="M12 19s-7-4.2-7-8.2A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7 2.8C19 14.8 12 19 12 19z"
      />
    </Svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </Svg>
  );
}

export function PlayIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M9 7.2v9.6L18 12 9 7.2z" />
    </svg>
  );
}

export function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="5" y="10" width="14" height="9" rx="2" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" />
    </Svg>
  );
}

export function FilterIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </Svg>
  );
}

export function CardIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19" />
    </Svg>
  );
}

export function BankIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 10h16M6 10v7M10 10v7M14 10v7M18 10v7M3 18h18M12 4l9 6H3l9-6z" />
    </Svg>
  );
}

export function PayPalIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 19l1.2-8h3.2c2.6 0 4.2-1.3 4.2-3.6S13.8 4 11.2 4H6.2L4 19" />
      <path d="M9.2 19l1-6h2.8c2 0 3.2-1 3.2-2.6" />
    </Svg>
  );
}

export function LevelIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 17V11M12 17V7M19 17v-4" />
    </Svg>
  );
}

export function AwardIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="9" r="5" />
      <path d="M9.2 13.4L8 20l4-2 4 2-1.2-6.6" />
    </Svg>
  );
}
