import {
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import renderTextChildren from './renderTextChildren';
import { styleWithColors } from '../NotionColors';
import BlockHandler from '../BlockHandler/BlockHandler';
import getChildren from './getChildren';
import { getListBlock } from './getListBlock';
import { getListColor } from './getListColor';
import { getRichTextFromBlock } from './getRichTextFromBlock';

type ListType = 'numbered_list_item' | 'bulleted_list_item' | 'to_do';

export default function getListItems(
  response: ListBlockChildrenResponse | undefined,
  handler: BlockHandler,
  type: ListType
) {
  if (!response) {
    return [];
  }
  return Promise.all(
    response.results.map(async (result) => {
      const list = getListBlock(result);
      if (!list) {
        return null;
      }
      const backSide = await getChildren(list, handler);
      handler.skip.push(result.id);
      const todo =
        type === 'to_do' ? (list as ToDoBlockObjectResponse).to_do : null;
      const checked = todo?.checked
        ? 'to-do-children-checked'
        : 'to-do-children-unchecked';
      const checkedClass = todo ? checked : '';

      return (
        <li id={result.id} className={`${styleWithColors(getListColor(list))}`}>
          {todo && (
            <div
              className={`checkbox checkbox-${checked ? 'on' : 'off'}`}
            ></div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: renderTextChildren(
                getRichTextFromBlock(list),
                handler.settings
              ),
            }}
          />
          {backSide && (
            <div
              className={`${checkedClass}`}
              dangerouslySetInnerHTML={{ __html: backSide }}
            ></div>
          )}
        </li>
      );
    })
  );
}
