import algoliasearch from 'algoliasearch/lite';
import { debounce } from 'debounce';
import { ReactNode } from 'react'
import { 
    Configure,
    Hits,
    HitsProps,
    InstantSearch,
    Pagination,
    SearchBox,
    SearchBoxProps,
    useInstantSearch,
} from 'react-instantsearch-hooks-web';
import { Post } from '../types/posts';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const searchClient = algoliasearch(
    '0IAEHW2DF5', 
    'fb467724389477e30d3f2cc415ffa826'
);

const Hit: HitsProps<Post>['hitComponent'] = ({hit}) => {
    return <div>{hit.title}</div>
}

const NoResultsBoundary = ({children}: {children: ReactNode}) => {
    const { results } = useInstantSearch();

    if(!results.__isArtificial && results.nbHits === 0) {
        return <p>「{results.query}」検索結果はありませんでした</p>
    } 

    return <>{children}</>
}

const Search = () => {
    const search: SearchBoxProps['queryHook'] = (query, hook) => {
        hook(query)
    }

  return (
    <div>
        <h1>検索</h1>

        <InstantSearch indexName="posts" searchClient={searchClient}>
            <SearchBox classNames={{
                root: 'relative inline-block',
                input: 'rounded-full border-slate-300 pr-10',
                submitIcon: 'hidden',
                resetIcon: 'hidden',
                
            }} 
            submitIconComponent={() => (
                <span className='absolute right-0 p-2 w-10 top-1/2 -translate-y-1/2'>
                    <MagnifyingGlassIcon className='w-5 h-5 text-slate-500' />
                </span>
            )}
            queryHook={debounce(search, 500)} />
            <Configure hitsPerPage={2} />
            <NoResultsBoundary>
                <Hits<Post> hitComponent={Hit} />
                <Pagination classNames={{
                    list: 'flex space-x-3',
                    link: 'p-1 px-3 block',
                    disabledItem: 'opacity-40',
                    selectedItem: 'text-blue-500',
                }}/>
            </NoResultsBoundary>
        </InstantSearch>
    </div>
  )
}

export default Search