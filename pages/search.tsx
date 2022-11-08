import React from 'react'
import algoliasearch from 'algoliasearch/lite';
import { Hits, HitsProps, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import { Post } from '../types/posts';

const searchClient = algoliasearch(
    '0IAEHW2DF5', 
    'fb467724389477e30d3f2cc415ffa826'
);

const Hit: HitsProps<Post>['hitComponent'] = ({hit}) => {
    return <div>{hit.title}</div>
}

const Search = () => {
  return (
    <div>
        <h1>検索</h1>

        <InstantSearch indexName="posts" searchClient={searchClient}>
            <SearchBox /> 
            <Hits<Post> hitComponent={Hit} />
        </InstantSearch>
    </div>
  )
}

export default Search