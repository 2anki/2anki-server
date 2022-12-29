import { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { renderToStaticMarkup } from 'react-dom/server';
import BlockHandler from '../../BlockHandler/BlockHandler';
import { getVideoUrl } from './helpers/getVideoUrl';
import { isVimeoLink } from './helpers/isVimeoLink';

export const BlockVideo = (
  c: VideoBlockObjectResponse,
  handler: BlockHandler
) => {
  let url = getVideoUrl(c);
  if (handler.settings?.isTextOnlyBack || !url) {
    return null;
  }
  if (isVimeoLink(url)) {
    return url;
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
