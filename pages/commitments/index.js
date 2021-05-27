import { useState } from 'react';
import client from '../../src/apollo/client';
import { GET_COMMITMENTS_PAGE } from '../../src/queries/pages/get-commitments-page.js';
import { useRouter } from 'next/router';
import Layout from '../../src/components/layout';
import Image from 'next/image';
import Link from 'next/link';
import { handleRedirectsAndReturnData } from '../../src/utils/slug';
import { getCommitteeIconsByName } from '../../src/utils/icons-map';
import { sanitize } from '../../src/utils/miscellaneous';

export default function WorkPlans({ data }) {
  //const router = useRouter();
  console.log(JSON.stringify({data: data}))
  return (
    <Layout data={data}>
      <div className="w-full relative bg-brand-gray" style={{ height: 340 }}>
        {data?.page?.workPlansAndCommitments?.backgroundImage && (
          <Image
            src={
              data?.page?.workPlansAndCommitments?.backgroundImage?.sourceUrl
            }
            alt={
              data?.page?.workPlansAndCommitments?.backgroundImage?.altText ||
              data?.page?.workPlansAndCommitments?.backgroundImage?.title
            }
            layout="fill"
            objectFit="cover"
          />
        )}
        <div className="w-200 max-w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-8 border-b-thick-brand-green bg-white">
          <h1 className="mb-5 text-center text-3xl">{data?.page?.title}</h1>
          <div
            className="md-w-4-5 mx-auto mb-7 text-center"
            dangerouslySetInnerHTML={{
              __html: sanitize(
                data?.page?.workPlansAndCommitments?.description ?? ''
              ),
            }}
          />
        </div>
      </div>
      <div className="flex justify-center bg-brand-gray mb-12">
        <Link href="/work-plans/">
        <a className="w-52 h-15 flex justify-center items-center">
          WORK PLANS
        </a>
        </Link>
          <div className="w-52 h-15 flex justify-center items-center bg-white text-brand-blue">
            COMMITMENTS
          </div>
      </div>
      <div
        className="max-w-5xl mx-auto px-4 mb-20"
        dangerouslySetInnerHTML={{
          __html: sanitize(
            data?.page?.workPlansAndCommitments?.commitmentsDescription ?? ''
          ),
        }}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data, errors } = await client.query({
      query: GET_COMMITMENTS_PAGE,
      variables: {
        uri: '/work-plans-and-commitments/',
      },
    });

    //console.log(JSON.stringify({data: data, errors: errors}))

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

    return handleRedirectsAndReturnData(defaultProps, data, errors, 'page');
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
