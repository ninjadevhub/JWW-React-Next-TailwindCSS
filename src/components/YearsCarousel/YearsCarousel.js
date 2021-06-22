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
  sanitize,
} from '../../utils/miscellaneous';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
        className="relative"
        initialSlide={initialSlide}
        slidesPerView={1}
        ref={swiperRef}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          600: {
            slidesPerView: 2.3,
            spaceBetween: 30
          },
          1200: {
            slidesPerView: 3.3,
            spaceBetween: 30
          },
          1700: {
            slidesPerView: 4.3,
            spaceBetween: 30
          },
          2200: {
            slidesPerView: 5.3,
            spaceBetween: 30,
          },
        }}
        //observer={true}
        //observeParents={true}
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
                  style={{ height: 580 }}
                >
                  <h2 className="mb-4 text-3xl-2">{item[name]?.year}</h2>
                  <h3 className="mb-4 text-2xl-2">{item[name]?.heading}</h3>
                  <div className="text-xl" dangerouslySetInnerHTML={{__html: sanitize(item[name]?.description ?? '' )}} />
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
                    style={{ height: 580 }}
                  >
                    <div
                      className="w-full relative bg-brand-gray-pale"
                      style={{ height: 170 }}
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
                      <div dangerouslySetInnerHTML={{__html: sanitize(box.text)}}/>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          });

          return arr;
        }, [])}
        <button
          type="button"
          className="swiper-button-prev w-14 h-14 absolute top-1/2 left-0 z-20 -mt-7 flex justify-center items-center border-none rounded-r-sm bg-white bg-opacity-70 transition-opacity hover:bg-opacity-100"
        >
          <FaChevronLeft size={24} color="#111" />
        </button>
        <button
          type="button"
          className="swiper-button-next w-14 h-14 absolute top-1/2 right-0 z-20 -mt-7 flex justify-center items-center border-none rounded-l-sm bg-white bg-opacity-70 transition-opacity hover:bg-opacity-100"
        >
          <FaChevronRight size={24} color="#111" />
        </button>
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
