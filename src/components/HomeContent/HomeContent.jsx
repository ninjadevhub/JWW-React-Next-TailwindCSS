import React from "react"
import Link from 'next/link'
import Image from "next/image"
import { FaChevronRight, FaPlay } from "react-icons/fa";
import ReactPlayer from 'react-player'

import HomeCarusel from "../HomeCarusel/HomeCarusel"
import HomeSlider from "../HomeSlider/HomeSlider";

const HomeContent = ({data}) => {
    const { home: carusel } = data.pageBy;
    const { nodes: resourceData } = data.resources;
    const { nodes: latestNewsData } = data.posts;

    return(
            <div className='flex flex-col justify-center'>
                <HomeCarusel 
                    data={data}
                    carusel={carusel.slide}
                />
                <div className='bg-brand-navy h-32  flex flex-col'>
                    <div className='flex flex-col items-center mt-4 font-nova text-white text-2xl'>
                        <h1>{carusel.sliderBottomHeader}</h1>
                    </div>
                    <div className='flex flex-row mt-4 items-center justify-between text-x font-nova text-white'>
                        <div className='w-64 flex  justify-center items-center'>
                            <Link href={`${carusel.sliderBottomLink1Url}`}>
                                <a className='flex flex-row items-center '>
                                    <span className="mr-2" style={{ width: '52px' }}>{carusel.sliderBottomLink1Text}</span>
                                    <FaChevronRight
                                    className="text-xs self-end"
                                    style={{margin: '0 0 7px -6px'}}
                                    />
                                </a>
                            </Link> 
                        </div>
                        <div className="border-l-2 border-brand-green w-64 flex justify-center items-center">
                                <Link href={`${carusel.sliderBottomLink2Url}`}>
                                     <a className='flex flex-row items-center '>
                                     <span className="mr-2" style={{ width: '52px' }}>{carusel.sliderBottomLink2Text}</span>
                                        <FaChevronRight
                                         className="text-xs self-end"
                                         style={{margin: '0 0 7px -13px'}}
                                        />
                                    </a>
                                </Link> 
                        </div>
                        <div className="border-l-2 border-brand-green w-64 flex justify-center items-center">
                                 <Link href={`${carusel.sliderBottomLink2Url}`}>
                                     <a className='flex flex-row items-center '>
                                     <span className="mr-2" style={{ width: '52px' }}>{carusel.sliderBottomLink3Text}</span>
                                        <FaChevronRight
                                            className='text-xs self-end'
                                            style={{margin: '0 0 7px -13px'}}
                                        />
                                    </a>
                                </Link> 
                        </div>
                        <div className="border-l-2 border-brand-green w-64 flex justify-center items-center">
                            <Link href={`${carusel.sliderBottomLink2Url}`}>
                                <a className='flex flex-row items-center '>
                                    <span className="mr-2" style={{ width: '63px' }}>{carusel.sliderBottomLink4Text}</span>
                                    <FaChevronRight 
                                        className='text-xs self-end' 
                                        style={{margin: '0 0 7px -6px'}}
                                    />
                                </a>
                             </Link> 
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <img src='/images/whats-new.png'/>
                </div>
                
                <HomeSlider  
                    resourceData={resourceData.reverse()}
                    latestNewsData={latestNewsData.reverse()}
                />
                <div className='flex bg-gray-100 px-12 py-6 mt-8'>
                    <div className='flex flex-col flex-1 mr-12'>
                        <div className='font-museo text-gray-500 text-center'>Get Connected with Jersey WaterCheck</div>
                        <div className='mt-6 mb-5'>
                        <ReactPlayer 
                            width={'auto'}
                            height={'253px'}
                            playing
                            playIcon={
                                <div className='rounded-full bg-brand-navy p-2'>
                                    <FaPlay size={30} color={"white"} />
                                </div>
                            }
                            light = {true}
                            url='https://www.youtube.com/watch?v=Qnj-MJlM_e4'
                        />
                        </div>
                        <div className='text-gray-500 font-light text-center text-sm  mb-6'>HAVE YOU FOUND YOUR WATER UTILITY ON JERSEY WATERCHECK?</div>
                        <button className="mt-auto font-light text-white bg-brand-blue py-2 px-8 self-center text-sm">LEARN MORE ABOUT YOUR WATER’S STORY</button>
                    </div>
                    <div className='flex-1 text-white'>
                    <div className='flex bg-brand-orange mb-4 mt-12'>
                        <Image src='/images/woman-washing-cucumbers.png' width={140} height={110}/>
                        <div className='flex flex-1 m-auto flex-col'>
                            <div className='text-center font-museo'>JWW Shared Goals</div>
                            <button className='text-xs mt-1.5 focus:outline-none tracking-wider font-light'>LEARN MORE</button>
                        </div>
                    </div>
                    <div className='flex bg-brand-blue mb-4'>
                        <Image src='/images/senior-man-working-field.png' width={140} height={110}/>
                        <div className='flex flex-1 m-auto flex-col'>
                            <div className='text-center font-museo'>BenchMark Hub</div>
                            <button className='text-xs mt-1.5 focus:outline-none tracking-wider font-light'>LEARN MORE</button>
                        </div>
                    </div>
                    <div className='flex bg-brand-green'>
                        <Image src='/images/closeup-view-cylindrical-grinder-industrial-concept.png' width={140} height={110}/>
                        <div className='flex flex-1 m-auto flex-col'>
                            <div className='text-center font-museo'>System finder</div>
                            <button className='text-xs mt-1.5 focus:outline-none tracking-wider font-light'>LEARN MORE</button>
                        </div>
                    </div>
                </div>
                    
                </div>
            </div>

    )
}

export default HomeContent


