
      import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';



class HomeCarusel extends Component {


    render() {


        const data = this.props.carsuel
        console.log('asdsad',data)
        return (
            <Carousel 
                showThumbs={false}
                showArrows={false}
                showStatus={false}
            >
                <div  className='flex w-100'
                    style={{
                            backgroundImage: `url(${data.slideImage.sourceUrl})`,
                            width:'850px',
                            height:'450px'
                           }}
                        >
                    <div >
                        <p>asdsa</p>
                    </div>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                </div>
            </Carousel>
        );
    }
};

export default HomeCarusel