import algoliasearch from 'algoliasearch/lite';
import { debounce } from 'debounce';
import { ReactNode, useEffect, useState } from 'react'
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
import { format } from 'date-fns';
import { doc, getDoc, snapshotEqual } from 'firebase/firestore';
import { User } from '../types/user';
import { db } from '../firebase/client';
import useSWR from 'swr/immutable';
import Link from 'next/link';

const searchClient = algoliasearch(
    '0IAEHW2DF5', 
    'fb467724389477e30d3f2cc415ffa826'
);

const Hit: HitsProps<Post>['hitComponent'] = ({hit}) => {
    const { data: user} = useSWR<User>(
        hit.authorId && `users/${hit.authorId}`,
            async () => {
                const ref = doc(db, `users/${hit.authorId}`);
                const snap = await getDoc(ref)
                return snap.data() as User;
            }
        );

    return (
        <div className='rouded-md shadow p-4'>
            <h2 className="line-clamp-2">
                <Link href={`posts/${hit.id}`}>
                    <a>{hit.title}</a>
                </Link>
            </h2>
            <p className='text-slate-500'>
                {format(hit.createdAt, 'yyyy年MM月dd日')}
            </p>
            {user && <p className="truncate">{user.name}</p>}
        </div>
    )
}

const NoResultsBoundary = ({children}: {children: ReactNode}) => {
    const { results } = useInstantSearch();

    if(!results.__isArtificial && results.nbHits === 0) {
        return <p>「{results.query}」検索結果はありませんでした</p>
    } 

    return (
        <div>
            {results.query && (
                <p className='text-sm-slate-500 my-4'>
                    「{results.query}」の検索結果が{results.nbHits}件見つかりました。
                </p>
            )}
            { children }
        </div>
        )
}

const Search = () => {
    const search: SearchBoxProps['queryHook'] = (query, hook) => {
        hook(query)
    }

  return (
    <div className="container">
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
            <Configure hitsPerPage={5} />
            <NoResultsBoundary>
                <Hits<Post> 
                    classNames={{
                        list: 'space-y-4 my-6',
                    }}
                    hitComponent={Hit} 
                />
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