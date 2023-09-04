import { useEffect, useState } from "react";
import { query} from "../utils/fetch"


export const useBusinesses = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [businesses,setBusinesses] = useState([]);
    useEffect(()=>{
        const fetchBusinesses = async ()=>{
            setLoading(true);
            const url = `business/get-all`;
            const {data} = await query(url);
            setBusinesses(data);
            setLoading(false);
        }
        fetchBusinesses();
    },[flag]);

    return {
        loading,businesses
    }
}
