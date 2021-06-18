import { memo } from 'react';
import { useRouter } from 'next/router';
import client from '../../src/apollo/client';
import Layout from '../../src/components/layout';
import Resource from '../../src/components/resources/resource';
import News from '../../src/components/news/news';
import Video from '../../src/components/Video/Video';
import Modal from 'react-modal';
import CustomWidgets from '../../src/components/CustomWidgets/CustomWidgets';
import { GET_RESOURCES_PAGE } from '../../src/queries/pages/get-resources-page';
import { useEffect, useRef, useState } from 'react';
import {
  Configure,
  connectInfiniteHits,
  InstantSearch,
} from 'react-instantsearch-dom';
import TypesenseInstantSearchAdapter from '../../src/typesense-instantsearch-adapter';
import ResoursesModal from '../../src/components/ResoursesModal/ResoursesModal';

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
Modal.setAppElement('#__next');
const modalStyles = {
  content: {
    position: 'fixed',
    border: '0',
    borderRadius: '4px',
    width: '1250px',
    padding: '1rem',
    top: '4%',
    margin: '0 auto',
    zIndex: '1000',
  },
};

export default function Search({ data }) {
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
  const committeesMap = {};
  data?.committees?.nodes?.forEach((node) => {
    committeesMap[node.name] = node.slug;
  });

  useEffect(() => {
    setTimeout(() => setSearchMode('All'));
  }, []);

  const setMultiFacetFilters = (taxonomy, taxonomyTerms) => {
    const hasTerm = taxonomyTerms?.length === 1 && taxonomyTerms[0].value !== '';
    const hasTerms = taxonomyTerms?.length > 1;
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

  const InfiniteHits = ({ hits, hasMore, refineNext }) => {
    //console.log("dddd",hits)
    const [currentResource, setCurrentResource] = useState(null);
    const router = useRouter();

    const handleOpenResourcesModal = (hit) => {
      router.push(
        `/resources/?resourcesId=${hit.id}`,
        `/resources/?resourcesId=${hit.id}`
      );
    };
    const handleCloseResourcesModal = () => {
      setCurrentResource(null);
      router.push('/resources');
    };

    const onShowNextResources = (resourcesId) => {
      const currentIndex = hits.findIndex((v) => v.id === resourcesId);
      if (currentIndex < hits.length) {
        const nextResources = hits[currentIndex + 1];
        if (nextResources) {
          setCurrentResource(nextResources);
          router.push(`/resources/?resourcesId=${hits.id}`);
        }
      }
    };

    const onShowPrevResources = (resourcesId) => {
      const currentIndex = hits.findIndex((v) => v.id === resourcesId);
      if (currentIndex > 0) {
        const prevResources = hits[currentIndex - 1];
        if (prevResources) {
          setCurrentResource(prevResources);
          router.push(`/resources/?resourcesId=${hits.id}`);
        }
      }
    };

    useEffect(() => {
      if (router.query.resourcesId) {
        const current = hits.find((v) => v.id === router.query.resourcesId);
        setCurrentResource(current);
      }
    }, [router]);

    const query = textInputRef?.current?.value?.toLowerCase() ?? '';
    const queryTokens = query.toLowerCase().split(/\s+/) ?? [];
    let filteredHits;
    if (queryTokens.length > 1 && searchMode === 'Exact') {
      filteredHits = hits?.filter(
        ({ post_title, content }) =>
          post_title?.toLowerCase()?.includes(query) ||
          content?.toLowerCase()?.includes(query)
      );
    } else {
      filteredHits = hits;
    }

    return (
      <div class="ais-InfiniteHits">
        <Modal
          isOpen={!!currentResource}
          contentLabel="Resource modal Title"
          style={modalStyles}
        >
          <ResoursesModal
            hit={currentResource}
            onNext={onShowNextResources}
            onPrev={onShowPrevResources}
            onClose={handleCloseResourcesModal}
            committees={
              currentResource?.taxonomies_committee?.map((committee) => [
                committeesMap[committee] ?? '',
                committee,
              ]) ?? []
            }
          />
        </Modal>

        {filteredHits?.length > 0 && (
          <ul class="ais-InfiniteHits-list">
            {filteredHits.map((hit) => (
              <li class="ais-InfiniteHits-item" key={hit.id}>
                {hit.post_type === 'resource' ? (
                  <Resource
                    hit={hit}
                    committees={
                      hit?.taxonomies_committee?.map((committee) => [
                        committeesMap[committee] ?? '',
                        committee,
                      ]) ?? []
                    }
                    onCardClick={handleOpenResourcesModal}
                  />
                ) : (hit.post_type === 'video' ? (
                  <Video
                    hit={hit}
                    onCardClick={() => {}}
                  />
                ) : (
                  <News
                    hit={hit}
                    committees={
                      hit?.taxonomies_committee?.map((committee) => [
                        committeesMap[committee] ?? '',
                        committee,
                      ]) ?? []
                    }
                    onCardClick={() => {}}
                  />
                ))}
                {/*['page', 'video'].includes(hit.post_type) &&
                JSON.stringify(hit)*/}
              </li>
            ))}
          </ul>
        )}
        {hasMore && (
          <button class="ais-InfiniteHitsj-loadMore" onClick={refineNext}>
            LOAD MORE RESULTS
          </button>
        )}
      </div>
    );
  };

  const CustomInfiniteHits = memo(connectInfiniteHits(InfiniteHits));

  return (
    <Layout data={data}>
      <div>
        <InstantSearch
          indexName="wp_searchable_posts"
          searchClient={searchClient}
          onSearchStateChange={(searchState) => {}}
        >
          <Configure
            queryByWeights="3,1,1,1,1,1"
            facetFilters={facetFilters}
            dropTokensThreshold={dropTokensThreshold}
            numTypos={numTypos}
            hitsPerPage={5}
          />
          <CustomWidgets
            setDropTokensThreshold={setDropTokensThreshold}
            setNumTypos={setNumTypos}
            setSearchMode={setSearchMode}
            setFacetFilters={setFacetFilters}
            setCommittees={setCommittees}
            setTopics={setTopics}
            setTypes={setTypes}
            setSelectedYears={setSelectedYears}
            textInputRef={textInputRef}
            allRadioRef={allRadioRef}
            searchMode={searchMode}
            anyRadioRef={anyRadioRef}
            exactRadioRef={exactRadioRef}
            data={data}
            committees={committees}
            setMultiFacetFilters={setMultiFacetFilters}
            topics={topics}
            types={types}
            selectedYears={selectedYears}
          />
          <CustomInfiniteHits />
        </InstantSearch>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { data, errors } = await client.query({
    query: GET_RESOURCES_PAGE,
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
