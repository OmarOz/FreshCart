import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {ScaleLoader} from 'react-spinners';
import useProduct from '../../Hooks/useProduct';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function RecentProducts() {

    let {addToCart,setCart,cart} = useContext(CartContext);

    async function addProductToCart(productId,productTitle){
       const response=await addToCart(productId);
       if(response.data.status==='success'){
        setCart(response.data);
        console.log(cart);
       toast.success(`${productTitle} is successfully added`)
        console.log(data);
        console.log('added');
       }
       else{
        toast.error(`${productTitle} is not successfully added`)
        console.log('error');
    }
    //    console.log(response);
    }

    let { data, isError, error, isLoading, isFetching } = useProduct();   

    if(isLoading){
        return<div className='py-8 w-full h-full flex justify-center items-center'>
        <ScaleLoader
  color="#209b20"
  height={25}
  loading
  width={183}
/>
    </div>
    }
    if(isError){
        return<div className='py-8 w-full flex justify-center items-center'>
            <h3>{error}</h3>
        </div>
    }


    return <>
        <div className="row gap-3">
            {data.map((product) => 
                <div key={product.id} className=" w-72 px-2">
                    <div className="product py-4">
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                        
                        <img className='w-full' src={product.imageCover} alt={product.title} />
                        <span className='block font-light mt-2 text-green-600'>{product.category.name}</span>
                        <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(" ").slice(0,2).join(" ")}....</h3>
                        <div className="flex justify-between">
                            <span>{product.price} EGP</span>
                            <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
                        </div>
                        </Link>
                        <button onClick={()=> {addProductToCart(product.id,product.title)}} className="btn my-6">Add to Cart</button>
                    </div>
                </div>
 
            )}

        </div>
    </>
}
