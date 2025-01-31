export function withFontSize(style: string | null, fontSize?: string) {
  if (style && fontSize && fontSize !== '20px') {
    // For backwards compatability, don't touch the font-size if it's 20px
    fontSize = fontSize.trim().endsWith('px') ? fontSize : `${fontSize}px`;
    style += '\n' + `* { font-size:${fontSize}}`;
  }
  return style;
}
