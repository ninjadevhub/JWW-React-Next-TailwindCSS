import { useRouter } from 'next/router';
import client from '../../src/apollo/client';
import Layout from '../../src/components/layout';
import Resource from '../../src/components/resources/resource';
import Modal from "react-modal";
import CustomWidgets from '../../src/components/CustomWidgets/CustomWidgets';
import Image from 'next/image';
import { GET_RESOURCES_PAGE } from '../../src/queries/pages/get-resources-page';
import { useEffect, useRef, useState } from 'react';
import {
  Configure,
  connectInfiniteHits,
  InstantSearch,
} from 'react-instantsearch-dom';
import { sanitize } from '../../src/utils/miscellaneous';
import TypesenseInstantSearchAdapter from '../../src/typesense-instantsearch-adapter';
import SwiperCore, { Autoplay, Pagination, EffectFade, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ResoursesModal from '../../src/components/ResoursesModal/ResoursesModal';
SwiperCore.use([Autoplay, Pagination, EffectFade, A11y]);

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
    zIndex: '1000'
  }
};

export default function Committees({ data }) {
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

  return (
    <Layout data={data}>
      <div className="relative w-full bg-brand-gray" style={{ height: 430 }} >
        {data?.page?.resources?.sliderImages?.length > 0 && (
          <Swiper 
            autoplay={{ delay: 5000 }}
            effect="fade"
            loop={true}
            pagination={{ clickable: true }}
          >
            {data?.page?.resources?.sliderImages?.map((image) => (
              <SwiperSlide>
                <div className="relative w-full" style={{ height: 430 }}>
                  <Image
                    src={image?.image?.sourceUrl ?? ''}
                    alt={image?.image?.altText || image?.image?.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
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
      <div className="com-main">
        <div className="com-flow">
          <div className="com-flow-item">
            <h2 className="com-flow-title">Asset Management and Finance Committee <i class="fa fa-angle-right"></i></h2>
            <div className="com-flow-icon">
              <Image
                src="/images/committees/icon-committee-asset.png"
                width="188"
                height="188"
              />
            </div>
          </div>
          <div className="com-flow-item">
            <h2 className="com-flow-title">Education and Outreach Committee <i class="fa fa-angle-right"></i></h2>
            <div className="com-flow-icon">
              <Image
                src="/images/committees/icon-committee-education.png"
                width="188"
                height="188"
              />
            </div>
          </div>
          <div className="com-flow-item">
            <h2 className="com-flow-title">Green Infrastructure Committee <i class="fa fa-angle-right"></i></h2>
            <div className="com-flow-icon">
              <Image
                src="/images/committees/icon-committee-infra.png"
                width="188"
                height="188"
              />
            </div>
          </div>
          <div className="com-flow-item">
            <h2 className="com-flow-title">Combined Sewer Overflow Committee <i class="fa fa-angle-right"></i></h2>
            <div className="com-flow-icon">
              <Image
                src="/images/committees/icon-committee-overflow.png"
                width="188"
                height="188"
              />
            </div>
          </div>
        </div>
        <div className="com-buttons pt-24">
          <div className="com-button com-button-task">
            <div className="com-button-icon">
              <Image
                src="/images/committees/icon-committee-task.png"
                width="59"
                height="60"
              />
            </div>
            <a href="#">Lead Task Force</a>
          </div>
          <div className="com-button com-button-data">
            <a href="#">Data Advisory Committee</a>
            <div className="com-button-icon">
              <Image
                src="/images/committees/icon-committee-data.png"
                width="50"
                height="54"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { data, errors } = await client.query({
    query: GET_RESOURCES_PAGE,
    variables: {
      uri: '/committees/',
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
