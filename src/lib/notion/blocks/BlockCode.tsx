import {
  CodeBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import ReactDOMServer from 'react-dom/server';
import BlockHandler from '../BlockHandler';
import getPlainText from '../helpers/getPlainText';
import HandleBlockAnnotations from './HandleBlockAnnotations';

const BlockCode = (block: CodeBlockObjectResponse, handler: BlockHandler) => {
  const { code } = block;
  const { rich_text: richText } = code;

  if (handler.settings?.isTextOnlyBack) {
    return getPlainText(richText);
  }

  return ReactDOMServer.renderToStaticMarkup(
    <pre id={block.id} className={`code}`}>
      <code>
        {richText.map((t: RichTextItemResponse) => {
          const { annotations } = t;
          return HandleBlockAnnotations(annotations, t);
        })}
      </code>
    </pre>
  );
};

export default BlockCode;
