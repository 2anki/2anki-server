import { SearchInput } from './styled';

interface SearchBarProps {
  onSearchQueryChanged: (query: string) => void;
  onSearchClicked: () => void;
  inProgress: boolean;
}

function SearchBar({ onSearchQueryChanged, onSearchClicked, inProgress }: SearchBarProps) {
  return (
    <div className="my-2">
      <div className="field has-addons">
        <div className="control">
          <SearchInput
            className="input"
            type="text"
            placeholder="  🔍 🅰  📑 "
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearchClicked();
              }
            }}
            onChange={(event) => {
              onSearchQueryChanged(event.target.value);
            }}
          />
        </div>
        <div className="control">
          <button
            type="button"
            onClick={onSearchClicked}
            className={`button ${
              inProgress ? 'is-loading is-light' : 'is-info'
            }`}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
