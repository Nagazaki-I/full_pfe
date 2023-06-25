import React from 'react'
import Slider from "react-slick";
import { bannerImgOne, bannerImgTwo, bannerImgThree, bannerImgFour, bannerImgFive } from "../../assets/assets";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { display } from '@mui/system';
import "../../app.css" 


const Banner = () => {
    
    return (
        <div className='w-full'>
            <div className='w-full h-full relative'>
                {/* <Slider {...settings}>
                    <div>
                        <img src={bannerImgOne} alt="bannerImgOne" />
                    </div>
                    <div>
                        <img src={bannerImgTwo} alt="bannerImgTwo" />
                    </div>
                    <div>
                        <img src={bannerImgThree} alt="bannerImgThree" />
                    </div>
                    <div>
                        <img src={bannerImgFour} alt="bannerImgFour" />
                    </div>
                    <div>
                        <img src={bannerImgFive} alt="bannerImgFive" />
                    </div>
                </Slider> */}
                <Carousel 
                    useKeyboardArrows={true}
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    emulateTouch
                    stopOnHover
                    showStatus={false}
                >
                    <div>
                        <img src={bannerImgOne} alt="bannerImgOne" />
                    </div>
                    <div>
                        <img src={bannerImgTwo} alt="bannerImgTwo" />
                    </div>
                    <div>
                        <img src={bannerImgThree} alt="bannerImgThree" />
                    </div>
                    <div>
                        <img src={bannerImgFour} alt="bannerImgFour" />
                    </div>
                    <div>
                        <img src={bannerImgFive} alt="bannerImgFive" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Banner