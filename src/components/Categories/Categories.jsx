import React, { useEffect, useState } from 'react';
import Style from './Categories.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
import emptyCat from '../../assets/images/3371471.jpg';
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';

export default function Categories() {
  let {category} = useParams();
    const [Products, setProducts] = useState(null);
    
    useEffect(()=>{
      window.scrollTo(0, 0)
      refetch()
      
    } , [category]);

    async function getProducts(category) {
      
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
          .then(({ data }) => {
              let allProducts=data.data;
              let related=allProducts.filter((product)=>product.category.name===category); 
              setProducts(related);
              console.log(Products?.length);
              
          })
          .catch((error) => {
              console.log(error);
          })
  }

  let { isLoading, refetch,isFetching} = useQuery({
    queryKey: ['category',category],
    queryFn: ()=>getProducts(category),
    refetchInterval: 50000,
  });
  if (isLoading || isFetching) {
    return (
      <div className='py-8 w-full flex justify-center items-center min-h-[70vh]'>
        <ScaleLoader color="#209b20" height={25} loading width={80} />
      </div>
    );
  }
  

   
  return <>
  <Helmet>
        <title>{category}</title>
        <meta name="description" content="welcome to category page" />
    </Helmet>
  <div className='min-h-[68vh]'>
    {Products?.length > 0 ? <>
      <h1 className='font-bold text-center my-7 text-[50px] md:text-[100px]'>{category}</h1>
    <div className="row gap-3">
        {Products?.map((product) => 
                <div key={product.id} className="w-72 px-2">
                    <div className="product py-4">
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                        
                        <img className='w-full' src={product.imageCover} alt={product.title} />
                        <span className='block font-light mt-2 text-green-600'>{product.category.name}</span>
                        <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(" ").slice(0,2).join(" ")}....</h3>
                        <div className="flex justify-between">
                            <span>{product.price} EGP</span>
                            <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
                        </div>
                        <button className="btn my-6">Add to Cart</button>
                        </Link>
                    </div>
                </div>
 
            )}
        </div>
    </>:<>
    <div className="flex justify-center items-center h-full mt-7">
      <img className='w-[500px]' src={emptyCat} alt="empty category" />
    </div>
    </>}
  
  </div>
    
    </>
}
