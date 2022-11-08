import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('0IAEHW2DF5', 'fb467724389477e30d3f2cc415ffa826');

const Search = () => {
  return (
    <div>
        <h1>検索</h1>
    </div>
  )
}

export default Search