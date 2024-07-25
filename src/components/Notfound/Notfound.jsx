import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import notFound from '../../assets/images/error.svg'
import {Helmet} from "react-helmet";

export default function Notfound() {
    
  return <>
  <Helmet>
        <title>Error</title>
        <meta name="description" content="Error page" />
    </Helmet>
  <div className="container flex justify-center items-center h-[68vh]">
      <img src={notFound} alt="" />
  </div>
    </>
}
