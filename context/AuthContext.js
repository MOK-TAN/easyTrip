"use client";

import { createContext, useContext, useState } from "react";

import {useRouter} from 'next/navigation';


const AuthContext = createContext();


export function AuthProvider({children}){
    const [ user,setUser] = useState(false);

    const router = useRouter();

    const login = () => {
        setUser(true);
    }

    const logout = () => {
        setUser(false);
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}