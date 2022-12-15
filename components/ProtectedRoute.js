import React from 'react';
import jwt from "jsonwebtoken";
import { useRouter } from 'next/router';

const ProtectedRoute = ({children}) => {
    if (typeof window !== 'undefined') {
        const router = useRouter()
        const token = localStorage.getItem("accessToken");
        if (token != null) {
          let jwtSecretKey = "gfg_jwt_secret_key";
          const user = jwt.verify(token, jwtSecretKey);
        if(user.userType != "Admin"){
             router.push('/')
        }
        }else{
             router.push('/')
        }
    }
  
 return children

};

export default ProtectedRoute;