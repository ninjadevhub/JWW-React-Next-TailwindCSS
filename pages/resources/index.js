import client from '../../src/apollo/client';
import Layout from '../../src/components/layout';
import Autocomplete from '../../src/components/autocomplete';
import Resource from '../../src/components/resources/resource';
import Link from 'next/link';
import Image from 'next/image';
import MultiSelect from 'react-multi-select-component';
import { GET_PAGE } from '../../src/queries/pages/get-page';
import { useEffect, useRef, useState } from 'react';
import {
  Configure,
  connectCurrentRefinements,
  connectSearchBox,
  connectInfiniteHits,
  InstantSearch,
  Stats,
} from 'react-instantsearch-dom';
import { sanitize } from '../../src/utils/miscellaneous';
import TypesenseInstantSearchAdapter from '../../src/typesense-instantsearch-adapter';
import SwiperCore, { Pagination, EffectFade, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../src/styles/pages/resources/index.module.scss';
SwiperCore.use([Pagination, EffectFade, A11y]);

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: '3IN0Gss3gm2IowqB7yHU40rUhwHTtY48', // Be sure to use the search-only-api-key
    nodes: [
      {
        host: 'jwwsearch.3lanemarketing.com',
        port: '8108',
        protocol: 'https',
      },
    ],
  },
  additionalSearchParameters: {
    queryBy:
      'post_title,content,taxonomies_committee,taxonomies_topic,taxonomies_jww_type,post_year',
    sortBy: '_text_match:desc, post_date:desc',
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

const years = [];
const thisYear = new Date().getFullYear();
for (let year = thisYear; year >= 2015; year--) {
  years.push(year);
}

const yearOptions = [
  { value: '', label: 'See All Years' },
  ...years.map((year) => ({
    value: year,
    label: year,
  })),
];

export default function Resources({ data }) {
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

  const [searchMode, setSearchMode] = useState('');
  const [facetFilters, setFacetFilters] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [topics, setTopics] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dropTokensThreshold, setDropTokensThreshold] = useState(0);
  const [numTypos, setNumTypos] = useState(2);
  const textInputRef = useRef(null);
  const allRadioRef = useRef(null);
  const anyRadioRef = useRef(null);
  const exactRadioRef = useRef(null);
  useEffect(() => {
    setTimeout(() => setSearchMode('All'));
  }, []);

  const setMultiFacetFilters = (taxonomy, taxonomyTerms) => {
    const hasTerm = taxonomyTerms.length === 1 && taxonomyTerms[0].value !== '';
    const hasTerms = taxonomyTerms.length > 1;
    let hasNoTerm = false;
    let newFacetFilters;
    if (hasTerm) {
      newFacetFilters = `${taxonomy}:${taxonomyTerms[0].label}`;
    } else if (hasTerms) {
      newFacetFilters = taxonomyTerms.map(
        (term, i) => `${taxonomy}:${term.label}`
      );
    } else {
      hasNoTerm = true;
    }

    const foundIndex = facetFilters.findIndex((filter) => {
      const filterStr = Array.isArray(filter) ? filter[0] ?? '' : filter ?? '';
      return filterStr.indexOf(taxonomy) === 0;
    });

    if (facetFilters.length === 0) {
      if (hasTerm || hasTerms) {
        setFacetFilters([newFacetFilters]);
      }
    } else if (foundIndex > -1) {
      if (hasTerm || hasTerms) {
        setFacetFilters((prevFacetFilters) => {
          prevFacetFilters[foundIndex] = newFacetFilters;
          return prevFacetFilters;
        });
      } else {
        setFacetFilters((prevFacetFilters) =>
          prevFacetFilters.filter((_, i) => i !== foundIndex)
        );
      }
    } else if (hasTerm) {
      setFacetFilters((prevFacetFilters) => [
        ...prevFacetFilters,
        newFacetFilters,
      ]);
    }
  };

  const CustomWidgets = connectSearchBox(
    ({ currentRefinement, isSearchStalled, refine }) => {
      const handleSearchModeChange = (event) => {
        const newSearchMode = event.currentTarget.value;
        switch (newSearchMode) {
          case 'All':
            setDropTokensThreshold(0);
            setNumTypos(2);
            break;
          case 'Any':
            setDropTokensThreshold(100);
            setNumTypos(2);
            break;
          case 'Exact':
            setDropTokensThreshold(0);
            setNumTypos(1);
            break;
          default:
            break;
        }

        setSearchMode(newSearchMode);
        setTimeout(() => refine(currentRefinement));
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
              setMultiFacetFilters('taxonomies_committee', selected);
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
              setMultiFacetFilters('taxonomies_topic', selected);
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
              setMultiFacetFilters('taxonomies_jww_type', selected);
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
              setMultiFacetFilters('post_year', selected);
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
              setFacetFilters([]);
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
        <>
          <div className="py-14 px-24 border-b-thick-brand-green bg-brand-gray">
            <div className="bg-brand-gray-pale">
              <div className="flex border-solid border-b border-brand-gray">
                <div className="w-2/5 pt-6 pr-6 pl-6">
                  <div className="pb-4">
                    <Autocomplete
                      searchCurrentRefinement={currentRefinement}
                      searchRefine={refine}
                      textInputRef={textInputRef}
                    />
                  </div>
                  <div className="flex flex-wrap pb-3">
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
                <div className="w-3/5 pt-6 border-solid border-l border-brand-gray">
                  <div className="flex flex-wrap pb-6 px-4 border-solid border-b border-brand-gray">
                    <div className="w-1/4 px-2">
                      <CommitteeMenuSelect />
                    </div>
                    <div className="w-1/4 px-2">
                      <TopicMenuSelect />
                    </div>
                    <div className="w-1/4 px-2">
                      <TypeMenuSelect />
                    </div>
                    <div className="w-1/4 px-2">
                      <YearMenuSelect />
                    </div>
                  </div>
                  <div className="flex py-6 px-4 text-white">
                    <div className="flex-grow px-2">
                      <Link href="#">
                        <a className="block py-2 px-3 bg-brand-blue text-center">
                          FOR MEMBERS
                        </a>
                      </Link>
                    </div>
                    <div className="flex-grow px-2">
                      <Link href="#">
                        <a className="block py-2 px-3 bg-brand-blue text-center">
                          JERSEY WATERCHECK
                        </a>
                      </Link>
                    </div>
                    <div className="flex-grow px-2">
                      <Link href="#">
                        <a className="block py-2 px-3 bg-brand-blue text-center">
                          EQUITY MAP
                        </a>
                      </Link>
                    </div>
                    <div className="flex-grow px-2">
                      <Link href="#">
                        <a className="block py-2 px-3 bg-brand-blue text-center">
                          VIDEOS
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {(currentRefinement ||
                (committees.length > 0 && committees[0]?.value) ||
                (topics.length > 0 && topics[0]?.value) ||
                (types.length > 0 && types[0]?.value) ||
                (selectedYears.length > 0 && selectedYears[0]?.value)) && (
                <div className="pb-6 pl-6 pr-6">
                  <div className="flex justify-end pt-2 text-brand-green">
                    <CustomClearRefinements
                      clearsQuery
                      translations={{
                        reset: 'CLEAR SEARCH',
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center">
                    {currentRefinement && (
                      <div className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray">
                        <Link href="#">
                          <a className="block p-2 mr-3">{currentRefinement}</a>
                        </Link>
                        <button
                          className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
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
                          className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray"
                          key={committee.value}
                        >
                          <Link href="#">
                            <a className="block p-2 mr-3">{committee.label}</a>
                          </Link>
                          <button
                            className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
                            type="button"
                            onClick={() => {
                              const newCommittees = committees.filter(
                                (item) => item.value !== committee.value
                              );
                              setMultiFacetFilters(
                                'taxonomies_committee',
                                newCommittees
                              );
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
                          className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray"
                          key={topic.value}
                        >
                          <Link href="#">
                            <a className="block p-2 mr-3">{topic.label}</a>
                          </Link>
                          <button
                            className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white"
                            type="button"
                            onClick={() => {
                              const newTopics = topics.filter(
                                (item) => item.value !== topic.value
                              );
                              setMultiFacetFilters(
                                'taxonomies_topic',
                                newTopics
                              );
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
                          className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-brand-gray"
                          key={type.value}
                        >
                          <Link href="#">
                            <a className="block p-2 mr-3">{type.label}</a>
                          </Link>
                          <button
                            className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
                            type="button"
                            onClick={() => {
                              const newTypes = types.filter(
                                (item) => item.value !== type.value
                              );
                              setMultiFacetFilters(
                                'taxonomies_jww_type',
                                newTypes
                              );
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
                          className="relative pl-4 pr-8 mr-4 mt-2 rounded-full bg-gray-100"
                          key={selectedYear.label}
                        >
                          <Link href="#">
                            <a className="block p-2 mr-3">
                              {selectedYear.label}
                            </a>
                          </Link>
                          <button
                            className="w-8 h-8 rounded-full text-2xl absolute right-1 top-1/2 -mt-4 pb-1 flex justify-center items-center bg-white text-brand-green"
                            type="button"
                            onClick={() => {
                              const newSelectedYears = selectedYears.filter(
                                (item) => item.label !== selectedYear.label
                              );
                              setMultiFacetFilters(
                                'post_year',
                                newSelectedYears
                              );
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
              )}
            </div>
          </div>
          <div className="py-8">
            <Stats
              translations={{
                stats(nbHits) {
                  return (
                    (currentRefinement?.split(/\s+/).length === 1 ||
                      searchMode !== 'Exact') &&
                    `${nbHits.toLocaleString()} Results Found`
                  );
                },
              }}
            />
          </div>
        </>
      );
    }
  );

  const InfiniteHits = ({ hits, hasMore, refineNext }) => {
    const query = textInputRef.current?.value?.toLowerCase() ?? '';
    const queryTokens = query.toLowerCase().split(/\s+/) ?? [];
    let filteredHits;
    if (queryTokens.length > 1 && searchMode === 'Exact') {
      filteredHits = hits.filter(
        ({ post_title, content }) =>
          post_title?.toLowerCase()?.includes(query) ||
          content?.toLowerCase()?.includes(query)
      );
    } else {
      filteredHits = hits;
    }

    return (
      <div class="ais-InfiniteHits">
        {filteredHits.length > 0 && (
          <ul class="ais-InfiniteHits-list">
            {filteredHits.map((hit) => (
              <li class="ais-InfiniteHits-item" key={hit.id}>
                <Resource hit={hit} />
              </li>
            ))}
          </ul>
        )}
        {hasMore && (
          <button class="ais-InfiniteHits-loadMore" onClick={refineNext}>
            LOAD MORE RESOURCES
          </button>
        )}
      </div>
    );
  };

  const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);

  return (
    <Layout data={data}>
      <div className="relative">
        <Swiper autoplay={{ delay: 5000 }} effect="fade" loop={true} pagination={{ clickable: true }}>
          <SwiperSlide>
            <div className="relative w-full" style={{ height: 430 }}>
              <Image
                src="/images/child-holding-glass-of-water.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full" style={{ height: 430 }}>
              <Image
                src="/images/boots-on-wet-street.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full" style={{ height: 430 }}>
              <Image
                src="/images/mallard-duck-swimming-pond-park.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full" style={{ height: 430 }}>
              <Image
                src="/images/girl-playing-dancing-around-wet-street.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full" style={{ height: 430 }}>
              <Image
                src="/images/couple-together-kayaking-river.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="w-150 max-w-full absolute right-24 top-14 z-10 bg-white p-6 pointer-events-none">
          <h1 className="mb-5 text-center text-3xl">{data?.page?.title}</h1>
          <div
            className="md-w-4-5 mx-auto mb-7 text-center"
            dangerouslySetInnerHTML={{
              __html: sanitize(data?.page?.content ?? ''),
            }}
          />
        </div>
      </div>
      <div>
        <InstantSearch
          indexName="wp_posts_resource"
          searchClient={searchClient}
          onSearchStateChange={(searchState) => {
            console.log(JSON.stringify({ searchState }));
          }}
        >
          <Configure
            queryByWeights="3,1,1,1,1,1"
            facetFilters={facetFilters}
            dropTokensThreshold={dropTokensThreshold}
            numTypos={numTypos}
            hitsPerPage={5}
          />
          <CustomWidgets />
          <CustomInfiniteHits />
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
}
