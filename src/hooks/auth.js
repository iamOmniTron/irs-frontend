import { mutate } from "../utils/fetch"


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