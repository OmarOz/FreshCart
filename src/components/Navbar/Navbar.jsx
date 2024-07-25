import React, { useContext, useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import logo from '../../assets/images/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from "flowbite-react";
import axios from 'axios';

export default function Navbar() {

  let navigate = useNavigate()

  let { userLogin, setUserLogin } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  async function getCategories(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    // .then((res)=> console.log(res))
    // .catch((err)=> console.log(err))

    setCategories(data?.data)
    console.log(data?.data);
  }

  useEffect(()=>{
      getCategories();
  }
    ,[])

  function logout() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/')
  }

  return <>
    <nav className='bg-gray-100 fixed top-0 left-0 right-0 z-50 shadow-md'>
      <div className="container flex-col md:flex-row flex justify-between items-center mx-auto py-4 px-6">
        <div className='flex items-center'>
          <img src={logo} alt="Fresh Cart Logo" className='w-50 md:w-32' />
          <button
            className="md:hidden ml-4 text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <div className={`flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'}  items-center justify-between w-fit md:w-full`}>
          <ul className='flex flex-col my-6 md:my-0 gap-6 md:gap-3 md:flex-row items-center md:space-x-6 md:ms-4'>
            {userLogin && <>
              <li className='text-md text-slate-900 font-normal'><NavLink to={'/'}>Home</NavLink></li>
              <li className='text-md text-slate-900 font-normal relative'>
                <NavLink to={'/cart'}>
                  Cart
                  {(cart?.numOfCartItems !== undefined && cart?.numOfCartItems !== 0) && (
                    <span className='bg-green-600 p-1 text-white w-[25px] h-[25px] rounded-full text-sm block flex justify-center items-center absolute top-[-60%] right-[-60%]'>
                      {cart?.numOfCartItems}
                    </span>
                  )}
                </NavLink>
              </li>
              <li className='text-md text-slate-900 font-normal '><Dropdown label=""  dismissOnClick={false} renderTrigger={() => <span className='cursor-pointer'>Categories <i class="fa-solid fa-circle-chevron-down text-green-600"></i></span>}>
                {categories?.map((category)=>(
                  <NavLink to={`categories/${category.name}`} onClick={toggleMenu}>
                  <Dropdown.Item className=' list-none' >{category.name}</Dropdown.Item>
                  </NavLink>
                ))}
                
              </Dropdown></li>
              <li className='text-md text-slate-900 font-normal'><NavLink to={'/products'}>Products</NavLink></li>
              <li className='text-md text-slate-900 font-normal'><NavLink to={'/allorders'}>Orders</NavLink></li>
            </>}
          </ul>

          <ul className='flex flex-col md:flex-row items-center md:space-x-6 mt-4 md:mt-0'>
            {userLogin === null ? <>
              <li className='text-md text-slate-900 font-normal'><NavLink to={'/login'}>Login</NavLink></li>
              <li className='text-md text-slate-900 font-normal'><NavLink to={'/register'}>Register</NavLink></li>
            </> : <>
              <li onClick={logout} className='text-md text-slate-900 font-normal cursor-pointer'><span>Logout</span></li>
            </>}
            <li className='text-md text-slate-900 font-normal flex space-x-2 my-6 md:my-0'>
              <i className='fab fa-facebook'></i>
              <i className='fab fa-twitter'></i>
              <i className='fab fa-instagram'></i>
              <i className='fab fa-tiktok'></i>
              <i className='fab fa-youtube'></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
}
