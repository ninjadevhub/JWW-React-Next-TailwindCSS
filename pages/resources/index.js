import client from '../../src/apollo/client';
import Layout from '../../src/components/layout';
import Resource from '../../src/components/resources/resource';
import Link from 'next/link';
//import { sanitize } from '../src/utils/miscellaneous';
import { GET_PAGE } from '../../src/queries/pages/get-page';
//import { handleRedirectsAndReturnData } from '../src/utils/slug';
import algoliasearch from 'algoliasearch/lite';
import { useEffect, useRef, useState } from 'react';
import {
  Configure,
  connectCurrentRefinements,
  connectMenu,
  connectSearchBox,
  InfiniteHits,
  InstantSearch,
  Stats,
} from 'react-instantsearch-dom';
import {sanitize} from '../../src/utils/miscellaneous';

const searchClient = algoliasearch(
  'UITI8CODED',
  '10a6a05f20a0f9794aa2fee36be2739a'
);

const yearsMap = {};
const thisYear = new Date().getFullYear();
for (let year = thisYear; year >= 2015; year--) {
  yearsMap[year] = `${Math.round(
    new Date(`${year}-01-01T00:00:00`).getTime() / 1000
  )} TO ${Math.round(new Date(`${year}-12-31T23:59:59`).getTime() / 1000)}`;
}

const years = Object.keys(yearsMap).sort((a, b) => b - a);
const yearTimestampRanges = years.map((year) => yearsMap[year]);

export default function Resources({ data }) {
  console.log(JSON.stringify({data}));
  const [searchMode, setSearchMode] = useState('All');
  const [optionalWords, setOptionalWords] = useState('');
  const [filters, setFilters] = useState('');
  const [committee, setCommittee] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');
  const [yearTimestampRange, setYearTimestampRange] = useState('');
  const searchInputRef = useRef(null);
  const allRadioRef = useRef(null);
  const anyRadioRef = useRef(null);
  const exactRadioRef = useRef(null);
  useEffect(() => {
    if (allRadioRef.current) {
      allRadioRef.current.checked = true;
    }
  }, []);

  function setTaxonomyFilters(taxonomy, taxonomyTerm) {
    if (!filters) {
      if (taxonomyTerm && taxonomyTerm !== 'ais__see__all__option') {
        setFilters(`taxonomies.${taxonomy}:"${taxonomyTerm}"`);
      }
    } else if (
      new RegExp(`( AND )?taxonomies\\.${taxonomy}:"[-\\w ]+"`).test(filters)
    ) {
      if (taxonomyTerm && taxonomyTerm !== 'ais__see__all__option') {
        setFilters(
          filters.replace(
            new RegExp(`( AND )?taxonomies\\.${taxonomy}:"[-\\w ]+"`),
            `$1taxonomies.${taxonomy}:"${taxonomyTerm}"`
          )
        );
      } else {
        setFilters(
          filters.replace(
            new RegExp(
              `^taxonomies\\.${taxonomy}:"[-\\w ]+"( AND )?| AND taxonomies\\.${taxonomy}:"[-\\w ]+"`
            ),
            ''
          )
        );
      }
    } else if (taxonomyTerm && taxonomyTerm !== 'ais__see__all__option') {
      setFilters(`${filters} AND taxonomies.${taxonomy}:"${taxonomyTerm}"`);
    }
  }

  function setYearFilters(yearTimestampRange) {
    if (!filters) {
      if (
        yearTimestampRange &&
        yearTimestampRange !== 'ais__see__all__option'
      ) {
        setFilters(`post_date:${yearTimestampRange}`);
      }
    } else if (/( AND )?post_date:\d+ TO \d+/.test(filters)) {
      if (
        yearTimestampRange &&
        yearTimestampRange !== 'ais__see__all__option'
      ) {
        setFilters(
          filters.replace(
            /( AND )?post_date:\d+ TO \d+/,
            `$1post_date:${yearTimestampRange}`
          )
        );
      } else {
        setFilters(
          filters.replace(
            /(^post_date:\d+ TO \d+( AND )?| AND post_date:\d+ TO \d+)/,
            ''
          )
        );
      }
    } else if (
      yearTimestampRange &&
      yearTimestampRange !== 'ais__see__all__option'
    ) {
      setFilters(`${filters} AND post_date:${yearTimestampRange}`);
    }
  }

  const CustomWidgets = connectSearchBox(({ currentRefinement, _, refine }) => {
    function handleSearchModeChange(event) {
      const newSearchMode = event.currentTarget.value;
      let newQuery;
      let optionalWords;
      if (newSearchMode === 'Exact') {
        newQuery = `"${currentRefinement?.replace(/"+/g, '') || ''}"`;
      } else {
        newQuery = currentRefinement?.replace(/"+/g, '') || '';
      }

      if (newSearchMode === 'Any') {
        optionalWords = newQuery;
      } else {
        optionalWords = '';
      }

      setSearchMode(newSearchMode);
      setOptionalWords(optionalWords);
      setTimeout(() => refine(newQuery));
    }

    function CommitteeMenuSelect({ items }) {
      return (
        <div className="ais-MenuSelect">
          <select
            className="ais-MenuSelect-select"
            value={committee}
            onChange={(event) => {
              const newCommittee = event.currentTarget.value;
              setTaxonomyFilters('committee', newCommittee);
              setCommittee(newCommittee);
              setTimeout(() => refine(currentRefinement));
            }}
          >
            <option value="">By Committee</option>
            <option
              value="ais__see__all__option"
              selected={committee === 'ais__see__all__option'}
            >
              See All Committees
            </option>
            {items.map((item) => (
              <option
                key={item.label}
                value={item.value}
                selected={committee === item.value}
              >
                {`${item.label} (${item.count})`}
              </option>
            ))}
          </select>
        </div>
      );
    }

    const CustomCommitteeMenuSelect = connectMenu(CommitteeMenuSelect);
    //const MemoizedCommitteeMenuSelect = memo(CustomCommitteeMenuSelect)

    function TopicMenuSelect({ items }) {
      return (
        <div className="ais-MenuSelect">
          <select
            className="ais-MenuSelect-select"
            value={topic}
            onChange={(event) => {
              const newTopic = event.currentTarget.value;
              setTaxonomyFilters('topic', newTopic);
              setTopic(newTopic);
              setTimeout(() => refine(currentRefinement));
            }}
          >
            <option value="">By Topic</option>
            <option
              value="ais__see__all__option"
              selected={topic === 'ais__see__all__option'}
            >
              See All Topics
            </option>
            {items.map((item) => (
              <option
                key={item.label}
                value={item.value}
                selected={topic === item.value}
              >
                {`${item.label} (${item.count})`}
              </option>
            ))}
          </select>
        </div>
      );
    }

    const CustomTopicMenuSelect = connectMenu(TopicMenuSelect);
    //const MemoizedTopicMenuSelect = memo(CustomTopicMenuSelect)

    function TypeMenuSelect({ items }) {
      return (
        <div className="ais-MenuSelect">
          <select
            className="ais-MenuSelect-select"
            value={type}
            onChange={(event) => {
              const newType = event.currentTarget.value;
              setTaxonomyFilters('type', newType);
              setType(newType);
              setTimeout(() => refine(currentRefinement));
            }}
          >
            <option value="">By Type</option>
            <option
              value="ais__see__all__option"
              selected={type === 'ais__see__all__option'}
            >
              See All Types
            </option>
            {items.map((item) => (
              <option
                key={item.label}
                value={item.value}
                selected={type === item.value}
              >
                {`${item.label} (${item.count})`}
              </option>
            ))}
          </select>
        </div>
      );
    }

    const CustomTypeMenuSelect = connectMenu(TypeMenuSelect);
    //const MemoizedTypeMenuSelect = memo(CustomTypeMenuSelect)

    function YearMenuSelect() {
      return (
        <div className="ais-MenuSelect">
          <select
            className="ais-MenuSelect-select"
            value={yearTimestampRange}
            onChange={(event) => {
              const newYearTimestampRange = event.currentTarget.value;
              setYearFilters(newYearTimestampRange);
              setYearTimestampRange(newYearTimestampRange);
              setTimeout(() => refine(currentRefinement));
            }}
          >
            <option value="">By Year</option>
            <option
              value="ais__see__all__option"
              selected={type === 'ais__see__all__option'}
            >
              See All Years
            </option>
            {years.map((year) => (
              <option
                key={year}
                value={yearsMap[year]}
                selected={yearTimestampRange === yearsMap[year]}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      );
    }

    function ClearRefinements({ items, refine }) {
      return (
        <div className="ais-ClearRefinements">
          <button
            className="ais-ClearRefinements-button"
            onClick={() => {
              setFilters('');
              setOptionalWords('');
              setSearchMode('All');
              setCommittee('');
              setTopic('');
              setType('');
              setYearTimestampRange('');
              setTimeout(() => refine(items));
            }}
            //disabled={!items.length}
          >
            CLEAR SEARCH
          </button>
        </div>
      );
    }

    const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

    return (
      <div className="p-4 mx-6 bg-gray-500">
        <div className="flex border-solid border-b border-white">
          <div className="w-2/5 pr-4">
            <div className="pb-4">
              <div className="ais-SearchBox">
                <form
                  noValidate=""
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
                    spellCheck="false"
                    required=""
                    maxLength="512"
                    ref={searchInputRef}
                    value={currentRefinement}
                    onChange={(event) => {
                      const { value } = event.currentTarget;
                      let newQuery;
                      if (searchMode === 'Exact') {
                        newQuery = `"${value?.replace(/"+/g, '') || ''}"`;
                      } else {
                        newQuery = value?.replace(/"+/g, '') || '';
                      }

                      refine(newQuery);
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
                  ref={allRadioRef}
                  name="searchMode"
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
                  ref={anyRadioRef}
                  name="searchMode"
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
                  ref={exactRadioRef}
                  name="searchMode"
                  value="Exact"
                  checked={searchMode === 'Exact'}
                  onChange={handleSearchModeChange}
                />
                <span className="pl-1">Exact words</span>
              </label>
            </div>
          </div>
          <div className="w-3/5 border-solid border-l border-white">
            <div className="flex flex-wrap pb-4 px-3 border-solid border-b border-white">
              <div className="w-1/4 px-3">
                <CustomCommitteeMenuSelect attribute="taxonomies.committee" />
              </div>
              <div className="w-1/4 px-3">
                <CustomTopicMenuSelect attribute="taxonomies.topic" />
              </div>
              <div className="w-1/4 px-3">
                <CustomTypeMenuSelect attribute="taxonomies.type" />
              </div>
              <div className="w-1/4 px-3">
                <YearMenuSelect />
              </div>
            </div>
            <div className="flex py-4 px-3 text-white">
              <div className="flex-grow px-3">
                <Link href="#">
                  <a className="block py-2 px-3 border-solid border-2 border-white bg-transparent text-center">
                    FOR MEMBERS
                  </a>
                </Link>
              </div>
              <div className="flex-grow px-3">
                <Link href="#">
                  <a className="block py-2 px-3 border-solid border-2 border-white bg-transparent text-center">
                    JERSEY WATERCHECK
                  </a>
                </Link>
              </div>
              <div className="flex-grow px-3">
                <Link href="#">
                  <a className="block py-2 px-3 border-solid border-2 border-white bg-transparent text-center">
                    EQUITY MAP
                  </a>
                </Link>
              </div>
              <div className="flex-grow px-3">
                <Link href="#">
                  <a className="block py-2 px-3 border-solid border-2 border-white bg-transparent text-center">
                    VIDEOS
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-end pt-4 pr-6 text-white">
            <CustomClearRefinements
              clearsQuery
              translations={{
                reset: 'CLEAR SEARCH',
              }}
            />
          </div>
          <div className="flex items-center">
            {committee && committee !== 'ais__see__all__option' && (
              <div className="relative pl-4 pr-8 mr-6 rounded-full bg-gray-100">
                <Link href="#">
                  <a className="block p-2">{committee}</a>
                </Link>
                <button
                  className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                  type="button"
                  onClick={() => {
                    setTaxonomyFilters('committee', '');
                    setCommittee('');
                    setTimeout(() => refine(currentRefinement));
                  }}
                >
                  &times;
                </button>
              </div>
            )}
            {topic && topic !== 'ais__see__all__option' && (
              <div className="relative pl-4 pr-8 mr-6 rounded-full bg-gray-100">
                <Link href="#">
                  <a className="block p-2">{topic}</a>
                </Link>
                <button
                  className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                  type="button"
                  onClick={() => {
                    setTaxonomyFilters('topic', '');
                    setTopic('');
                    setTimeout(() => refine(currentRefinement));
                  }}
                >
                  &times;
                </button>
              </div>
            )}
            {type && type !== 'ais__see__all__option' && (
              <div className="relative pl-4 pr-8 mr-6 rounded-full bg-gray-100">
                <Link href="#">
                  <a className="block p-2">{type}</a>
                </Link>
                <button
                  className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                  type="button"
                  onClick={() => {
                    setTaxonomyFilters('type', '');
                    setType('');
                    setTimeout(() => refine(currentRefinement));
                  }}
                >
                  &times;
                </button>
              </div>
            )}
            {yearTimestampRange &&
              yearTimestampRange !== 'ais__see__all__option' && (
                <div className="relative pl-4 pr-8 rounded-full bg-gray-100">
                  <Link href="#">
                    <a className="block p-2">
                      {years[yearTimestampRanges.indexOf(yearTimestampRange)]}
                    </a>
                  </Link>
                  <button
                    className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                    type="button"
                    onClick={() => {
                      setYearFilters('');
                      setYearTimestampRange('');
                      setTimeout(() => refine(currentRefinement));
                    }}
                  >
                    &times;
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  });

  //const MemoizedWidgets = memo(CustomWidgets)

  return (
    <Layout data={data}>
      <h1 className="mb-5 text-center text-4xl">{data?.page?.title}</h1>
			<div className="md-w-4-5 mx-auto mb-7 text-center" dangerouslySetInnerHTML={{__html: sanitize( data?.page?.content ?? '' )}}/>
      <div className="-mx-5">
        <InstantSearch
          indexName="wp_posts_resource"
          searchClient={searchClient}
          //searchState={searchState
          onSearchStateChange={(searchState) =>
            console.log(JSON.stringify({ searchState }))
          }
        >
          <Configure
            //query={query}
            filters={filters}
            optionalWords={optionalWords}
            advancedSyntax={true}
            hitsPerPage={9}
          />
          <CustomWidgets />
          <div className="px-5 py-8">
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
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: '/resources/',
    },
  });

  const defaultProps = {
    props: {
      data: data || {},
    },
    revalidate: 60,
  };

  return defaultProps;

  //return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );
}
