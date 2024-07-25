import React, { useContext, useEffect, useState } from 'react';
import Style from './Login.module.css';
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import {Helmet} from "react-helmet";

export default function Login() {
  const [apiError, setapiError] = useState('');
  let{setUserLogin}=useContext(UserContext);

  let Navigate = useNavigate();
   

  // let validationSchema=Yup.object().shape({
  //   email:Yup.string().email('email is invalid').required('email is required'),
  //   password:Yup.string().matches(/[A-Z][a-z0-9]{5,10}$/,'phone must start with uppercase').required('password is requierd'),
    
  // })

  const api = `https://ecommerce.routemisr.com/api/v1/auth/signin`;

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    // validationSchema,
  })

  

 function handleLogin(values) {
    axios.post(api, values)
      .then((apiRespons) => {
        if (apiRespons?.data?.message === 'success') {
          localStorage.setItem('userToken', apiRespons.data.token)
          setUserLogin(apiRespons.data.token)
          Navigate('/');
          console.log(apiRespons);
        }
      }).catch((apiRespons) => {
        console.log(apiRespons);
        setapiError(apiRespons?.response?.data.message)
      })
  }

  return <>
  <Helmet>
        <title>Login</title>
        <meta name="description" content="welcome to login page" />
    </Helmet>

  <div  className='py-6 mx-auto max-w-xl min-h-[68vh]'>

  {apiError && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
      </div>}
  

      <h2 className='font-bold text-2xl text-green-600 mb-6'>Login</h2>
    <form onSubmit={formik.handleSubmit}>
      

      <div class="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="text" name="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
      </div>
      {/* {formik.errors.email && formik.touched.email &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>} */}


      

      <div class="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
      </div>
      {/* {formik.errors.password && formik.touched.password &&
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>} */}

      
      

      <button type='submit' className="btn my-6">Login</button>
    </form>
    </div>

</>
}
