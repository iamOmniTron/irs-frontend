import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateType = ()=>{

    const createType = async (body)=>{
        const url = `type/create`;
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createType;
}


export const useTypes = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [types,setTypes] = useState([]);
    useEffect(()=>{
        const fetchTypes = async ()=>{
            setLoading(true);
            const url = `type/get-all`;
            const {data} = await query(url);
            setTypes(data);
            setLoading(false);
        }
        fetchTypes();
    },[flag]);

    return {
        loading,types
    }
}



export const useUpdateType = ()=>{
    const updateType = async (id,body)=>{
        const url = `type/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateType;
}



export const useDeleteType = ()=>{
    const deleteType = async (id)=>{
        const url = `type/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteType
}