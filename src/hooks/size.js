import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateSize = ()=>{

    const createSize = async (body)=>{
        const url = `size/create`;
        console.log("created")
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createSize;
}


export const useSizes = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [sizes,setSizes] = useState([]);
    useEffect(()=>{
        const fetchSizes = async ()=>{
            setLoading(true);
            const url = `size/get-all`;
            const {data} = await query(url);
            setSizes(data);
            setLoading(false);
        }
        fetchSizes();
    },[flag]);

    return {
        loading,sizes
    }
}



export const useUpdateSize = ()=>{
    const updateSize = async (id,body)=>{
        const url = `size/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateSize;
}



export const useDeleteSize = ()=>{
    const deleteSize = async (id)=>{
        const url = `size/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteSize
}