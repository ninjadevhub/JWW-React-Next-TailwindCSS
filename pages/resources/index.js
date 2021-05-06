import client from '../../src/apollo/client';
import Layout from '../../src/components/layout';
//import Autocomplete from '../../src/components/autocomplete';
import Resource from '../../src/components/resources/resource';
import Link from 'next/link';
//import Select from 'react-select'
import MultiSelect from 'react-multi-select-component';
//import { sanitize } from '../src/utils/miscellaneous';
import { GET_PAGE } from '../../src/queries/pages/get-page';
//import { handleRedirectsAndReturnData } from '../src/utils/slug';
import algoliasearch from 'algoliasearch/lite';
//import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { useEffect, useRef, useState } from 'react';
import {
  Configure,
  connectCurrentRefinements,
  connectMenu,
  connectSearchBox,
  //connectAutoComplete,
  InfiniteHits,
  InstantSearch,
  Stats,
} from 'react-instantsearch-dom';
import { sanitize } from '../../src/utils/miscellaneous';

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
const yearOptions = [
  { value: '', label: 'See All Years' },
  ...years.map((year) => ({
    value: yearsMap[year],
    label: year,
  })),
];

export default function Resources({ data }) {
  //console.log(JSON.stringify({ data }));
  data.topics = {
    nodes: [
      {
        name: 'Smart CSO Control Plans',
        slug: 'smart-cso-control-plans',
      },
      {
        name: 'Paying for Water Infrastructure',
        slug: 'paying-for-water-infrastructure',
      },
      {
        name: 'Green Infrastructure / Stormwater Management',
        slug: 'green-infrastructure-stormwater-management',
      },
      {
        name: 'Community Engagement and Partnerships',
        slug: 'community-engagement-and-partnerships',
      },
      {
        name: 'Drinking Water',
        slug: 'drinking-water',
      },
      {
        name: 'Lead',
        slug: 'lead',
      },
      {
        name: 'For Utilities',
        slug: 'for-utilities',
      },
      {
        name: 'For Municipalities',
        slug: 'for-municipalities',
      },
      {
        name: 'For Residents',
        slug: 'for-residents',
      },
    ],
  };

  data.jww_types = {
    nodes: [
      {
        name: 'Guides & Toolkits',
        slug: 'guides-and-toolkits',
      },
      {
        name: 'Fact Sheets',
        slug: 'fact-sheets',
      },
      {
        name: 'Case Study',
        slug: 'case-study',
      },
      {
        name: 'Work Plans',
        slug: 'work-plans',
      },
      {
        name: 'Policies & Ordinances',
        slug: 'policies-and-ordinances',
      },
    ],
  };

  const [searchMode, setSearchMode] = useState('All');
  const [optionalWords, setOptionalWords] = useState('');
  const [filters, setFilters] = useState('');
  const [committees, setCommittees] = useState([]);
  const [topics, setTopics] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const searchInputRef = useRef(null);
  const allRadioRef = useRef(null);
  const anyRadioRef = useRef(null);
  const exactRadioRef = useRef(null);
  useEffect(() => {
    if (allRadioRef.current) {
      allRadioRef.current.checked = true;
    }
  }, []);

  const setMultiTaxonomyFilters = (taxonomy, taxonomyTerms) => {
    const hasTerm =
      taxonomyTerms.length > 0 &&
      taxonomyTerms.findIndex((term) => term.value === '') === -1;
    let newFilters = '';
    if (hasTerm) {
      newFilters = taxonomyTerms.reduce((str, term, i) => {
        if (str !== '(') {
          str += ' OR ';
        }

        str += `taxonomies.${taxonomy}:"${term.label}"`;
        if (i === taxonomyTerms.length - 1) {
          str += ')';
        }

        return str;
      }, '(');
    }

    const re = new RegExp(
      `( AND )?\\(taxonomies\\.${taxonomy}:"[^"]+"( OR taxonomies\\.${taxonomy}:"[^"]+")*\\)`
    );
    if (!filters) {
      if (hasTerm) {
        setFilters(newFilters);
      }
    } else if (re.test(filters)) {
      if (hasTerm) {
        setFilters(filters.replace(re, `$1${newFilters}`));
      } else {
        setFilters(
          filters.replace(
            new RegExp(
              `^\\(taxonomies\\.${taxonomy}:"[^"]+"( OR taxonomies\\.${taxonomy}:"[^"]+")*\\)( AND )?|( AND )\\(taxonomies\\.${taxonomy}:"[^"]+"( OR taxonomies\\.${taxonomy}:"[^"]+")*\\)`
            ),
            ''
          )
        );
      }
    } else if (hasTerm) {
      setFilters(`${filters} AND ${newFilters}`);
    }
  };

  const setMultiYearFilters = (selectedYearTimestampRange) => {
    const hasYear =
      selectedYearTimestampRange.length > 0 &&
      selectedYearTimestampRange.findIndex((range) => range.value === '') ===
        -1;
    let newFilters = '';
    if (hasYear) {
      newFilters = selectedYearTimestampRange.reduce((str, range, i) => {
        if (str !== '(') {
          str += ' OR ';
        }

        str += `post_date:${range.value}`;
        if (i === selectedYearTimestampRange.length - 1) {
          str += ')';
        }

        return str;
      }, '(');
    }

    const re = /( AND )?\(post_date:\d+ TO \d+( OR post_date:\d+ TO \d+)*\)/;
    if (!filters) {
      if (hasYear) {
        setFilters(newFilters);
      }
    } else if (re.test(filters)) {
      if (hasYear) {
        setFilters(filters.replace(re, `$1${newFilters}`));
      } else {
        setFilters(
          filters.replace(
            /^\(post_date:\d+ TO \d+( OR post_date:\d+ TO \d+)*\)( AND )?|( AND )?\(post_date:\d+ TO \d+( OR post_date:\d+ TO \d+)*\)/,
            ''
          )
        );
      }
    } else if (hasYear) {
      setFilters(`${filters} AND ${newFilters}`);
    }
  };

  const CustomWidgets = connectSearchBox(
    ({ currentRefinement, isSearchStalled, refine }) => {
      const handleSearchModeChange = (event) => {
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
      };

      const CommitteeMenuSelect = () => (
        <div className="">
          <MultiSelect
            className=""
            hasSelectAll={false}
            labelledBy="By Committee"
            overrideStrings={{ selectSomeItems: 'By Committee' }}
            options={[
              { value: '', label: 'See All Committees' },
              ...(data?.committees?.nodes?.map((obj) => ({
                value: obj.slug,
                label: obj.name,
              })) || []),
            ]}
            value={committees}
            onChange={(selected) => {
              setMultiTaxonomyFilters('committee', selected);
              setCommittees((prevCommittees) => {
                if (
                  prevCommittees.findIndex(
                    (committee) => committee.value === ''
                  ) === -1 &&
                  selected.findIndex((option) => option.value === '') > -1
                ) {
                  return [{ value: '', label: 'See All Committees' }];
                }

                return selected.filter((committee) => committee.value !== '');
              });

              setTimeout(() => refine(currentRefinement));
            }}
          />
        </div>
      );

      const CustomCommitteeMenuSelect = connectMenu(CommitteeMenuSelect);

      const TopicMenuSelect = () => (
        <div className="">
          <MultiSelect
            className=""
            hasSelectAll={false}
            labelledBy="By Topic"
            overrideStrings={{ selectSomeItems: 'By Topic' }}
            options={[
              { value: '', label: 'See All Topics' },
              ...(data?.topics?.nodes?.map((obj) => ({
                value: obj.slug,
                label: obj.name,
              })) || []),
            ]}
            value={topics}
            onChange={(selected) => {
              setMultiTaxonomyFilters('topic', selected);
              setTopics((prevTopics) => {
                if (
                  prevTopics.findIndex((topic) => topic.value === '') === -1 &&
                  selected.findIndex((option) => option.value === '') > -1
                ) {
                  return [{ value: '', label: 'See All topics' }];
                }

                return selected.filter((topic) => topic.value !== '');
              });

              setTimeout(() => refine(currentRefinement));
            }}
          />
        </div>
      );

      const CustomTopicMenuSelect = connectMenu(TopicMenuSelect);

      const TypeMenuSelect = () => (
        <div className="">
          <MultiSelect
            className=""
            hasSelectAll={false}
            labelledBy="By Type"
            overrideStrings={{ selectSomeItems: 'By Type' }}
            options={[
              { value: '', label: 'See All Types' },
              ...(data?.jww_types?.nodes?.map((obj) => ({
                value: obj.slug,
                label: obj.name,
              })) || []),
            ]}
            value={types}
            onChange={(selected) => {
              setMultiTaxonomyFilters('jww_type', selected);
              setTypes((prevTypes) => {
                if (
                  prevTypes.findIndex((type) => type.value === '') === -1 &&
                  selected.findIndex((option) => option.value === '') > -1
                ) {
                  return [{ value: '', label: 'See All Types' }];
                }

                return selected.filter((type) => type.value !== '');
              });

              setTimeout(() => refine(currentRefinement));
            }}
          />
        </div>
      );

      const CustomTypeMenuSelect = connectMenu(TypeMenuSelect);

      const YearMenuSelect = () => (
        <div className="">
          <MultiSelect
            className=""
            hasSelectAll={false}
            labelledBy="By Year"
            overrideStrings={{ selectSomeItems: 'By Year' }}
            options={yearOptions}
            value={selectedYears}
            onChange={(selected) => {
              setMultiYearFilters(selected);
              setSelectedYears((prevYears) => {
                if (
                  prevYears.findIndex((year) => year.value === '') === -1 &&
                  selected.findIndex((option) => option.value === '') > -1
                ) {
                  return [{ value: '', label: 'See All Years' }];
                }

                return selected.filter((year) => year.value !== '');
              });

              setTimeout(() => refine(currentRefinement));
            }}
          />
        </div>
      );

      const hasNoFilter =
        !currentRefinement &&
        (committees.length === 0 || committees[0].value === '') &&
        (topics.length === 0 || topics[0].value === '') &&
        (types.length === 0 || types[0].value === '') &&
        (selectedYears.length === 0 || selectedYears[0].value === '');

      const ClearRefinements = ({ items, refine }) => (
        <div className={`ais-ClearRefinements${hasNoFilter ? ' hidden' : ''}`}>
          <button
            className="ais-ClearRefinements-button"
            onClick={() => {
              setFilters('');
              setOptionalWords('');
              setSearchMode('All');
              setCommittees([]);
              setTopics([]);
              setTypes([]);
              setSelectedYears([]);
              setTimeout(() => refine(items));
            }}
          >
            CLEAR SEARCH
          </button>
        </div>
      );

      const CustomClearRefinements = connectCurrentRefinements(
        ClearRefinements
      );

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
                  {/*<Autocomplete
                    openOnFocus={true}
                    getSources={() => [
                      {
                        sourceId: 'resources',
                        getItems({ query }) {
                          return getAlgoliaResults({
                            searchClient,
                            queries: [
                              {
                                indexName: 'wp_posts_resource',
                                query,
                              },
                            ],
                          });
                        },
                        templates: {
                          item({ item, components }) {
                            return (
                              <components.Highlight
                                hit={item}
                                attribute="name"
                              />
                            );
                          },
                        },
                      },
                    ]}
                  />*/}
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
                  <CustomTypeMenuSelect attribute="taxonomies.jww_type" />
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
            <div className="flex flex-wrap items-center">
              {currentRefinement && (
                <div className="relative pl-4 pr-8 mr-6 mt-4 rounded-full bg-gray-100">
                  <Link href="#">
                    <a className="block p-2">{currentRefinement}</a>
                  </Link>
                  <button
                    className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                    type="button"
                    onClick={() => refine('')}
                  >
                    &times;
                  </button>
                </div>
              )}
              {committees.length > 0 &&
                committees[0]?.value &&
                committees.map((committee) => (
                  <div
                    className="relative pl-4 pr-8 mr-6 mt-4 rounded-full bg-gray-100"
                    key={committee.value}
                  >
                    <Link href="#">
                      <a className="block p-2">{committee.label}</a>
                    </Link>
                    <button
                      className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                      type="button"
                      onClick={() => {
                        const newCommittees = committees.filter(
                          (item) => item.value !== committee.value
                        );
                        setMultiTaxonomyFilters('committee', newCommittees);
                        setCommittees(newCommittees);
                        setTimeout(() => refine(currentRefinement));
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              {topics.length > 0 &&
                topics[0].value !== '' &&
                topics.map((topic) => (
                  <div
                    className="relative pl-4 pr-8 mr-6 mt-4 rounded-full bg-gray-100"
                    key={topic.value}
                  >
                    <Link href="#">
                      <a className="block p-2">{topic.label}</a>
                    </Link>
                    <button
                      className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                      type="button"
                      onClick={() => {
                        const newTopics = topics.filter(
                          (item) => item.value !== topic.value
                        );
                        setMultiTaxonomyFilters('topic', newTopics);
                        setTopics(newTopics);
                        setTimeout(() => refine(currentRefinement));
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              {types.length > 0 &&
                types[0].value !== '' &&
                types.map((type) => (
                  <div
                    className="relative pl-4 pr-8 mr-6 mt-4 rounded-full bg-gray-100"
                    key={type.value}
                  >
                    <Link href="#">
                      <a className="block p-2">{type.label}</a>
                    </Link>
                    <button
                      className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                      type="button"
                      onClick={() => {
                        const newTypes = types.filter(
                          (item) => item.value !== type.value
                        );
                        setMultiTaxonomyFilters('jww_type', newTypes);
                        setTypes(newTypes);
                        setTimeout(() => refine(currentRefinement));
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              {selectedYears.length > 0 &&
                selectedYears[0].value !== '' &&
                selectedYears.map((selectedYear) => (
                  <div
                    className="relative pl-4 pr-8 mr-6 mt-4 rounded-full bg-gray-100"
                    key={selectedYear.label}
                  >
                    <Link href="#">
                      <a className="block p-2">{selectedYear.label}</a>
                    </Link>
                    <button
                      className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                      type="button"
                      onClick={() => {
                        const newSelectedYears = selectedYears.filter(
                          (item) => item.label !== selectedYear.label
                        );
                        setMultiYearFilters(newSelectedYears);
                        setSelectedYears(newSelectedYears);
                        setTimeout(() => refine(currentRefinement));
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    }
  );

  //const MemoizedWidgets = memo(CustomWidgets)

  return (
    <Layout data={data}>
      <h1 className="mb-5 text-center text-4xl">{data?.page?.title}</h1>
      <div
        className="md-w-4-5 mx-auto mb-7 text-center"
        dangerouslySetInnerHTML={{
          __html: sanitize(data?.page?.content ?? ''),
        }}
      />
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
