import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaLongArrowAltRight } from "react-icons/fa";




const HomeSlider = ({resourceData,latestNewsDatat}) => {
  //console.log("dddasdasd",latestNewsDatat)
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
            <Carousel 
            arrows={false}
            responsive={responsive}>
                {
                    resourceData.map((item)=>(
                        <div className="w-full bg-brand-gray" style={{ paddingBottom: '66.67%' }}>
                            <Image
                                src={`${item.featuredImage?.node?.sourceUrl}`}
                                layout="fill"
                                objectFit="cover"
                                alt={item.featuredImage?.node?.altText ? item.featuredImage?.node?.altText : item.featuredImage?.node?.title}
                            />
                        </div>
                    ))
                }
               
            </Carousel>
            <div>
                <Link href="/resources">
                    <button class="flex flex-row bg-brand-blue items-center	 text-white  py-2 px-4 rounded">
                        RESOURSES
                        <FaLongArrowAltRight
                            color={'white'}
                            className='ml-4'
                            />
                    </button>
                </Link>
              
            </div>
            <Carousel 
            arrows={false}
            responsive={responsive}>
                {
                    latestNewsDatat.map((item)=>(
                        <div className="w-full bg-brand-gray" style={{ paddingBottom: '66.67%' }}>
                            <Image
                                src={`${item.featuredImage?.node?.sourceUrl}`}
                                layout="fill"
                                objectFit="cover"
                                alt={item.featuredImage?.node?.altText ? item.featuredImage?.node?.altText : item.featuredImage?.node?.title}
                            />
                        </div>
                    ))
                }
               
            </Carousel>
            <div >
                <Link href="/latest-news">
                    <button class="flex flex-row bg-brand-blue items-center	 text-white  py-2 px-4 rounded">
                        LATEST NEWS
                        <FaLongArrowAltRight
                            color={'white'}
                            className='ml-4'
                            />
                    </button>
                </Link>
              
            </div>
            
        </div>
    )
}

export default HomeSlider