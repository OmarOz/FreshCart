import React, { useContext, useEffect, useState } from 'react';
import Style from './Home.module.css';
import {CounterContext} from '../../Context/CounterContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import Categories from '../Categories/Categories';
import CatogoriesSlider from '../CategoriesSlider/CatogoriesSlider';
import MainSlider from '../../MainSlider/MainSlider';
import {Helmet} from "react-helmet";

export default function Home() {
  
    
  return <>
  <Helmet>
        <title>Home</title>
        <meta name="description" content="welcome to home page" />
    </Helmet>
  <MainSlider/>
  <CatogoriesSlider/>
    <RecentProducts/>
    
  </>
}
