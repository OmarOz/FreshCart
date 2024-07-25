import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let UserContext = createContext();

export default function UserContextProvider(props){
    const [userLogin,setUserLogin]=useState(null);
    const [userdata,setUserData]=useState(null);

    useEffect(()=>{
        if(localStorage.getItem('userToken')!==null){
            setUserLogin(localStorage.getItem('userToken'));
            setUserData(jwtDecode(localStorage.getItem('userToken')));
        }
    }
    ,[])

    return(
    <UserContext.Provider value={{userLogin, userdata ,setUserLogin}}>
        {props.children}
    </UserContext.Provider>
    )
}