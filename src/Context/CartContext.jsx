import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){

    let headers = {
        token: localStorage.getItem('userToken')
    }
    let[cart,setCart] = useState(0);

    function getCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{ headers})
        .then((response)=> response)
        .catch((error)=>error)
    }
    function removeCartItem(Id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`,{headers})
        .then((response)=> response)
        .catch((error)=>error)
    }
    function updateCartItem(Id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`,{count},{headers})
        .then((response)=> response)
        .catch((error)=>error)
    }

    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId:productId
            }
            ,
            {
                headers
            }
            
        )
        .then((response)=> response)
            .catch((err)=>err)
    }
    function checkout(cartId,url,formvalues){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: formvalues
            }
            ,
            {
                headers
            }
            
        )
        .then((response)=> response)
            .catch((err)=>err)
    }
    function COD(cartId,formvalues){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            {
                shippingAddress: formvalues
            }
            ,
            {
                headers
            }
            
        )
        .then((response)=> response)
            .catch((err)=>err)
    }
    
    async function getCartData(){
        let response = await getCart();
        setCart(response.data);
    }

    useEffect(()=>{
        getCartData();
    }
        ,[])

    return<CartContext.Provider value={{COD,cart,setCart,checkout,addToCart,getCart,removeCartItem,updateCartItem}}>
        {props.children}
    </CartContext.Provider>
}
