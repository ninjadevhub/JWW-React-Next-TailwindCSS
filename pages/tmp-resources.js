import { useState, useRef } from 'react';
//import client from '../src/apollo/client';
import Layout from '../src/components/layout';
import Resource from '../src/components/resources/resource';
import Link from 'next/link';
//import { sanitize } from '../src/utils/miscellaneous';
//import { GET_PAGE } from '../src/queries/pages/get-page';
//import { handleRedirectsAndReturnData } from '../src/utils/slug';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  connectSearchBox,
  MenuSelect,
  ClearRefinements,
  Stats,
  InfiniteHits,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'UITI8CODED',
  '10a6a05f20a0f9794aa2fee36be2739a'
);

export default function Resources({ data }) {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState('All');
  const [optionalWords, setOptionalWords] = useState('');
  const [committee, setCommittee] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');
  const searchInputRef = useRef();
  const handleSearchStateChange = (searchState) => {
    const { menu } = searchState;
    let newQuery;
    if (searchMode === 'Exact') {
      newQuery = `"${query?.replace(/["]+/g, '') || ''}"`;
    } else {
      newQuery = query?.replace(/["]+/g, '') || '';
    }

    if (searchMode === 'Any') {
      setOptionalWords(newQuery);
    } else {
      setOptionalWords('');
    }

    searchState.query = newQuery;
    searchInputRef.current.focus();
    setCommittee(menu?.['taxonomies.committee'] || '');
    setTopic(menu?.['taxonomies.topic'] || '');
    setType(menu?.['taxonomies.type'] || '');
    console.log(searchMode, newQuery, searchState);
  };

  const SearchBoxWithControls = connectSearchBox(
    ({ currentRefinement, isSearchStalled, refine }) => {
      const handleSearchModeChange = (event) => {
        const newSearchMode = event.currentTarget.value;
        let newQuery = currentRefinement;
        setSearchMode(newSearchMode);
        if (newSearchMode === 'Exact') {
          newQuery = `"${
            currentRefinement?.replace(/["]+/g, '') || ''
          }"`;
        } else {
          newQuery = currentRefinement?.replace(/["]+/g, '') || '';
        }

        if (newSearchMode === 'Any') {
          setOptionalWords(newQuery);
        } else {
          setOptionalWords(newQuery);
        }

        refine(newQuery);
        console.log('cr', currentRefinement, 'nq', newQuery);
      };

      return (
        <>
          <div className="pb-4">
            <div className="ais-SearchBox">
              <form
                novalidate=""
                className="ais-SearchBox-form"
                action=""
                role="search"
              >
                <input
                  type="search"
                  placeholder="Search here…"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellcheck="false"
                  required=""
                  maxLength="512"
                  ref={searchInputRef}
                  value={currentRefinement}
                  onChange={event => {
                    const queryVal = event.currentTarget.value;
                    setQuery(queryVal);
                    refine(queryVal);
                    //event.currentTarget.focus();
                  }}
                  className="ais-SearchBox-input"
                />
                <button
                  type="button"
                  title="Submit your search query."
                  className="ais-SearchBox-submit"
                >
                  <svg
                    className="ais-SearchBox-submitIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 40 40"
                  >
                    <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
                  </svg>
                </button>
                <button
                  type="reset"
                  title="Clear the search query."
                  className="ais-SearchBox-reset"
                  hidden
                >
                  <svg
                    className="ais-SearchBox-resetIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="10"
                    height="10"
                  >
                    <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap pb-3 text-white">
            <div className="w-full py-1">Search for:</div>
            <label className="flex mr-3 items-center">
              <input
                type="radio"
                className=""
                value="All"
                checked={!searchMode || searchMode === 'All'}
                onChange={handleSearchModeChange}
              />
              <span className="pl-1">All words</span>
            </label>
            <label className="flex mr-3 items-center">
              <input
                type="radio"
                className=""
                value="Any"
                checked={searchMode === 'Any'}
                onChange={handleSearchModeChange}
              />
              <span className="pl-1">Any words</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className=""
                value="Exact"
                checked={searchMode === 'Exact'}
                onChange={handleSearchModeChange}
              />
              <span className="pl-1">Exact words</span>
            </label>
          </div>
        </>
      );
    }
  );

  return (
    <Layout data={data}>
      <InstantSearch
        indexName="wp_posts_resource"
        searchClient={searchClient}
        onSearchStateChange={handleSearchStateChange}
      >
        <Configure
          //query={query}
          optionalWords={optionalWords}
          advancedSyntax={true}
          hitsPerPage={9}
        />
        <div className="p-4 mx-6 bg-gray-500">
          <div className="flex border-solid border-b border-white">
            <div className="w-2/5 pr-4">
              <SearchBoxWithControls />
            </div>
            <div className="w-3/5 border-solid border-l border-white">
              <div className="flex pb-4 px-3 border-solid border-b border-white">
                <div className="w-1/3 px-3">
                  <MenuSelect attribute="taxonomies.committee" />
                </div>
                <div className="w-1/3 px-3">
                  <MenuSelect attribute="taxonomies.topic" />
                </div>
                <div className="w-1/3 px-3">
                  <MenuSelect attribute="taxonomies.type" />
                </div>
              </div>
              <div className="flex py-4 px-3 text-white">
                <div className="w-1/2 px-3">
                  <Link href="#">
                    <a className="block py-2 px-3 border-solid border-2 border-white bg-transparent text-center">
                      FOR MEMBERS
                    </a>
                  </Link>
                </div>
                <div className="w-1/2 px-3">
                  <Link href="#">
                    <a className="block py-2 px-3 border-solid border-2 border-white bg-transparent text-center">
                      JOIN THIS COMMITTEE
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-end pr-6 text-white">
              <ClearRefinements
                clearsQuery
                translations={{
                  reset: 'CLEAR SEARCH',
                }}
              />
            </div>
            <div className="flex items-center">
              {committee && (
                <div className="relative pl-4 pr-8 mr-6 rounded-full bg-gray-100">
                  <Link href="#">
                    <a className="block p-2">{committee}</a>
                  </Link>
                </div>
              )}
              {topic && (
                <div className="relative pl-4 pr-8 mr-6 rounded-full bg-gray-100">
                  <Link href="#">
                    <a className="block p-2">{topic}</a>
                  </Link>
                </div>
              )}
              {type && (
                <div className="relative pl-4 pr-8 rounded-full bg-gray-100">
                  <Link href="#">
                    <a className="block p-2">{type}</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-8 mx-6">
          <Stats
            translations={{
              stats(nbHits) {
                return `${nbHits.toLocaleString()} Results Found`;
              },
            }}
          />
        </div>
        <InfiniteHits
          hitComponent={Resource}
          translations={{
            loadPrevious: 'LOAD PREVIOUS RESOURCES',
            loadMore: 'LOAD MORE RESOURCES',
          }}
        />
      </InstantSearch>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const data = {
    page: {
      uri: {},
      seo: {},
    },
  };

  const errors = '';

  const defaultProps = {
    props: {
      data: data || {},
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 60,
  };

  return defaultProps;

  return handleRedirectsAndReturnData(defaultProps, data, errors, 'page');
}
