import {
  CalloutBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import ReactDOMServer from 'react-dom/server';
import BlockHandler from '../BlockHandler';
import getPlainText from '../helpers/getPlainText';
import { styleWithColors } from '../NotionColors';
import HandleBlockAnnotations from './HandleBlockAnnotations';

export const BlockCallout = (
  block: CalloutBlockObjectResponse,
  handler: BlockHandler
) => {
  const { callout } = block;
  const { icon } = callout;
  const { rich_text: richText } = callout;

  if (handler.settings?.isTextOnlyBack) {
    return getPlainText(richText);
  }

  return ReactDOMServer.renderToStaticMarkup(
    <figure
      id={block.id}
      className={`callout${styleWithColors(callout.color)}`}
      style={{ whiteSpace: 'pre-wrap', display: 'flex' }}
    >
      <div>
        {icon && icon.type === 'emoji' && (
          <span className="icon">{icon.emoji}</span>
        )}
      </div>
      <div style={{ width: '100%' }}>
        {richText.map((t: RichTextItemResponse) => {
          const { annotations } = t;
          return HandleBlockAnnotations(annotations, t);
        })}
      </div>
    </figure>
  );
};
