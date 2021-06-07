import React from "react"
import HomeCarusel from "../HomeCarusel/HomeCarusel"
import Link from 'next/link'
import { FaChevronRight,FaTint } from "react-icons/fa";
import HomeSlider from "../HomeSlider/HomeSlider";






const HomeContent = ({data}) => {
    const { home: carusel } = data.pageBy;
    const { nodes: resourceData } = data.resources;
    const { nodes: latestNewsDatat } = data.posts
    console.log('.......-----',data)


    return(
            <div className='flex flex-col justify-center'>

                {carusel.slide.map((item)=>(
                  <div>

                        <HomeCarusel 
                        data={data}
                        carusel={item}
                        />
                      
                  </div>
                ))}
                <div  className='bg-brand-navy h-32  flex flex-col	'>
                    <div className='flex flex-col items-center mt-4 font-nova text-white text-2xl'>
                        <h1>{carusel.sliderBottomHeader}</h1>
                    </div>
                    <div className='flex flex-row mt-4	items-center justify-between text-x font-nova text-white'>
                        <div className='w-64 flex  justify-center items-center'>
                                <Link href={`${carusel.sliderBottomLink1Url}`}>
                                    <a className='flex flex-row items-center '>
                                        {carusel.sliderBottomLink1Text}
                                        <FaChevronRight
                                          className="ml-0.5"
                                        />
                                    </a>
                                </Link> 
                        </div>
                        <div className="border-l-2 border-brand-green w-64 flex justify-center items-center">
                                <Link href={`${carusel.sliderBottomLink2Url}`}>
                                     <a className='flex flex-row items-center '>
                                        {carusel.sliderBottomLink2Text}
                                        <FaChevronRight
z                                         className="ml-0.5"
                                        />
                                    </a>
                                </Link> 

                        </div>
                        <div className="border-l-2 border-brand-green w-64 flex justify-center items-center">
                                 <Link href={`${carusel.sliderBottomLink2Url}`}>
                                     <a className='flex flex-row items-center '>
                                        {carusel.sliderBottomLink3Text}
                                        <FaChevronRight
                                            className='ml-0.5'
                                        />
                                    </a>
                                </Link> 
                        </div>
                        <div className="border-l-2 border-brand-green w-64 flex justify-center items-center">
                                 <Link href={`${carusel.sliderBottomLink2Url}`}>
                                     <a className='flex flex-row items-center '>
                                        {carusel.sliderBottomLink4Text}
                                        <FaChevronRight
                                           className='ml-0.5'
                                        />
                                    </a>
                                </Link> 
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center bg-brand-orange mt-6'>
                    <div className='mt-6 mb-2'>
                        <FaTint
                        color={'blue'}
                        />
                    </div>
                    <div className="font-nova text-white mb-6">
                        <p>{carusel.whatsNewSectionHeading}</p>
                    </div>
                </div>
                
               
                        
                        <HomeSlider  
                        resourceData={resourceData}
                        latestNewsDatat={latestNewsDatat}
                        />
                      

                

            </div>

    )
}

export default HomeContent