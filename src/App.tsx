import { ChangeEvent, useState } from 'react';
import { localStorageSearchKey } from './constants';
import { getSearchItems } from './requests';
import { Person } from './types';
import Search from './components/Search/Search';
import Display from './components/Display/Display';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorTestButton from './components/ErrorTestButton';
import './App.css';
import { trimValue } from './utils';

const primaryValue = localStorage.getItem(localStorageSearchKey);

const App = () => {
  const [searchValue, setSearchValue] = useState(primaryValue || '');
  const [queryData, setQueryData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const handleSearch = async () => {
    const trimmedValue = trimValue(searchValue);
    localStorage.setItem(localStorageSearchKey, trimmedValue);
    setLoading(true);
    const result = await getSearchItems(trimmedValue);
    setQueryData(result);
    setLoading(false);
  };
  return (
    <div className="app">
      <ErrorBoundary>
        <Search
          searchValue={searchValue}
          handleSearchInputChange={handleSearchInputChange}
          handleSearch={handleSearch}
        />
        {loading ? 'Loading...' : <Display data={queryData} />}
        <ErrorTestButton />
      </ErrorBoundary>
    </div>
  );
};

export default App;
