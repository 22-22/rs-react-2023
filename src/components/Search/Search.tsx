import { ChangeEvent, FC } from 'react';
import './Search.css';

interface SearchProps {
  searchValue: string;
  handleSearchInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const Search: FC<SearchProps> = ({
  searchValue,
  handleSearchInputChange,
  handleSearch,
}) => {
  return (
    <section className="search-section">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChange}
      />
      <button className="search-btn" type="button" onClick={handleSearch}>
        Search
      </button>
    </section>
  );
};

export default Search;
