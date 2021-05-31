import { useState } from 'react';
import client from '../../../src/apollo/client';
import { GET_COMMITTEES_SLUGS } from '../../../src/queries/taxonomies/get-committees-slugs';
import { GET_COMMITTEE } from '../../../src/queries/taxonomies/get-committee';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/layout';
import Image from 'next/image';
import Select from 'react-select';
import Link from 'next/link';
import {
  FALLBACK,
  handleRedirectsAndReturnData,
} from '../../../src/utils/slug';
import { getCommitteeIconsByName } from '../../../src/utils/icons-map';
import { sanitize } from '../../../src/utils/miscellaneous';

export default function CommitteeOverview({ data }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const slug = data?.committee?.slug ?? '';
  const name = data?.committee?.name ?? '';
  const defaultCommitteeOption = { value: '', label: 'Change Committee' };
  const committeesOptions = [
    defaultCommitteeOption,
    ...(data?.committees?.nodes?.map(({ slug, name }) => ({
      value: slug,
      label: name,
    })) ?? []),
  ];
  const [committeeOption, setCommitteeOption] = useState(
    defaultCommitteeOption
  );

  return (
    <Layout data={data}>
      <div className="w-full relative bg-brand-gray" style={{ height: 340 }}>
        {data?.committee?.Committee?.backgroundImage && (
          <Image
            src={data?.committee?.Committee?.backgroundImage?.sourceUrl}
            alt={
              data?.committee?.Committee?.backgroundImage?.altText ||
              data?.committee?.Committee?.backgroundImage?.title
            }
            layout="fill"
            objectFit="cover"
          />
        )}
        <div className="w-200 max-w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-8 border-b-thick-brand-green bg-white">
          {getCommitteeIconsByName(name)}
          <h1 className="mb-5 text-center text-3xl">
            {data?.committee?.Committee?.title || name}
          </h1>
          <Select
            className="w-84"
            defaultValue={committeesOptions[0]}
            onChange={(option) => {
              setCommitteeOption(option);
              if (option?.value) {
                router.push(`/committees/${option.value}`);
              }
            }}
            options={committeesOptions}
            value={committeeOption}
          />
        </div>
      </div>
      <div className="flex justify-center bg-brand-gray mb-12">
        <Link href={`/committees/${slug}`}>
          <a className="w-52 h-15 flex justify-center items-center">OVERVIEW</a>
        </Link>
        <Link href={`/committees/${slug}/work-plans`}>
          <a className="w-52 h-15 flex justify-center items-center">
            WORK PLANS
          </a>
        </Link>
        <Link href={`/committees/${slug}/accomplishments`}>
          <a className="w-52 h-15 flex justify-center items-center">
            ACCOMPLISHMENTS
          </a>
        </Link>
        <Link href={`/committees/${slug}/resources`}>
          <a className="w-52 h-15 flex justify-center items-center">
            RESOURCES
          </a>
        </Link>
        <div className="w-52 h-15 flex justify-center items-center bg-white text-brand-blue">
          CO-CHAIRS
        </div>
        <Link href={`#`}>
          <a className="w-52 h-15 flex justify-center items-center">JOIN</a>
        </Link>
      </div>
      <div className="p-8 border border-solid border-brand-gray mb-20">
        <div
          className="flex items-center px-4 py-6 mb-2 bg-brand-gray-pale"
          style={{ minHeight: 130 }}
        >
          <div className="rounded-full">
            <Image
              src="/images/dan-kennedy.png"
              width={75}
              height={75}
              alt="Dan Kennedy"
            />
          </div>
          <span className="ml-5 mr-2">Dan Kennedy</span>
          <a className="text-brand-blue" href="#">
            Utility and Transportation Contractors Association
          </a>
        </div>
        <div
          className="flex items-center px-4 py-6 mb-2 bg-brand-gray-pale"
          style={{ minHeight: 130 }}
        >
          <div className="rounded-full">
            <Image
              src="/images/larry-levine.png"
              width={75}
              height={75}
              alt="Larry Levine"
            />
          </div>
          <span className="ml-5 mr-2">Larry Levine</span>
          <a className="text-brand-blue" href="#">
            Natural Resources Defense Council
          </a>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  try {
    const { data, errors } = await client.query({
      query: GET_COMMITTEE,
      variables: {
        slug: params?.committee ?? '',
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

    return handleRedirectsAndReturnData(
      defaultProps,
      data,
      errors,
      'committee'
    );
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
      query: GET_COMMITTEES_SLUGS,
    });

    //const committeePages = ['', '/highlights', '/latest-news', '/resources'];
    const pathsData =
      (data?.committees?.nodes &&
        data?.committees?.nodes.reduce((arr, committee) => {
          const slug = committee.slug;
          if (slug) {
            arr.push({ params: { committee: slug } });
          }

          return arr;
        }, [])) ||
      [];

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
