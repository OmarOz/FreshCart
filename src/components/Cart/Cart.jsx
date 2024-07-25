import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/empty_cart.png';
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import {Helmet} from "react-helmet";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  let { getCart, removeCartItem, updateCartItem, setCart } = useContext(CartContext);

  async function removeItem(id) {
    let response = await removeCartItem(id);
    setCartDetails(response.data);
    setCart(response.data);
    console.log(response);
  }

  async function updateItem(id, count) {
    if (count === 0) {
      toast.error('You cannot decrease item below 1');
      return;
    }
    let response = await updateCartItem(id, count);
    setCartDetails(response.data);
    console.log(response);
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ['cartDetails'],
    queryFn: getCart,
    refetchInterval: 50000,
  });

  useEffect(() => {
    if (data) {
      setCartDetails(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className='py-8 w-full flex justify-center items-center min-h-[68vh]'>
        <ScaleLoader color="#209b20" height={25} loading width={80} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='py-8 w-full flex justify-center items-center min-h-[68vh]'>
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <>
    <Helmet>
        <title>Cart</title>
        <meta name="description" content="cart page" />
    </Helmet>
      {cartDetails?.numOfCartItems > 0 ? (
        <>
          <div className="my-10 relative overflow-x-auto shadow-md sm:rounded-lg min-h-[68vh]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.data.products.map((product) => (
                  <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button onClick={() => updateItem(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div>
                          <span id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{product.count}</span>
                        </div>
                        <button onClick={() => updateItem(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span onClick={() => { removeItem(product.product.id) }} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="button px-9">
            <Link to={'/checkout'}>
              <button className="px-4 py-2 w-full rounded-lg text-white bg-green-600 my-6">Add to Cart</button>
            </Link>
          </div>
        </>
      ) : (
        <div className='min-h-[68vh] flex flex-col justify-center items-center'>
          <img className='w-[300px]' src={emptyCart} alt="" />
          <h1 className='text-green-600 text-[50px] font-bold'>Your cart is empty</h1>
        </div>
      )}
    </>
  );
}
