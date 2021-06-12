import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from "react-modal";
import SwiperCore, { Autoplay, Pagination, EffectFade, A11y } from 'swiper';

import client from '../../src/apollo/client';
import Layout from '../../src/components/layout';

import { GET_VIDEOS } from '../../src/queries/videos/get-videos';
import VideoCard from '../../src/components/VideoCard/VideoCard';
import VideoModal from '../../src/components/VideoModal/VideoModal';

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


export default function Videos({ data }) {
  const { nodes: videos } = data?.videos;
  
  const router = useRouter();
  const [currentVideo, setCurrentVideo] = useState(null);
  
  const [videosToShow, setVideosToShow] = useState([])
  const [step, setStep] = useState(1);


  const handleLoadMore = () => {
    const toAdd = videos.slice(step * 6, (step + 1) * 6);
      setVideosToShow(state => [...state, ...toAdd]);
      setStep(step + 1);
  };

  const handleOpenVideoModal = (video) => {
      router.push(`/videos/?videoId=${video.id}`, `/videos/?videoId=${video.id}`);
  };

  const handleCloseVideoModal = () => {
    setCurrentVideo(null);
    router.push('/videos');
  };

  const onShowNextVideo = (videoId) => {
      const currentIndex = videos.findIndex(v => v.id === videoId);
      if(currentIndex < videos.length) {
        const nextVideo = videos[currentIndex + 1];
        if(nextVideo) {
          setCurrentVideo(nextVideo);
          router.push(`/videos/?videoId=${nextVideo.id}`);
        }
      }
  };

  const onShowPrevVideo = (videoId) => {
    const currentIndex = videos.findIndex(v => v.id === videoId);
    if(currentIndex > 0) {
      const prevVideo = videos[currentIndex - 1];
      if(prevVideo) {
        setCurrentVideo(prevVideo);
        router.push(`/videos/?videoId=${prevVideo.id}`);
      }
    }
  };

  useEffect(() => {
    setVideosToShow(state => [...state, ...videos.slice(0, 6)])
  }, [])

  useEffect(() => {
    if(router.query.videoId) {
      const current = videos.find(v => v.id === router.query.videoId);
      setCurrentVideo(current);
    }
  }, [router]);
  
  return (
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
  )
}

export async function getStaticProps(context) {
    const { data, errors } = await client.query({
      query: GET_VIDEOS,
      variables: {
        uri: '/videos/',
      },
    });
  
    const defaultProps = {
      props: {
        data: data || {},
      },
      revalidate: 60,
    };
  
    return defaultProps;
  }
