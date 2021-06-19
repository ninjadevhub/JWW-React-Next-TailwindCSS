import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa';
import clsx from 'clsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import { applySliderLeftBtnStyles, applySliderRightBtnStyles, applySliderCardStyles } from './utils'
import styles from './VideoSlider.module.scss'

const VideoCard = ({ video, index, centerIndex, totalVideos }) => {

    return (
        <div key={video.videoId} 
            className={clsx(
                styles.slider_item,
                centerIndex === 0 && index === (totalVideos - 1) && styles.video_left,
                centerIndex === (index + 1) && styles.video_left,
                centerIndex === (index - 1) && styles.video_right,
                centerIndex === (totalVideos - 1) && index === 0 && styles.video_right
            )} 
        >
           <ReactPlayer 
              width={'auto'}
              height={200}
              playing={index === centerIndex}
              playIcon={
                <div className={styles.video_icon}>
                    <FaPlay size={25} color={"white"} />
                </div>
              }
            light = {true}
            url={video.video.video}
            
          />
          <div className="absolute focus:outline-none bg-brand-green text-white bottom-2.5 left-2.5 px-3 py-0.5">FEATURED</div>
        </div>
    )
}

const VideoSlider = ({featuredVideos}) => {
    const moreVideos = [
        {
            videoID: "1",
            video: {
            video: "https://www.youtube.com/watch?v=Qnj-MJlM_e4"
            }
        },
        {
            videoID: "2",
            video: {
            video: "https://www.youtube.com/watch?v=NzKgr0Ov7vY"
            }
        }
    ]

    featuredVideos = [...featuredVideos, ...moreVideos]

    const [currentIndex, setCurrentIndex] = useState(0);
    let centerIndex = currentIndex + 1;
    if(currentIndex === featuredVideos.length - 1) {
        centerIndex = 0
    } 

    var settings = {
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const previousBtn = document.getElementsByClassName('slick-prev ')
        const nextBtn = document.getElementsByClassName('slick-next')
        const videoCards = document.getElementsByClassName('slick-slide');
        if (previousBtn.length) {
            applySliderLeftBtnStyles(previousBtn[0])
        }
        if (nextBtn.length) {
            applySliderRightBtnStyles(nextBtn[0])
        }
        if (videoCards.length) {
            applySliderCardStyles(videoCards)
            console.clear()
        }
    })

  return (
    <div className='mt-16 mb-12' >
        <Slider 
            {...settings}
            prevArrow={<IoIosArrowBack color='#000'/>}
            nextArrow={<IoIosArrowForward color='#000'/>}
            beforeChange={(_oldIndex, newIndex) => {
                setCurrentIndex(newIndex) 
            }} 
            className='px-8 lg:px-20'
        >
        {featuredVideos.map((video, index) => (
            <VideoCard key={video.videoId} video={video} index={index} centerIndex={centerIndex} totalVideos={featuredVideos.length} />
        ))}
    </Slider>
    </div>
    
  );
}

export default VideoSlider