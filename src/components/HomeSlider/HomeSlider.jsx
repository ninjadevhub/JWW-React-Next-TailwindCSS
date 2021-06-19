import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaLongArrowAltRight } from "react-icons/fa";

const HomeSlider = ({resourceData,latestNewsData}) => {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return(
        <div>
            <Carousel arrows={true} responsive={responsive}>
                {resourceData.map((item, index)=> (
                    <div key={index} className="w-full bg-brand-gray" style={{ paddingBottom: '66.67%' }}>
                        <Image
                            src={item.featuredImage ? `${item.featuredImage?.node?.sourceUrl}`: '/images/image-placeholder.png'}
                            layout="fill"
                            objectFit="cover"
                            alt={item.featuredImage ? item.featuredImage?.node?.altText : item.featuredImage?.node?.title}
                        />
                        <div className="m-1.5 inline-block">
                            <Image src='/images/new.png' width={30} height={30} />
                        </div>
                    </div>
                   )  
                )}
            </Carousel>
            <div className="mt-2 mb-8 flex" >
                <Link href="/resources">
                    <button className="flex flex-row bg-brand-blue items-center text-white py-2 px-4">
                        RESOURCES
                        <FaLongArrowAltRight
                            color={'white'}
                            className='ml-4'
                            />
                    </button>
                </Link>
              <div className='relative bg-brand-orange flex-1 self-center h-px ml-6'>
                  <div 
                    className='absolute h-2 bg-brand-orange'
                    style={{
                        height: '5px',
                        width: `calc(100%/${resourceData.length})`,
                        top: '-2px',
                    }} 
                    />
              </div>
            </div>
            <Carousel arrows={true} responsive={responsive}>
                {latestNewsData.map((item, index)=> (
                        <div key={index} className="w-full bg-brand-gray" style={{ paddingBottom: '66.67%' }}>
                            <Image
                                src={item.featuredImage ? `${item.featuredImage?.node?.sourceUrl}` : '/images/image-placeholder.png'}
                                layout="fill"
                                objectFit="cover"
                                alt={item.featuredImage?.node?.altText ? item.featuredImage?.node?.altText : item.featuredImage?.node?.title}
                            />
                            <div className="m-1.5 inline-block">
                                <Image src='/images/new.png' width={30} height={30} />
                            </div>
                        </div>
                    ) 
                )}
            </Carousel>
            <div className='flex' >
                <Link href="/latest-news">
                    <button className="flex flex-row bg-brand-blue items-center	text-white py-2 px-4 mt-2">
                        LATEST NEWS
                        <FaLongArrowAltRight
                            color={'white'}
                            className='ml-4'
                            />
                    </button>
                </Link>
                <div className='relative bg-brand-orange flex-1 self-center h-px ml-6'>
                  <div 
                    className='absolute h-2 bg-brand-orange'
                    style={{
                        height: '5px',
                        width: `calc(100%/${resourceData.length})`,
                        top: '-2px',
                    }} 
                    />
              </div>
            </div>
            
        </div>
    )
}

export default HomeSlider