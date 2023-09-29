import { useEffect, useState } from "react";
import { mutate, query, update, upload} from "../utils/fetch"



export const useUsers = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const getUsers = async ()=>{
            setLoading(true)
            const url = `user/get-all`;
            const {data} = await query(url);
            console.log(data);
            setUsers(data);
            setLoading(false);
        }
        getUsers();
    },[flag]);
    return {
        loading,users
    }
}



export const useRegisterUser = ()=>{
    const register = async (payload)=>{
        const url = `signup`;
        const {message} = await mutate(url,true,payload);
        return message;
    }
    return register;
}


export const useUploadImage = ()=>{
    const uploadImage = async (payload)=>{
        const url = `user/update-image`;
        const {message}= await upload(url,true,payload);
        return message;
    };
    return uploadImage;
}