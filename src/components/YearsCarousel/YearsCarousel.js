import { useState, useRef } from 'react';
import Image from 'next/image';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  cycle3Colors,
  findYearSlideIndex,
  getSlidesCountForYear,
} from '../../utils/miscellaneous';

SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade, A11y]);

export default function YearsCarousel({ name, data, asc }) {
  const [activeYear, setActiveYear] = useState();
  const [slidesCountPerYear, setSlidesCountPerYear] = useState(1);
  const [activeSlideOffsetForYear, setActiveSlideOffsetForYear] = useState(0);
  //const yearButtonsRef = useRef({});
  const swiperRef = useRef(null);
  const years = [...new Set(data.map((item) => item[name]?.year))];
  const initialSlide = asc ? 0 : findYearSlideIndex(data, name, years[years.length - 1]);

  return (
    <div className="years-carousel">
      <div className="flex justify-evenly border-solid border-b border-brand-gray mb-18">
        {years.map((year) => {
          const slideIndex = findYearSlideIndex(data, [name], year);

          return (
            <button
              key={year}
              className={`p-3 bg-transparent text-xl font-museo year-button year-button-${year}${
                +year === +activeYear
                  ? ' border-solid border-b-5 border-brand-gray'
                  : ' border-none'
              }`}
              type="button"
              onClick={() => {
                swiperRef.current?.swiper?.slideTo(slideIndex);
              }}
            >
              {year}
            </button>
          );
        })}
      </div>
      <Swiper
        initialSlide={initialSlide}
        slidesPerView={4}
        spaceBetween={30}
        ref={swiperRef}
        observer={true}
        observeParents={true}
        onSlideChange={(swiper) => {
          const activeYear = swiper.slides?.[swiper.activeIndex]?.dataset?.year;
          setActiveYear(activeYear);
          const slidesCountPerYear = getSlidesCountForYear(
            data,
            name,
            activeYear
          );
          setSlidesCountPerYear(slidesCountPerYear);
          const slideIndex = findYearSlideIndex(data, name, activeYear);

          setActiveSlideOffsetForYear(swiper.activeIndex - slideIndex);
        }}
      >
        {data.reduce((arr, item, i) => {
          arr.push(
            <SwiperSlide data-year={item[name]?.year}>
              <div className="h-full">
                <div
                  className={`h-full p-10 border-solid border-b-8 border-brand-green bg-${cycle3Colors(
                    i
                  )} text-white`}
                  style={{ maxHeight: '80vh' }}
                >
                  <h2 className="mb-4 text-3xl-2">{item[name]?.year}</h2>
                  <h3 className="mb-4 text-2xl-2">{item[name]?.heading}</h3>
                  <div className="text-xl">{item[name]?.description}</div>
                </div>
              </div>
            </SwiperSlide>
          );

          item[name]?.boxes?.forEach((box) => {
            arr.push(
              <SwiperSlide data-year={item[name]?.year}>
                <div className="h-full">
                  <div
                    className="h-full flex flex-col border-solid border-b-8 border-brand-green"
                    style={{ maxHeight: '80vh' }}
                  >
                    <div
                      className="w-full relative bg-brand-gray-pale"
                      style={{ paddingBottom: '81%' }}
                    >
                      <Image
                        src={box.image?.sourceUrl}
                        layout="fill"
                        objectFit="cover"
                        alt={
                          box.image?.altText
                            ? box.image?.altText
                            : box.image?.title
                        }
                      />
                    </div>
                    <div className="h-full flex-1 overflow-y-auto p-10 bg-brand-gray">
                      <h3 className="mb-4 text-2xl-2">{box.heading}</h3>
                      <div className="">{box.text}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          });

          return arr;
        }, [])}
      </Swiper>
      <div className="w-full relative border-solid border-b border-brand-orange mt-8">
        <div
          className="absolute bg-brand-orange"
          style={{
            width: `${((1 / slidesCountPerYear) * 100).toFixed(2)}%`,
            height: 6,
            top: '-3px',
            left: `${(
              activeSlideOffsetForYear *
              (1 / slidesCountPerYear) *
              100
            ).toFixed(2)}%`,
          }}
        />
      </div>
    </div>
  );
}
