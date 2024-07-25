import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";
import emptyCat from '../../assets/images/3371471.jpg';

export default function Orders() {
  
  const [useId, setUserId] = useState(null)
  const [orders, setOrders] = useState(null);
  let { setCart } = useContext(CartContext);
  setCart(0);

  let { userdata } = useContext(UserContext);

  async function getUserId() {
    await console.log(await userdata);
    console.log(userdata?.id);
    setUserId(userdata?.id);
  }


  async function getOrders(userId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }


  let { data, isError, error, isLoading } = useQuery({
    queryKey: ['userOrders'],
    queryFn: () => getOrders(userdata.id),
    refetchInterval: 50000,
  });

  useEffect(() => {
    
    getUserId();
    if (data) {
      console.log(data.data[data.data.length - 1]);
      setOrders(data.data[data.data.length - 1]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className='py-8 w-full flex justify-center items-center min-h-[70vh]'>
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



  return <>
  <Helmet>
        <title>Order</title>
        <meta name="description" content="order page" />
    </Helmet>
    
    <div className="container min-h-[68vh]">
    {orders?.length > 0  ?<>
      <div className="my-5 mx-5">
        <div className='text-2xl font-bold text-gray-600'>Payment Method: {orders?.paymentMethodType}</div>
        <div className='my-7'>
          <div className='text-2xl font-bold text-gray-600'>shipping address:</div>
          <div className='text-xl font-bold text-gray-600'>City: {orders?.shippingAddress.city}</div>
          <div className='text-xl font-bold text-gray-600'>Details: {orders?.shippingAddress.details}</div>
          <div className='text-xl font-bold text-gray-600'>Phone: {orders?.shippingAddress.phone}</div>
        </div>
        <div className='text-2xl font-bold text-gray-600'>Total Price: {orders?.totalOrderPrice} EGP</div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              product
            </th>
            <th scope="col" className="px-6 py-3">
              quantity
            </th>
            <th scope="col" className="px-6 py-3">
              price
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.cartItems.map((order) => (

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={order.product.imageCover} alt="Jese image" />
                <div className="ps-3">
                  <div className="text-base font-semibold">{order.product.title}</div>
                  <div className="font-normal text-gray-500">{order.product.category.name}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                {order.count}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {order.price * order.count} EGP
                </div>
              </td>

            </tr>
          ))}

        </tbody>
      </table>
      </>:<>
      <div className="flex justify-center items-center h-full mt-7">
      <img className='w-[500px]' src={emptyCat} alt="empty category" />
    </div>
      </>}
      
    </div>


  </>

}
