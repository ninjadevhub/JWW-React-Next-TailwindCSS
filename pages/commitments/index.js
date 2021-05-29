//import { useRef, useEffect } from 'react';
import client from '../../src/apollo/client';
import { GET_COMMITMENTS_PAGE } from '../../src/queries/pages/get-commitments-page.js';
//import { useRouter } from 'next/router';
import Layout from '../../src/components/layout';
import Button from '../../src/components/buttons';
import Image from 'next/image';
import Link from 'next/link';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { handleRedirectsAndReturnData } from '../../src/utils/slug';
import { sanitize } from '../../src/utils/miscellaneous';
SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade, A11y]);

export default function WorkPlans({ data }) {
  //const router = useRouter();
  //console.log(JSON.stringify({ data: data }));
  /*const swiperRef = useRef(null);
  const scrollRef = useRef(0);
  const timerRef = useRef(null);
  const handleScroll = event => {
    if (scrollRef.current > window.scrollY && swiperRef.current.activeIndex > 0) {
      event.preventDefault();
      swiperRef.current.slidePrev();
    } else if (scrollRef.current < window.scrollY && swiperRef.current.activeIndex < swiperRef.slides.length - 1) {
      event.preventDefault();
      swiperRef.current.slideNext();
    }

    scrollRef.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', event => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setTimeouthandleScroll(event);
      }, 50);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);*/

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
        className="max-w-5xl mx-auto px-4 mb-16"
        dangerouslySetInnerHTML={{
          __html: sanitize(
            data?.page?.workPlansAndCommitments?.commitmentsDescription ?? ''
          ),
        }}
      />
      <div className="flex justify-center mb-16">
        <Button
          color="brand-green"
          style={{ height: '3rem', paddingLeft: '1rem', paddingRight: '2rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', marginRight: '3rem' }}
          uri="#"
        >
          <span className="flex justify-center items-center h-full">
            <Image
              src="/images/plus.png"
              width={28}
              height={28}
              alt="Plus Circle"
            />
            <span className="ml-4 mr-8 border-solid border-l border-white" style={{ height: 40 }}></span>
            ADD YOUR PROJECT
          </span>
        </Button>
        <Button
          color="brand-green"
          style={{ height: '3rem', paddingLeft: '1rem', paddingRight: '2rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
          uri="#"
        >
          <span className="flex justify-center items-center h-full">
            <Image
              src="/images/join.png"
              width={28}
              height={28}
              alt="Join"
            />
            <span className="ml-4 mr-8 border-solid border-l border-white" style={{ height: 40 }}></span>
            JOIN US AT THE ANNUAL CONFERENCE
          </span>
        </Button>
      </div>
      <div
        className="max-w-full border-solid border border-brand-gray p-8"
        style={{ width: 1250 }}
      >
        <div className="p-8 bg-brand-gray-pale">
          <div
            className="relative overflow-hidden"
            style={{ height: 'calc(100vh - 6rem)' }}
          >
            {data?.commitments?.nodes?.length > 0 && (
              <>
                <Swiper
                  direction="vertical"
                  effect="fade"
                  fadeEffect={{
                    crossFade: true,
                  }}
                  navigation={{
                    nextEl: '.vertical-slider-nav-button--next',
                    prevEl: '.vertical-slider-nav-button--prev',
                  }}
                  pagination={{
                    clickable: true,
                    renderBullet: (index, className) =>
                      `<div class="${className} year-slider-nav-button">${
                        [
                          ...new Set(
                            data?.commitments?.nodes
                              ?.map((node) => node.commitment?.year)
                              .sort((a, b) => +b - +a)
                          ),
                        ][index]
                      } <span class="fas fa-chevron-right"></span></div>`,
                  }}
                >
                  {[
                    ...new Set(
                      data?.commitments?.nodes
                        ?.map((node) => node.commitment?.year)
                        .sort((a, b) => +b - +a)
                    ),
                  ].map((year) => (
                    <SwiperSlide>
                      <Swiper
                        //ref={swiperRef}
                        autoplay={{ delay: 5000 }}
                        direction="vertical"
                        effect="fade"
                        fadeEffect={{
                          crossFade: true,
                        }}
                        loop={true}
                        pagination={{
                          clickable: true,
                          renderBullet: (index, className) =>
                            `<div class="${className} committee-slider-nav-button">${
                              data?.commitments?.nodes
                                ?.filter(
                                  (node) => node.commitment?.year === year
                                )
                                ?.sort((a, b) =>
                                  a.title < b.title ? -1 : 1
                                )?.[index]?.title
                            }</div>`,
                        }}
                      >
                        {data.commitments.nodes
                          .filter((node) => node.commitment?.year === year)
                          ?.sort((a, b) => (a.title < b.title ? -1 : 1))
                          ?.map((node2) => (
                            <SwiperSlide>
                              <div className="flex">
                                <div
                                  className="relative flex-grow-0 flex-shrink-0 bg-brand-gray"
                                  style={{
                                    flexBasis: '290px',
                                    maxWidth: 290,
                                    height: 'calc(100vh - 6rem)',
                                  }}
                                >
                                  {node2.commitment?.backgroundImage
                                    ?.sourceUrl && (
                                    <Image
                                      src={
                                        node2.commitment?.backgroundImage
                                          ?.sourceUrl
                                      }
                                      layout="fill"
                                      objectFit="cover"
                                      alt={
                                        node2.commitment?.backgroundImage
                                          ?.altText ??
                                        node2.commitment?.backgroundImage?.title
                                      }
                                    />
                                  )}
                                  <div className="absolute top-20 right-0 transform translate-x-16">
                                    <Link href="#">
                                      <a className="block relative">
                                        <Image
                                          src="/images/blue-circle-with-orange-circle-drop.png"
                                          width={261}
                                          height={261}
                                          alt="Blue circle with orange circle drop"
                                        />
                                        <h3 className="absolute left-1/2 bottom-16 transform -translate-x-1/2 text-center text-white">
                                          GET INVOLVED!
                                        </h3>
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-center py-8 pr-8 pl-28">
                                  <h2 className="mb-5 text-2xl">
                                    {node2.title ?? ''}
                                  </h2>
                                  <div
                                    className="slider-content text-left"
                                    dangerouslySetInnerHTML={{
                                      __html: sanitize(node2.content ?? ''),
                                    }}
                                  />
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  className="vertical-slider-nav-button vertical-slider-nav-button--prev"
                  type="button"
                >
                  <Image
                    src="/images/up-arrow-button.png"
                    width={52}
                    height={52}
                    alt="Up Arrow Button"
                  />
                </button>
                <button
                  className="vertical-slider-nav-button vertical-slider-nav-button--next"
                  type="button"
                >
                  <Image
                    src="/images/down-arrow-button.png"
                    width={52}
                    height={52}
                    alt="Down Arrow Button"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
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
    //console.log({ error: err });
    return {
      props: {
        data: {},
      },
      revalidate: 60,
    };
  }
}
