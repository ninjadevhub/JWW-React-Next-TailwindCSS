import React, { Component } from 'react';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import { FaPlayCircle } from "react-icons/fa";

class HomeCarusel extends Component {

    render() {

        const carusel = this.props.carusel
        const data = this.props.data.pageBy.home

        return (
            <Carousel 
                    showThumbs={false}
                    showArrows={true}
                    showStatus={false}
                >

                {carusel.map((item, index)=> (
                  <div key={index} className='flex flex-col w-100 bg-cover'
                  style={{
                          backgroundImage: `url(${item.slideImage?.sourceUrl})`,
                          width:'100%',
                          height:'450px'
                      }}
                      >
                  <div className='flex flex-col items-center w-full justify-center '>
                      <div className="flex pt-12 w-3/4 font-museo text-white text-2xl">
                          <p>Lorem 
                              Ipsum 
                              is 
                              simply
                              dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                          </p>
                      </div>
                      <div  className="flex pt-12 font-museo text-white flex pt-12 w-3/4">
                          <p>
                              psum 
                              is 
                              simply
                              dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                          </p>
                      </div>
                      
                  </div>

                  <div className="flex  justify-center font-museo text-white pt-20 ">
                      
                      <div className='pr-12'>
                          <button className="flex flex-row bg-brand-blue items-center	 text-white  py-2 px-4 rounded">
                                  <FaPlayCircle className="mr-2" />
                              <span>{item.button1Text}</span>
                          </button>
                      </div>
                      <div>
                          <button className="flex flex-row bg-brand-blue items-center	 text-white  py-2 px-4 rounded">
                              <span>{item.button2Text}</span>
                          </button>
                      </div>
                         
                      
                  </div>
              </div>
                ))}

                    
                    
              
            </Carousel>
        );
    }
};

export default HomeCarusel