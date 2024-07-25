
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Checkout() {
  let navigate = useNavigate();

    let [cartId,setCartId] = useState(null); 
    let [paymentMethod,setPaymentMethod] = useState(""); 
    let {checkout,getCart,COD} =useContext(CartContext);
    
    async function getCartId(){
        let response = await getCart();
        console.log(response?.data?.data?._id);
        setCartId(response?.data?.data?._id);
    }
    
    useEffect(()=>{
        getCartId()
    }
        ,[])

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: ()=>{
      if(paymentMethod==='online'){
        handleCheckout(cartId,'http://localhost:5173')
      }
      else{handleCheckoutCOD(cartId)}
    },
  })

  

 async function handleCheckout(cartId,url) {
    let {data} = await checkout(cartId,url,formik.values)
    if(data.status==='success'){
        window.location.href=data.session.url
        // console.log(data);
    }
  }
 async function handleCheckoutCOD(cartId) {
    let {data} = await COD(cartId,formik.values)
    if(data.status==='success'){
        console.log(data);
        // window.location.reload();
        navigate('/allorders');
    }
  }

  return <>
   <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
    </Helmet>
<div className="container flex justify-center items-center min-h-[68vh]">
<div  className='py-6 mx-auto max-w-xl w-[80%]'>
  

  <h2 className='font-bold text-2xl text-green-600 mb-6'>Checkout</h2>
<form onSubmit={formik.handleSubmit}>
  

  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
  </div>

  

  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
  </div>



  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
  </div>


  
  

<div className="buttons flex justify-center gap-5 py-7">
  <button onClick={()=>setPaymentMethod('cash')} type='submit' className="px-4 py-2 w-fit rounded-lg text-white bg-green-600 my-6">Cash on delivery</button>
  <button onClick={()=>setPaymentMethod('online')} type='submit' className="px-4 py-2 w-fit rounded-lg text-white bg-green-600 my-6">Pay online</button>
</div>
</form>
</div>
</div>
 

</>
}
