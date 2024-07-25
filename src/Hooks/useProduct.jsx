import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProduct() {

    function getRecent(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }


    let response = useQuery({
        queryKey:['recentProducts'],
        queryFn: getRecent,
        refetchInterval:3000,
        select: (data)=> data.data.data,
        
    })


  return response;
}
