import Link from 'next/link'
import { FaTimes, FaCalendarAlt, FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player'

import { Facebook, Instagram, Twitter, Youtube } from '../icons'



 const NewsModal = ({video, onNext, onPrev, onClose}) => {

    if(!video) {
        return null
    }

    return(
        <div className="relative flex flex-col">
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
            <div className='flex flex-col pt-4'>
                <div className="flex justify-center  font-museo text-2xl ">
                    <h3 className='text-center'>{video?.title}</h3>
                </div>
                <div className="flex justify-center pt-2">
                    <div className='rounded-full  border bg-brand-blue p-2'>
                        <FaCalendarAlt
                            color={'white'}
                            size={"20"}
                        />
                    </div>
                </div>
                <div className="flex justify-center pt-2">
                    <h3>#about jersey water works</h3>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className="flex justify-center pt-6">
                    <ReactPlayer
                        // width={900}
                        height={280}
                        playing
                        playIcon={
                            <div className='rounded-full bg-brand-navy p-2'>
                                <FaPlay size={30} color={"white"} />
                            </div>
                        }
                        light={true}
                        // url={video.video.video}
                    />
                </div>
            </div>
                <div className='flex flex-col pt-4 font-museo'>
                    <div className="flex justify-center">
                            <h3 className='text-2xl'>Already a member?Thank You</h3>
                    </div>
                    <div className="flex justify-center pt-4">
                            <h3 className=''>A member but no engaged?
                                <Link href="/">
                                    <a className='text-blue-400'>Recconect!</a>
                                </Link>             
                            </h3>
                    </div>
                    <div className="flex justify-center pt-4">
                            <h3>Not a member?
                                <Link href="/">
                                    <a className='text-blue-400'>Join us!</a>
                                </Link>             
                            </h3>
                    </div>
                    <div className="flex justify-center pt-8">
                            <div className="flex items-center mr-6">
                                <h3 className='font-nova text-2xl'>SHARE</h3>
                            </div>
                            <div className='flex flex-row'>
                                <div className='bg-gray-600 ml-4 p-2 rounded-full'>
                                   <Facebook
                                   />
                                </div>
                                <div className='bg-gray-600 ml-4 p-2 rounded-full'>
                                   <Twitter
                                   />
                                </div>
                                <div className='bg-gray-600 ml-4 p-2 rounded-full'>
                                   <Instagram
                                   />
                                </div>
                                <div className='bg-gray-600 ml-4 p-2 rounded-full'>
                                   <Youtube
                                   />
                                </div>
                            </div>
                    </div>
                </div>
                <div className='flex justify-between pt-6'>
                    <div>
                        <button 
                            className="flex items-center justify-between bg-transparent bg-brand-orange w-40 h-12 px-6 text-white font-semibold py-2 px-4 border border-brand-orange"
                            // onClick={() => onPrev(video.id)}
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
                            // onClick={() => onNext(video.id)}
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

export default NewsModal