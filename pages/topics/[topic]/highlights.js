import { useState } from 'react';
import client from '../../../src/apollo/client';
import { GET_TOPICS_SLUGS } from '../../../src/queries/taxonomies/get-topics-slugs';
import { GET_TOPIC } from '../../../src/queries/topic/get-topic';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/layout';
import Image from 'next/image';
import Select from 'react-select';
import Link from 'next/link';
import {
  FALLBACK,
  handleRedirectsAndReturnData,
} from '../../../src/utils/slug';
import { getTopicCircleIconBySlug } from '../../../src/utils/icons-map';
import { sanitize } from '../../../src/utils/miscellaneous';

export default function TopicHighlights({ data }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const slug = data?.topicOverview?.topicOverview?.topic?.slug ?? '';
  const defaultTopicOption = { value: '', label: 'Change Topic' };
  const topicsOptions = [
    defaultTopicOption,
    ...(data?.topics?.nodes?.map(node => ({
      value: node.slug ?? '',
      label: node.name ?? '',
    })) ?? []),
  ];

  const [topicOption, setTopicOption] = useState(defaultTopicOption);
  const { highlightsButtonText, highlightsButtonUrl } =
    data?.topicOverview?.topicOverview || {};

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
          <a className="w-52 h-15 flex justify-center items-center">OVERVIEW</a>
        </Link>
        <div className="w-52 h-15 flex justify-center items-center bg-white text-brand-blue">
          HIGHLIGHTS
        </div>
        <Link href={`/topics/${slug}/latest-news`}>
          <a className="w-52 h-15 flex justify-center items-center">
            LATEST NEWS
          </a>
        </Link>
        <Link href={`/topics/${slug}/resources`}>
          <a className="w-52 h-15 flex justify-center items-center">
            RESOURCES
          </a>
        </Link>
        <Link href={`#`}>
          <a className="w-52 h-15 flex justify-center items-center">JOIN</a>
        </Link>
      </div>
      <div className="text-center">
        {highlightsButtonText && (
          <Link href={highlightsButtonUrl}>
            <a className="inline-block px-12 py-4 bg-brand-orange text-sm text-white">
              {highlightsButtonText}
            </a>
          </Link>
        )}
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
        data?.topics?.nodes.map(topic => ({ params: { topic: topic.slug } }))) ?? [];

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
