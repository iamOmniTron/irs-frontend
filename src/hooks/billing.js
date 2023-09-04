import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateBilling = ()=>{

    const createBilling = async (body)=>{
        const url = `billing/create`;
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createBilling;
}


export const useBillings = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [billings,setBillings] = useState([]);
    useEffect(()=>{
        const fetchBillings = async ()=>{
            setLoading(true);
            const url = `billing/get-all`;
            const {data} = await query(url);
            setBillings(data);
            setLoading(false);
        }
        fetchBillings();
    },[flag]);

    return {
        loading,billings
    }
}



export const useUpdateBilling = ()=>{
    const updateBilling = async (id,body)=>{
        const url = `billing/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateBilling;
}



export const useDeleteBilling = ()=>{
    const deleteBilling = async (id)=>{
        const url = `billing/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteBilling
}