import client from '../../src/apollo/client';
import { GET_WORK_PLANS_PAGE } from '../../src/queries/pages/get-work-plans-page.js';
import Layout from '../../src/components/layout';
import Button from '../../src/components/buttons';
import YearsCarousel from '../../src/components/YearsCarousel/YearsCarousel';
import Image from 'next/image';
import Link from 'next/link';
import { handleRedirectsAndReturnData } from '../../src/utils/slug';
import { sanitize } from '../../src/utils/miscellaneous';

export default function WorkPlans({ data }) {
  const workPlans =
    data?.workPlans?.nodes?.sort((a, b) => {
      if (a.workPlan?.year !== b.workPlan?.year) {
        return +a.workPlan?.year - +b.workPlan?.year;
      }

      return a.workPlan?.committeeName < b.workPlan?.committeeName ? -1 : 1;
    }) ?? [];

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
        <div className="w-200 max-w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-8 bg-white">
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
        <div className="w-52 h-15 flex justify-center items-center bg-white text-brand-blue">
          WORK PLANS
        </div>
        <Link href="/commitments/">
          <a className="w-52 h-15 flex justify-center items-center">
            COMMITMENTS
          </a>
        </Link>
      </div>
      <div
        className="max-w-5xl mx-auto px-4 mb-16"
        dangerouslySetInnerHTML={{
          __html: sanitize(
            data?.page?.workPlansAndCommitments?.workPlansDescription ?? ''
          ),
        }}
      />
      <div className="flex justify-center mb-16">
        <Button
          color="brand-orange"
          className="py-3"
          style={{ width: '24rem', height: '3rem', marginRight: '3rem' }}
          uri="#"
        >
          BECOME A MEMBER
        </Button>
        <Button
          color="brand-orange"
          className="py-3"
          style={{ width: '24rem', height: '3rem' }}
          uri="#"
        >
          ALREADY A MEMBER? JOIN COMMITTEE
        </Button>
      </div>
      <YearsCarousel name="workPlan" data={workPlans} />
      <div className="mt-24 text-center">
        <Link href="/get-involved/">
          <a className="relative inline-block">
            <Image
              src="/images/purple-circle-with-orange-drop.png"
              width={261}
              height={261}
              alt="Get Involved"
            />
            <span className="absolute left-0 bottom-16 w-full text-white">GET INVOLVED!</span>
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data, errors } = await client.query({
      query: GET_WORK_PLANS_PAGE,
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
