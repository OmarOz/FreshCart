import React, { useEffect, useState } from 'react';
import Style from './Products.module.css';
import axios from 'axios';
import {
  useQuery
} from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import {ScaleLoader} from 'react-spinners';
import useProduct from '../../Hooks/useProduct';
import {Helmet} from "react-helmet";

export default function Products() {
  let { data, isError, error, isLoading, isFetching } = useProduct();  

  if (isLoading) {
    return <div className='py-8 w-full flex justify-center items-center min-h-[70vh]'>
      <ScaleLoader
        color="#209b20"
        height={25}
        loading
        width={80}
      />
    </div>
  }
  if (isError) {
    return <div className='py-8 w-full flex justify-center items-center'>
      <h3>{error}</h3>
    </div>
  }
  return <>
  <Helmet>
        <title>Products</title>
        <meta name="description" content="welcome to products page" />
    </Helmet>
    <div className="row min-h-[68vh]">
      {data.map((product) =>
        <div key={product.id} className="w-72 px-2">
          <div className="product py-4">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>

              <img className='w-full' src={product.imageCover} alt={product.title} />
              <span className='block font-light mt-2 text-green-600'>{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(" ").slice(0, 2).join(" ")}....</h3>
              <div className="flex justify-between">
                <span>{product.price} EGP</span>
                <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
              </div>
            </Link>
              <button className="btn my-6">Add to Cart</button>
          </div>
        </div>

      )}

    </div>
  </>
}
