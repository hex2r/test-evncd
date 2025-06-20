export default function pxToRem(px: number): string {
  const baseFontSize =
    parseFloat(getComputedStyle(document.querySelector("html")!).fontSize) || 16
  return `${px / baseFontSize}rem`
}
