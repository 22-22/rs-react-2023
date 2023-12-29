import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { loadingMessage, localStorageSearchKey } from './constants';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const trimmedValue = trimValue(evt.target.value);
      setSearchValue(trimmedValue);
    },
    []
  );

  const handleRequest = useCallback(async () => {
    setLoading(true);
    const result = await getSearchItems(searchValue);
    setQueryData(result);
    setLoading(false);
  }, [searchValue]);

  const handleSearch = useCallback(() => {
    localStorage.setItem(localStorageSearchKey, searchValue);
    handleRequest();
  }, [searchValue, handleRequest]);

  return (
    <div className="app">
      <ErrorBoundary>
        <ErrorTestButton />
        <Search
          searchValue={searchValue}
          handleSearchInputChange={handleSearchInputChange}
          handleSearch={handleSearch}
        />
        {loading ? loadingMessage : <Display data={queryData} />}
      </ErrorBoundary>
    </div>
  );
};

export default App;
