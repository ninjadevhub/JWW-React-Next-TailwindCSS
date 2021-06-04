import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaLongArrowAltRight } from "react-icons/fa";




const HomeSlider = ({data}) => {
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
                    data.map((item)=>(
                        <div>
                            <img src={`${item.featuredImage?.node?.sourceUrl}`}/>
                        </div>
                    ))
                }
               
            </Carousel>
            <div>
                <button class="flex flex-row bg-brand-blue items-center	 text-white  py-2 px-4 rounded">
                    RESOURSES
                    <FaLongArrowAltRight
                        color={'white'}
                        className='ml-4'
                        />
                </button>
            </div>
        </div>
    )
}

export default HomeSlider