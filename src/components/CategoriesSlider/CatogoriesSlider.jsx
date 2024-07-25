import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";


export default function CatogoriesSlider() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 4,
        initialSlide: 0,
        draggable:false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

    const [categories, setcategories] = useState([])

    function getcategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                setcategories(data.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getcategories();

    }
        , [])
  return (
    <div className="slider-container py-5 mx-7 ">
        <div className="py-4 text-2xl text-gray-800 font-bold">Shop Popular Categories</div>
    <Slider {...settings} >
            {categories?.map((category)=>
            <div className='h-[150px] w-[150px] '>
                <NavLink to={`categories/${category.name}`}>
                <img className='w-[150px] h-[150px] rounded-lg' src={category?.image} alt={category?.name} />
                <h3>{category?.name}</h3>
                </NavLink>
            </div>
                
            )}
            </Slider>
    </div>
  )
}
