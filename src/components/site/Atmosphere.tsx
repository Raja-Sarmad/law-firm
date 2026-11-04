const motes = [
  ["14%", "7%", "3px", "15s", "0s"],
  ["62%", "12%", "2px", "18s", "3s"],
  ["28%", "22%", "4px", "13s", "1.4s"],
  ["78%", "18%", "2px", "20s", "6s"],
  ["8%", "48%", "3px", "16s", "2s"],
  ["88%", "54%", "2px", "19s", "4.5s"],
  ["36%", "70%", "3px", "14s", "7s"],
  ["70%", "76%", "2px", "17s", "1s"],
  ["18%", "84%", "4px", "21s", "5s"],
  ["52%", "38%", "2px", "15s", "8s"],
  ["92%", "32%", "3px", "18s", "2.6s"],
  ["44%", "90%", "2px", "16s", "3.8s"],
] as const;

function Column({ x }: { x: number }) {
  const width = 48;
  return (
    <g fill="none" stroke="#8d6a32" strokeWidth="1.35">
      <path d={`M${x} 48h${width} M${x - 6} 62h${width + 12} M${x + 2} 76h${width - 4}`} />
      <path d={`M${x + 4} 40c6-16 14-22 20-22s14 6 20 22`} />
      <path d={`M${x + 7} 86v760 M${x + width - 7} 86v760`} />
      <path d={`M${x + 16} 86v760 M${x + 24} 86v760 M${x + 32} 86v760`} opacity="0.6" />
      <path d={`M${x - 2} 846h${width + 4} M${x - 8} 862h${width + 16} M${x - 12} 878h${width + 24}`} />
    </g>
  );
}

function Colonnade() {
  return (
    <svg viewBox="0 0 180 940" className="h-full w-full" aria-hidden="true">
      <Column x={18} />
      <Column x={108} />
    </svg>
  );
}

export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-theme" />
      <div className="atmosphere-vignette" />
      <div className="atmosphere-scales-wrap">
        <svg data-scales viewBox="0 0 200 250" className="h-full w-full">
          <g fill="none" stroke="#8d6a32" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="100" cy="28" r="7" />
            <path d="M100 35v150" />
            <path d="M38 78h124" />
            <path d="M38 78c18 28 28 36 28 52 M162 78c-18 28-28 36-28 52" />
            <path d="M48 132h36c0 16-8 26-18 26s-18-10-18-26z M116 132h36c0 16-8 26-18 26s-18-10-18-26z" />
            <path d="M72 196h56 M84 210h32" />
          </g>
        </svg>
      </div>
      <div data-colonnade="left" className="colonnade colonnade-left">
        <Colonnade />
      </div>
      <div data-colonnade="right" className="colonnade colonnade-right">
        <div className="h-full w-full -scale-x-100">
          <Colonnade />
        </div>
      </div>
      <div data-spotlight className="atmosphere-spot" />
      <div data-glow className="atmosphere-glow" />
      <div className="atmosphere-grain" />
      <span data-orb className="orb orb-a" />
      <span data-orb className="orb orb-b" />
      <span data-orb className="orb orb-c" />
      {motes.map(([top, left, size, duration, delay]) => (
        <span
          key={`${top}-${left}`}
          className="mote"
          style={{ top, left, width: size, height: size, animationDuration: duration, animationDelay: delay }}
        />
      ))}
    </div>
  );
}
