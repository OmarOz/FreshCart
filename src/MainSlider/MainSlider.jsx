import React from 'react'
import imageSlider1 from '../../../finalProject assets/finalProject assets/images/slider-image-1.jpeg'
import imageSlider2 from '../../../finalProject assets/finalProject assets/images/slider-image-2.jpeg'
import imageSlider3 from '../../../finalProject assets/finalProject assets/images/slider-image-3.jpeg'
import imageSlider4 from '../../../finalProject assets/finalProject assets/images/grocery-banner-2.jpeg'
import imageSlider5 from '../../../finalProject assets/finalProject assets/images/grocery-banner.png'
import Slider from "react-slick";

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return <>
  <div className="row gap-7">
    <div className="w-fit flex justify-end items-center rounded-xl overflow-hidden h-fit">

    <Slider className='w-[742px] rounded-xl' {...settings}>
    <img className='rounded-xl w-[842px]' src={imageSlider1} alt="" />
    <img className='rounded-xl' src={imageSlider2} alt="" />
  
            </Slider>
    
    </div>
    <div className="w-1/4 l overflow-hidden hidden xl:block">
    <img className=' rounded-t-xl' src={imageSlider3} alt="" /> 
    <img className='rounded-b-xl' src={imageSlider2} alt="" />
    
    </div>
    
  </div>
  </>
}
