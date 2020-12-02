import tc from 'tinycolor2';

export function lighten(color: string, amount: number): string {
  return tc(color)
    .lighten(amount)
    .toString();
}

export function fade(color: string, amount: number): string {
  return tc(color)
    .setAlpha(amount / 100)
    .toString();
}

export function darken(color: string, amount: number): string {
  return tc(color)
    .darken(amount)
    .toString();
}
