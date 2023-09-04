import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateInvoice = ()=>{

    const createInvoice = async (body)=>{
        const url = `invoice/create`;
        const response = await mutate(url,true,body);
        return response.data;
    }
    return createInvoice;
}


export const useInvoices = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [invoices,setInvoices] = useState([]);
    useEffect(()=>{
        const fetchInvoices = async ()=>{
            setLoading(true);
            const url = `invoice/get-all`;
            const {data} = await query(url);
            setInvoices(data);
            setLoading(false);
        }
        fetchInvoices();
    },[flag]);

    return {
        loading,invoices
    }
}
export const useMyInvoices = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [invoices,setInvoices] = useState([]);
    useEffect(()=>{
        const fetchInvoices = async ()=>{
            setLoading(true);
            const url = `invoice/my-invoices`;
            const {data} = await query(url);
            setInvoices(data);
            setLoading(false);
        }
        fetchInvoices();
    },[flag]);

    return {
        loading,invoices
    }
}

