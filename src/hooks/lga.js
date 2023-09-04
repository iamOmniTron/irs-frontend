import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateLga = ()=>{

    const createLga = async (body)=>{
        const url = `lga/create`;
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createLga;
}


export const useLgas = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [lgas,setLgas] = useState([]);
    useEffect(()=>{
        const fetchLgas = async ()=>{
            setLoading(true);
            const url = `lga/get-all`;
            const {data} = await query(url);
            setLgas(data);
            setLoading(false);
        }
        fetchLgas();
    },[flag]);

    return {
        loading,lgas
    }
}

export const useLgaCount = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [lgas,setLgas] = useState(0);
    useEffect(()=>{
        const fetchLgas = async ()=>{
            setLoading(true);
            const url = `lgas/count-all`;
            const {data} = await query(url);
            setLgas(data);
            setLoading(false);
        }
        fetchLgas();
    },[flag]);

    return {
        loading,lgas
    }
}



export const useUpdateLga = ()=>{
    const updateLga = async (id,body)=>{
        const url = `lga/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateLga;
}



export const useDeleteLga = ()=>{
    const deleteLga = async (id)=>{
        const url = `lga/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteLga
}