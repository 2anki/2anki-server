export type WithIcon = {
  icon:
    | { emoji: string; type?: 'emoji' }
    | { external: { url: string }; type?: 'external' }
    | { file: { url: string }; type?: 'file' }
    | null;
};

export const DISABLE_EMOJI = 'disable_emoji';
export default function getBlockIcon(p?: WithIcon, emoji?: string): string {
  switch (p?.icon?.type) {
    case 'emoji':
      if (emoji === DISABLE_EMOJI) {
        return '';
      }
      return p.icon.emoji;
    case 'external':
      return p.icon.external.url;
    case 'file':
      return p.icon.file.url;
    default:
      return '';
  }
}
