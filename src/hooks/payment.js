import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreatePayment = ()=>{

    const createPayment = async (body)=>{
        const url = `payment/new`;
        const response = await mutate(url,true,body);
        return response.data;
    }
    return createPayment;
}


export const usePayments = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [payments,setPayments] = useState([]);
    useEffect(()=>{
        const fetchPayments = async ()=>{
            setLoading(true);
            const url = `payment/get-all`;
            const {data} = await query(url);
            setPayments(data);
            setLoading(false);
        }
        fetchPayments();
    },[flag]);

    return {
        loading,payments
    }
}
export const useMyPayments = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [payments,setPayments] = useState([]);
    useEffect(()=>{
        const fetchPayments = async ()=>{
            setLoading(true);
            const url = `payment/my-payments`;
            const {data} = await query(url);
            setPayments(data);
            setLoading(false);
        }
        fetchPayments();
    },[flag]);

    return {
        loading,payments
    }
}
export const useLGAPayments = (lga)=>{
    const [loading,setLoading] = useState(false);
    const [payments,setPayments] = useState([]);
    useEffect(()=>{
        const fetchPayments = async ()=>{
            setLoading(true);
            const url = `payments/lga/${lga}`;
            const {data} = await query(url);
            setPayments(data);
            setLoading(false);
        }
        fetchPayments();
    },[]);

    return {
        loading,payments
    }
}
export const useDistrictPayments = (district)=>{
    const [loading,setLoading] = useState(false);
    const [payments,setPayments] = useState([]);
    useEffect(()=>{
        const fetchPayments = async ()=>{
            setLoading(true);
            const url = `payments/district/${district}`;
            const {data} = await query(url);
            setPayments(data);
            setLoading(false);
        }
        fetchPayments();
    },[]);

    return {
        loading,payments
    }
}

