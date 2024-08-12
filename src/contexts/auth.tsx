'use client'

import { deleteCookies, setCookies } from "@/app/(auth)/actions";
import { IUser } from "@/models/user.model";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
    user: IUser;
    loading: boolean;
    error: boolean;
    signin(email: string, password: string): Promise<void>;   
    signup(user: IUser): Promise<void>;   
    updateUser(user: IUser): Promise<void>;   
    signout(): Promise<void>;   
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({children, user: initialUser}: {children, user?: IUser}) {
    const router = useRouter();
    const [user, setUser] = useState<IUser>(initialUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const signin = async (email: string, password: string) => {
        try {
            setLoading(true);
            const {user, access_token} = await api.post('auth/login', {email, password}).then(res => res.data);
            if(user && access_token) {
                setUser(user);
                await setCookies('access_token', access_token);
                await setCookies('user', JSON.stringify(user));
                api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
                router.push('/');
            }
        } catch (error) {
            alert('Credenciais inválidas.');
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (user: IUser) => {
        setUser(user);
        await setCookies('user', JSON.stringify(user));
    }

    const signup = async (user: IUser) => {
        try {
            
        } catch (error) {
            
        } finally {

        }
    }
    
    const signout = async () => {
        try {
            await deleteCookies('user');
            await deleteCookies('access_token');
            setUser(null);
        } catch (error) {
            
        } finally {

        }
    }

    return (
        <AuthContext.Provider value={{
            error,
            loading,
            signin,
            signout,
            signup,
            updateUser,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}