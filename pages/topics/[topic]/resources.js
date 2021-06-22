import { useEffect, useRef, useState } from 'react';
import client from '../../../src/apollo/client';
import { GET_TOPICS_SLUGS } from '../../../src/queries/taxonomies/get-topics-slugs';
import { GET_TOPIC } from '../../../src/queries/topic/get-topic';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/layout';
import Image from 'next/image';
import Select from 'react-select';
import Link from 'next/link';
import { FALLBACK, handleRedirectsAndReturnData } from '../../../src/utils/slug';
import { getTopicCircleIconBySlug } from '../../../src/utils/icons-map';
import Autocomplete from '../../../src/components/Autocomplete/Autocomplete';
import Resource from '../../../src/components/resources/resource';
import MultiSelect from 'react-multi-select-component';
import {
  Configure,
  connectCurrentRefinements,
  connectSearchBox,
  connectInfiniteHits,
  InstantSearch,
  Stats,
} from 'react-instantsearch-dom';
import TypesenseInstantSearchAdapter from '../../../src/typesense-instantsearch-adapter';

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
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const slug = data?.topicOverview?.topicOverview?.topic?.slug ?? '';
  const committeesMap = {};
  data?.committees?.nodes?.forEach(node => {
    committeesMap[node.name] = node.slug;
  });

  const defaultTopicOption = { value: '', label: 'Change Topic' };
  const topicsOptions = [
    defaultTopicOption,
    ...(data?.topics?.nodes?.map(node => ({
      value: node.slug ?? '',
      label: node.name ?? '',
    })) ?? []),
  ];
  
  const [topicOption, setTopicOption] = useState(defaultTopicOption);
  const [searchMode, setSearchMode] = useState('');
  const [facetFilters, setFacetFilters] = useState([`taxonomies_topic:${data?.topicOverview?.topicOverview?.topic?.name ?? ''}`]);
  const [committees, setCommittees] = useState([]);
  //const [topics, setTopics] = useState([]);
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

      const TypeMenuSelect = () => (
        <div className="">
          <MultiSelect
            className=""
            hasSelectAll={false}
            labelledBy="By Type"
            overrideStrings={{ selectSomeItems: 'By Type' }}
            options={[
              { value: '', label: 'See All Types' },
              ...(data?.types?.nodes?.map((obj) => ({
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
                  <h2 className="mb-6 text-center text-2xl">
                    What are you looking for?
                  </h2>
                  <div className="pb-4">
                    <Autocomplete
                      searchCurrentRefinement={currentRefinement}
                      searchRefine={refine}
                      textInputRef={textInputRef}
                    />
                  </div>
                  <div className="flex flex-wrap pb-3">
                    <label className="flex mr-3 justify-center items-center">
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
                    <div className="w-1/3 px-2">
                      <CommitteeMenuSelect />
                    </div>
                    <div className="w-1/3 px-2">
                      <TypeMenuSelect />
                    </div>
                    <div className="w-1/3 px-2">
                      <YearMenuSelect />
                    </div>
                  </div>
                  <div className="flex justify-center py-6 px-4 text-white">
                    <div className="px-2">
                      <Link href="#">
                        <a className="block py-2 px-12 bg-brand-blue text-center">
                          LEAD IN DRINKING WATER TASK FORCE
                        </a>
                      </Link>
                    </div>
                    <div className="px-2">
                      <Link href="#">
                        <a className="block py-2 px-12 bg-brand-blue text-center">
                          COMMITMENTS
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {(currentRefinement ||
                (committees.length > 0 && committees[0]?.value) ||
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
                <Resource hit={hit} committees={hit?.taxonomies_committee?.map(committee => [committeesMap[committee] ?? '', committee]) ?? []} />
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
      <div className="w-full relative bg-brand-gray" style={{ height: 340 }}>
        {data?.topicOverview?.topicOverview?.backgroundImage && (
          <Image
            src={data?.topicOverview?.topicOverview?.backgroundImage?.sourceUrl}
            alt={
              data?.topicOverview?.topicOverview?.backgroundImage?.altText ||
              data?.topicOverview?.topicOverview?.backgroundImage?.title
            }
            layout="fill"
            objectFit="cover"
          />
        )}
        <div className="w-200 max-w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-8 border-b-thick-brand-green bg-white">
          <div className="w-17 h-17 relative">
            <Image
              src={data?.topicOverview?.topicOverview?.topicIcon?.sourceUrl}
              layout="fill"
              objectFit="contain"
              alt={data?.topicOverview?.topicOverview?.topicIcon?.altText || data?.topicOverview?.topicOverview?.topicIcon?.title}
            />
          </div>
          <h1 className="mb-5 text-center text-3xl">
            {data?.title || data?.topicOverview?.topicOverview?.topic?.name}
          </h1>
          <Select
            className="w-84"
            defaultValue={topicsOptions[0]}
            onChange={(option) => {
              setTopicOption(option);
              if (option?.value) {
                router.push(`/topics/${option.value}`);
              }
            }}
            options={topicsOptions}
            value={topicOption}
          />
        </div>
      </div>
      <div className="flex justify-center bg-brand-gray mb-12">
        <Link href={`/topics/${slug}`}>
          <a className="w-52 h-15 flex justify-center items-center">
            OVERVIEW
          </a>
        </Link>
        <Link href={`/topics/${slug}/highlights`}>
          <a className="w-52 h-15 flex justify-center items-center">
            HIGHLIGHTS
          </a>
        </Link>
        <Link href={`/topics/${slug}/latest-news`}>
          <a className="w-52 h-15 flex justify-center items-center">
            LATEST NEWS
          </a>
        </Link>
          <div className="w-52 h-15 flex justify-center items-center bg-white text-brand-blue">
            RESOURCES
          </div>
        <Link href={``}>
          <a className="w-52 h-15 flex justify-center items-center">JOIN</a>
        </Link>
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

export async function getStaticProps({ params }) {
  try {
    const { data, errors } = await client.query({
      query: GET_TOPIC,
      variables: {
        slug: params.topic,
      },
    });

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

    return handleRedirectsAndReturnData(defaultProps, data, errors, 'topic');
  } catch (err) {
    console.log({ error: err });
    return {
      props: {
        data: {},
      },
      revalidate: 60,
    };
  }
}

export async function getStaticPaths() {
  try {
    const { data } = await client.query({
      query: GET_TOPICS_SLUGS,
    });

    //const topicPages = ['', '/highlights', '/latest-news', '/resources'];
    const pathsData =
      (data?.topics?.nodes &&
        data?.topics?.nodes.map(topic => ({ params: { topic: slug } }))) ?? [];

    return {
      paths: pathsData,
      fallback: FALLBACK,
    };
  } catch (err) {
    console.log({ error: err });
    return {
      paths: [],
      fallback: FALLBACK,
    };
  }
}
