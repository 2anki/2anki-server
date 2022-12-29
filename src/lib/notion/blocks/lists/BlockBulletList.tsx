import {
  BulletedListItemBlockObjectResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import ReactDOMServer from 'react-dom/server';
import { convert } from 'html-to-text';
import BlockHandler from '../../BlockHandler/BlockHandler';
import { styleWithColors } from '../../NotionColors';
import getListItems from '../../helpers/getListItems';

export const BlockBulletList = async (
  block: BulletedListItemBlockObjectResponse,
  response: ListBlockChildrenResponse | undefined,
  handler: BlockHandler
) => {
  const list = block.bulleted_list_item;
  const items = await getListItems(response, handler, 'bulleted_list_item');
  const listItems = items.filter(Boolean);
  const markup = ReactDOMServer.renderToStaticMarkup(
    <ul id={block.id} className={`bulleted-list${styleWithColors(list.color)}`}>
      {listItems}
    </ul>
  );
  if (handler.settings?.isTextOnlyBack) {
    return convert(markup);
  }
  return markup;
};
