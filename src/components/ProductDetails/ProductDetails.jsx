import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";

export default function ProductDetails() {
    let {addToCart,setCart,cart} = useContext(CartContext);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    let { id,category } = useParams();

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                console.log(data.data);
                setProductDetails(data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    function getRelatedProducts(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts=data.data;
                let related=allProducts.filter((product)=>product.category.name===category); 
                setRelatedProducts(related);
                
            })
            .catch((error) => {
                console.log(error);
            })
    }

    
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

    useEffect(() => {
        getProductDetails(id);
        getRelatedProducts(category);
        window.scrollTo(0, 0)
        
    }

        , [id,category])

    return <>
    <Helmet>
        <title>{productDetails?.title}</title>
        <meta name="description" content="details page of the product" />
    </Helmet>
        <div className="flex flex-col md:flex-row flex-wrap px-4 py-8 items-center justify-center min-h-[68vh]">
            <div className="w-2/4 md:w-1/4">
            <Slider {...settings}>
            {productDetails?.images.map((src)=>
                <img className='w-full' src={src} alt={productDetails?.title} />
                
            )}
            </Slider>
                
                </div>
            <div className="w-3/4 p-6 flex flex-col justify-between">
                <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
                <p className='text-gray-700 font-light'>{productDetails?.description}</p>
                <div className="flex justify-between my-6">
                    <span>{productDetails?.price} EGP</span>
                    <span>{productDetails?.ratingsAverage} <i className='fa-solid fa-star text-yellow-400'></i></span>
                </div>
                <button onClick={()=> {addProductToCart(productDetails._id,productDetails.title)}} className="btn my-6">Add to Cart</button>
            </div>

        </div>
        <div className="row">
        {relatedProducts.map((product) => 
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
                        </Link>
                        <button onClick={()=> {addProductToCart(product.id,product.title)}} className="btn my-6">Add to Cart</button>
                    </div>
                </div>
 
            )}
        </div>
    </>
}
