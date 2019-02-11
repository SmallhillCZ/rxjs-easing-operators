export const easingFunctions = {

  linear: (pct: number) => pct,
  easeOut: (pct: number) => 1 - Math.pow(pct - 1, 2),
  easeIn: (pct: number) => Math.pow(pct, 2),
  easeInOut: (pct: number) => (Math.sin(pct * Math.PI - Math.PI / 2) + 1) / 2

}