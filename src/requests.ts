import { BASE_URL, allPages, firstPage } from './constants';

const formUrl = (searchValue: string) => {
  const searchUrl = searchValue ? `/search?q=${searchValue}` : '';
  const limitUrl = `${searchValue ? '&' : '?'}limit=${
    searchValue ? firstPage : allPages
  }`;
  const url = `${BASE_URL}users/${searchUrl}${limitUrl}`;
  return url;
};

export const getSearchItems = async (searchValue: string) => {
  const url = formUrl(searchValue);

  let response;

  try {
    response = await fetch(url);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // no internet
      console.error(error.message);
    }
    return null;
  }

  if (response.ok) {
    const json = await response.json();
    return json.users;
  } else {
    // status not 200-299
    console.log('HTTP Error: ' + response.status);
    return null;
  }
};
