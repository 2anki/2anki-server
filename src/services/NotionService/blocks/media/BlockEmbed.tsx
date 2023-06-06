import { EmbedBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { renderToStaticMarkup } from 'react-dom/server';
import getYouTubeEmbedLink from '../../../../lib/parser/helpers/getYouTubeEmbedLink';
import getYouTubeID from '../../../../lib/parser/helpers/getYouTubeID';
import BlockHandler from '../../BlockHandler/BlockHandler';
import { isSoundCloudURL, isTwitterURL } from '../../../../lib/storage/checks';

export const BlockEmbed = (
  c: EmbedBlockObjectResponse,
  handler: BlockHandler
) => {
  if (handler.settings?.isTextOnlyBack) {
    return '';
  }
  const { embed } = c;
  let { url } = embed;
  if (url) {
    if (isSoundCloudURL(url)) {
      url = `https://w.soundcloud.com/player/?url=${url}`;
    } else if (isTwitterURL(url)) {
      return renderToStaticMarkup(
        <div className="source">
          <a href={url}>{url}</a>
        </div>
      );
    }

    const yt = getYouTubeID(url);
    if (yt) {
      url = getYouTubeEmbedLink(yt);
    }
  }
  return renderToStaticMarkup(
    <>
      <iframe
        width="560"
        height="315"
        src={url}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </>
  );
};
