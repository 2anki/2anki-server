import { useState } from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  width: 60vw;
  max-width: 640px;
`;
const SearchContainer = styled.div`
  position: sticky;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

// TODO: handle the enter key is pressed
const SearchBar = ({ onSearchQueryChanged, onSearchClicked, inProgress }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <SearchContainer>
      <div className="field has-addons">
        <div className="control">
          <SearchInput
            className="input"
            type="text"
            placeholder="  🔍 🅰  📑 "
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearchClicked();
            }}
            onChange={(event) => {
              setEnabled(event.target.value.length > 3);
              onSearchQueryChanged(event.target.value);
            }}
          />
        </div>
        <div className="control" onClick={onSearchClicked}>
          <button
            className={`button ${
              inProgress ? "is-loading is-light" : "is-info"
            }`}
            disabled={!enabled}
          >
            Search
          </button>
        </div>
      </div>
    </SearchContainer>
  );
};

export default SearchBar;
