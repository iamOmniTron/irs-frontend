import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateGto = ()=>{

    const createGto = async (body)=>{
        const url = `gto/create`;
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createGto;
}


export const useGtos = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [gtos,setGtos] = useState([]);
    useEffect(()=>{
        const fetchGtos = async ()=>{
            setLoading(true);
            const url = `gto/get-all`;
            const {data} = await query(url);
            setGtos(data);
            setLoading(false);
        }
        fetchGtos();
    },[flag]);

    return {
        loading,gtos
    }
}



export const useUpdateGto = ()=>{
    const updateGto = async (id,body)=>{
        const url = `gto/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateGto;
}



export const useDeleteGto = ()=>{
    const deleteGto = async (id)=>{
        const url = `gto/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteGto
}