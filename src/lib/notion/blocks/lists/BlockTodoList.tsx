import {
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import ReactDOMServer from 'react-dom/server';
import { convert } from 'html-to-text';
import BlockHandler from '../../BlockHandler/BlockHandler';
import { styleWithColors } from '../../NotionColors';
import getListItems from '../../helpers/getListItems';

export const BlockTodoList = async (
  block: ToDoBlockObjectResponse,
  response: ListBlockChildrenResponse | undefined,
  handler: BlockHandler
) => {
  const list = block.to_do;
  const items = await getListItems(response, handler, 'to_do');
  const listItems = items.filter(Boolean);
  const markup = ReactDOMServer.renderToStaticMarkup(
    <ul id={block.id} className={`to-do-list${styleWithColors(list.color)}`}>
      {listItems}
    </ul>
  );
  if (handler.settings?.isTextOnlyBack) {
    return convert(markup);
  }
  return markup;
};
