import { Route, Switch, useHistory } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { EmptyContainer } from './styled';
import SearchBar from './SearchBar';
import SearchObjectEntry from './SearchObjectEntry';
import NotionObject from '../../../lib/interfaces/NotionObject';

interface SearchPresenterProps {
  inProgress: boolean;
  myPages: NotionObject[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
  triggerSearch: (force: boolean) => void;
  errorNotification: Error | null;
  setError: (error: string) => void;
}

export default function SearchPresenter(
  props: SearchPresenterProps,
) {
  const history = useHistory();
  const {
    inProgress,
    myPages,
    setSearchQuery,
    triggerSearch,
    setError,
    errorNotification,
  } = props;
  return (
    <>
      <SearchBar
        inProgress={inProgress}
        onSearchQueryChanged={(s) => {
          history.push({
            pathname: '/search',
            search: `?q=${s}`,
          });
          setSearchQuery(s);
        }}
        onSearchClicked={() => triggerSearch(false)}
      />
      <div className="column is-main-content">
        <Switch>
          <Route path="/search">
            {(!myPages || myPages.length < 1) && (
              <EmptyContainer>
                {errorNotification && (
                <div className="my-4 notification is-danger">
                  <p>{errorNotification.message}</p>
                </div>
                )}
                {!errorNotification && (
                <div className="subtitle is-3 my-4">
                  No search results, try typing something above 👌🏾
                </div>
                )}
              </EmptyContainer>
            )}
            {myPages
          && myPages.length > 0
          && myPages.map((p) => (
            <SearchObjectEntry
              type={p.object}
              key={p.url}
              title={p.title}
              icon={p.icon}
              url={p.url}
              id={p.id}
              setError={setError}
            />
          ))}
          </Route>
        </Switch>
      </div>
    </>
  );
}
