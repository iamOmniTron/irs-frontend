import { mutate,query } from "../utils/fetch"
import {useState,useEffect} from "react"

export const useLogin = ()=>{
    const login = async (body)=>{
        const url =`login`;
        const {data} = await mutate(url,false,body);
        return data;
    }
    return login;
}


export const useAdminLogin =()=>{
    const loginAdmin = async (body)=>{
        const url = `admin/login`;
        const {data} = await mutate(url,false,body);
        return data;
    };
    return loginAdmin;
}
export const useLGAAdminLogin =()=>{
    const loginAdmin = async (body)=>{
        const url = `lga/admin/login`;
        const {data} = await mutate(url,false,body);
        return data;
    };
    return loginAdmin;
}


export const useRegistration = ()=>{
    const register = async (body)=>{
        const url = `signup`;
        const {data} = await mutate(url,false,body);
        return data;
    };
    return register;
}

export const useResetPassword = ()=>{
    const resetPassword = async (body)=>{
        const url = `password-reset`;
        const {data} = await mutate(url,true,body);
        return data;
    };
    return resetPassword;
}

export const useAdminResetPassword = ()=>{
    const resetPassword = async (id)=>{
        const url = `/admin/password-reset/user/${id}`;
        const response = await mutate(url,true,null);
        return response.message;
    };
    return resetPassword;
};


export const useConfirmOTP = ()=>{
    const confirmOTP = async (id,body)=>{
        const url = `/login/otp/${id}`;
        const {data} = await mutate(url,true,body);
        return data;
    };
    return confirmOTP;
}
export const useAdminConfirmOTP = ()=>{
    const confirmOTP = async (id,body)=>{
        const url = `admin/otp/${id}`;
        const {data} = await mutate(url,true,body);
        return data;
    };
    return confirmOTP;
}
export const useLgaAdminConfirmOTP = ()=>{
    const confirmOTP = async (id,body)=>{
        const url = `lga/admin/otp/${id}`;
        const {data} = await mutate(url,true,body);
        return data;
    };
    return confirmOTP;
}


export const useAdminProfile = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [adminProfile,setAdminProfile] = useState(null);
    useEffect(()=>{
        const fetchAdminProfile = async ()=>{
            setLoading(true);
            const url = `admin/profile`;
            const {data} = await query(url);
            setAdminProfile(data);
            setLoading(false);
        }
        fetchAdminProfile();
    },[flag]);

    return {
        loading,adminProfile
    }
}