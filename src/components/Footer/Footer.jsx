import React, { useEffect, useState } from 'react';
import Style from './Footer.module.css';
import { NavLink } from 'react-router-dom';


export default function Footer() {

  return <>

    <footer className="bg-green-600 shadow ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"> 
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">FreshCart</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-200 sm:mb-0">
            <li>
            <NavLink className='hover:underline me-4 md:me-6' to={'/about'}> About </NavLink>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center">© 2024 <a href="" className="hover:underline">FreshCart™</a>. All Rights Reserved.</span>
      </div>
    </footer>

  </>
}
