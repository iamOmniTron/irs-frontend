import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateTax = ()=>{

    const createTax = async (body)=>{
        const url = `tax/create`;
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createTax;
}


export const useTaxes = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [taxes,setTaxes] = useState([]);
    useEffect(()=>{
        const fetchTaxs = async ()=>{
            setLoading(true);
            const url = `taxes/get-all`;
            const {data} = await query(url);
            setTaxes(data);
            setLoading(false);
        }
        fetchTaxs();
    },[flag]);

    return {
        loading,taxes
    }
}



export const useUpdateTax = ()=>{
    const updateTax = async (id,body)=>{
        const url = `tax/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateTax;
}



export const useDeleteTax = ()=>{
    const deleteTax = async (id)=>{
        const url = `tax/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteTax
}