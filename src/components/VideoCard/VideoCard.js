import React, { useMemo } from 'react'
import ReactPlayer from 'react-player'
import { FaCalendarAlt,FaPlay } from 'react-icons/fa';


const VideoCard = ({video, onCardClick}) => {

    const bgColor = useMemo(() => {
        const colors = [
            {a: 'brand-orange', b: 'brand-navy'},
            {a: 'brand-navy', b: 'brand-green'},
            {a: 'brand-blue', b: 'brand-orange'},
            {a: 'brand-green', b: 'brand-blue'}
        ];
        const ind = Math.floor(Math.random() * (4 - 0) + 0);
        return { main: colors[ind].a, icon: colors[ind].b };
    }, []);

    return (
        <div className="flex flex-col p-5px">
            <div>
                <ReactPlayer 
                    width={'auto'}
                    height={200}
                    playing
                    playIcon={
                        <div className='rounded-full bg-brand-navy p-2'>
                            <FaPlay size={30} color={"white"} />
                        </div>
                    }
                    light = {true}
                    url={video.video.video}
                />
            </div>
            
           
            <div 
                className={`flex flex-col justify-center items-center text-white cursor-pointer bg-${bgColor.main} pb-2`}
                style={{ height: 200 }}
                onClick={() => onCardClick(video.video)}
            >
                <div className="text-center flex items-center justify-center flex-grow">
                    <div className="font-museo text-xl px-3">
                        {video.title}
                    </div>
                </div>
              
              <div className="flex flex-col items-center">
                <div className={`rounded-full bg-${bgColor.icon} p-2`}>
                    <FaCalendarAlt />
                </div>

                <div>
                    <p>{video.videoTags.nodes.length ? `#${video.videoTags.nodes[0].name}` : '#events'}</p>
                </div>
              </div>
              
             </div>

        </div>
    )
}

export default VideoCard;