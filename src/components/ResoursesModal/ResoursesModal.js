import Link from 'next/link'
import { FaTimes, FaCalendarAlt, FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa'
import { Hits } from 'react-instantsearch-dom'
import ReactPlayer from 'react-player'

import { Facebook, Instagram, Twitter, Youtube } from '../icons'


 const ResoursesModal = ({hit, onNext, onPrev, onClose}) => {
    if(!hit) {
        return null
    }

    return(
        <div className="relative flex flex-col "
        style={{zIndex: 10000}}
        >
            <div className='absolute right-0 -top-4 cursor-pointer' onClick={onClose}>
                <FaTimes
                    color={"white"}
                    size={"50px"}
                    className="border bg-brand-orange rounded-full"
                />
            </div>    
            <div className='flex justify-center bg-gray-200'>
                <div className='flex items-center'>
                    <h2 className='font-novam'>Next Up: Lorem Ipsum Dolar Sit Amet</h2>
                </div>
            </div>
            <div className='flex flex-col pt-4 '>
                <div className="flex justify-center  font-museo text-2xl ">
                    <h3 className='text-center'>{hit.post_title}</h3>
                </div>
                <div className="flex justify-center pt-12">
                    { 
                        <div className='flex flex-row font-museo '>
                            <div className='flex mr-12'>
                            <h2>{hit.date}</h2>

                                <p > {hit.taxonomies_topic}</p>
                            </div>
                            <div>
                                <p> {hit.taxonomies_jww_type}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='flex flex-row justify-center pt-12'>
 
                    <div className="flex w-96" >
                        <h1 className="font-museo">{hit.content}</h1>
                    </div>
                    <div className="flex w-70">
                        <img src={`${hit.images?.full?.url} || ''`}/>
                    </div>
                    
                
            </div>
            <div className='flex flex-row justify-center mt-8'>
                <div className="flex w-96" >
                    <h1>SHARE</h1>
                </div>
                <div className="flex w-70">
                    <button>VIEW RESOURCE</button>
                </div>

            </div>
                
                <div className='flex justify-between pt-6'>
                    <div>
                        <button 
                            className="flex items-center justify-between bg-transparent bg-brand-orange w-40 h-12 px-6 text-white font-semibold py-2 px-4 border border-brand-orange"
                            onClick={() => onPrev(hit.id)}
                        >
                            <div className='border bg-gray-50 rounded-full mr-2'>                               
                                <FaAngleLeft
                                    size={"30"}
                                    color={"black"}
                                />  
                            </div>  
                            <p>Previous</p>
                        </button>     
                    </div>
                    <div>
                        <button 
                            className="flex items-center justify-between bg-transparent bg-brand-orange w-40 h-12 px-6 text-white font-semibold  py-2 px-4 border border-brand-orange"
                            onClick={() => onNext(hit.id)}
                        >
                            <p className='ml-4'>Next</p>
                            <div className='border bg-gray-50 rounded-full ml-2'>
                                <FaAngleRight
                                    size={"30"}
                                    color={"black"}
                                />  
                            </div>  
                         </button>     
                    </div>

                </div>
        </div>

    )
}

export default ResoursesModal