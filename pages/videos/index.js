import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa';
import Image from 'next/image';
import Modal from "react-modal";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SwiperCore, { Autoplay, Pagination, EffectFade, A11y } from 'swiper';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import client from '../../src/apollo/client';
import Layout from '../../src/components/layout';

import { GET_VIDEOS, GET_VIDEO_TAGS, GET_VIDEOS_WITH_TAGS } from '../../src/queries/videos/get-videos';
import VideoCard from '../../src/components/VideoCard/VideoCard';
import VideoModal from '../../src/components/VideoModal/VideoModal';
import VideoSlider from '../../src/components/VideoSlider/VideoSlider';

SwiperCore.use([Autoplay, Pagination, EffectFade, A11y]);


Modal.setAppElement('#__next');



const modalStyles = {
  content: {
    position: 'fixed',
    border: '0',
    borderRadius: '4px',  
    width: '1250px',
    padding: '1rem',
    top: '4%',
    margin: '0 auto'
  }
};


export default function Videos({ data, tags, detailedVideosData }) {
  // const { nodes: videos } = data?.videos;

  const { nodes: videos } = detailedVideosData?.videos;

  const tagsArray = tags.videoTags.nodes.map(el => el.name)
  const featuredVideos = videos.filter(video => {
    if(video.videoTags.nodes.length) {
      return video.videoTags.nodes[0].name === 'featured'
    }
  })
  const videosNotFeatured = videos.filter(video => !featuredVideos.includes(video))
   
  const router = useRouter();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videosToShow, setVideosToShow] = useState([])
  const [step, setStep] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLoadMore = () => {
    const toAdd = videos.slice(step * 6, (step + 1) * 6);
      setVideosToShow(state => [...state, ...toAdd]);
      setStep(step + 1);
  };

  const handleOpenVideoModal = (video) => {
      router.push(`/videos/?videoId=${video.videoId}`, `/videos/?videoId=${video.videoId}`);
  };

  const handleCloseVideoModal = () => {
    setCurrentVideo(null);
    router.push('/videos');
  };

  const onShowNextVideo = (videoId) => {
      const currentIndex = videos.findIndex(v => v.videoId === videoId);
      if(currentIndex < videos.length) {
        const nextVideo = videos[currentIndex + 1];
        if(nextVideo) {
          setCurrentVideo(nextVideo);
          router.push(`/videos/?videoId=${nextVideo.videoId}`);
        }
      }
  };

  const onShowPrevVideo = (videoId) => {
    const currentIndex = videos.findIndex(v => v.videoId === videoId);
    if(currentIndex > 0) {
      const prevVideo = videos[currentIndex - 1];
      if(prevVideo) {
        setCurrentVideo(prevVideo);
        router.push(`/videos/?videoId=${prevVideo.videoId}`);
      }
    }
  };

  useEffect(() => {
    setVideosToShow(state => [...state, ...videos.slice(0, 6)])
  }, [])

  useEffect(() => {
    if(router.query.videoId) {
      const current = videos.find(v => v.video.videoId === router.query.videoId);
      setCurrentVideo(current);
    }
  }, [router]);
  
  return (
    <>
    <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
    </Head>
    <Layout data={data}>
        	<Modal 
            isOpen={!!currentVideo}
            onRequestClose={handleCloseVideoModal}
            contentLabel="Video modal Title"
            style={modalStyles}
          >   
            <VideoModal 
              video={currentVideo} 
              onNext={onShowNextVideo}
              onPrev={onShowPrevVideo}
              onClose={handleCloseVideoModal}
            />
          </Modal>

        <VideoSlider featuredVideos={featuredVideos} />
          <div className='text-brand-navy'>
            <div className='flex justify-center mb-4'>
              <Image src='/images/video-page-youtube-icon.png' width={40} height={40} />
            </div>
            <div className='text-center font-museo text-2xl'>Subscribe to YouTube Channel</div>
            <div className='flex justify-center relative mt-6 mb-10'>
            <button 
              className='flex justify-between w-64 bg-gray-200 py-2 px-4 focus:outline-none'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>Show Me</span>
              {showDropdown ? <BsChevronUp className='mt-1'/> : <BsChevronDown className='mt-1'/>}
            </button>
            {showDropdown && (
               <div 
               className='absolute flex flex-col bg-gray-100 w-64 top-10 z-10 py-1.5' 
               style={{
                 boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
               }}
             >
               <button className='text-left focus:outline-none hover:bg-gray-200 px-6 py-1.5'>#all</button>
               {tagsArray.map(tag => (
                 <button key={tag} className='text-left focus:outline-none hover:bg-gray-200 px-6 py-1.5'>#{tag}</button>
               ))}
             </div>
            )}
             
            </div>
          </div>
          <div>
              <div className="grid grid-cols-3 gap-y-6 gap-x-12">
                  {
                      videosToShow.length > 0 && 
                      videosToShow.map((video, i) => (
                        <VideoCard 
                            key={`video-item-${i}`} 
                            video={video}
                            onCardClick={handleOpenVideoModal}
                        />
                      ))
                  }
              </div>
              <div className="pt-12 flex justify-center">
                {
                  (step * 6) >= videos.length
                  ?
                  null
                  :
                  <button 
                    onClick={handleLoadMore}
                    className="bg-transparent font-museo text- w-60 h-12 px-6 text-brand-navy   py-2 px-4 border border-brand-navy"
                  >
                   LOAD MORE VIDEOS
                  </button>     
                }
              </div>
                 
           </div>
         

      </Layout>
    </>
      
  )
}

export async function getStaticProps(context) {
    const { data } = await client.query({
      query: GET_VIDEOS,
      variables: {
        uri: '/videos/',
      },
    });

    const { data: allTagsData } = await client.query({
      query: GET_VIDEO_TAGS,
      variables: {
        uri: '/videos/',
      },
    });

    const { data: videosWithTags } = await client.query({
      query: GET_VIDEOS_WITH_TAGS,
      variables: {
        uri: '/videos/',
      },
    });

    const defaultProps = {
      props: {
        data: data || {},
        tags: allTagsData || {},
        detailedVideosData: videosWithTags || {}
      },
      revalidate: 60,
    };
  
    return defaultProps;
  }
