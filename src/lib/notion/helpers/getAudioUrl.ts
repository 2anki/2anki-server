import { AudioBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { isFullBlock } from '@notionhq/client';

export const getAudioUrl = (block: AudioBlockObjectResponse): string | null => {
  if (!isFullBlock(block)) {
    return null;
  }
  switch (block.audio.type) {
    case 'external':
      return block.audio.external.url;
    case 'file':
      return block.audio.file.url;
    default:
      return 'unsupported audio: ' + JSON.stringify(block);
  }
};
