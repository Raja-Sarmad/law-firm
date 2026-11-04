export function money(value: number) {
  return `$${value}`;
}

export function savedAmount(price: number, compareAt: number) {
  return compareAt - price;
}

export function offPercent(price: number, compareAt: number) {
  return Math.max(1, Math.floor(((compareAt - price) / compareAt) * 100));
}

export function compactCount(value: number) {
  if (value >= 1000) {
    const scaled = value / 1000;
    const digits = scaled >= 10 || Number.isInteger(scaled) ? 0 : 1;
    return `${scaled.toFixed(digits)}K`;
  }
  return String(value);
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}
