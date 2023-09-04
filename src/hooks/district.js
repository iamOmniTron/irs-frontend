import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateDistrict = ()=>{

    const createDistrict = async (body)=>{
        const url = `district/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createDistrict;
}


export const useDistricts = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [districts,setDistricts] = useState([]);
    useEffect(()=>{
        const fetchDistricts = async ()=>{
            setLoading(true);
            const url = `district/get-all`;
            const {data} = await query(url);
            setDistricts(data);
            setLoading(false);
        }
        fetchDistricts();
    },[flag]);

    return {
        loading,districts
    }
}



export const useUpdateDistrict = ()=>{
    const updateDistrict = async (id,body)=>{
        const url = `district/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateDistrict;
}



export const useDeleteDistrict = ()=>{
    const deleteDistrict = async (id)=>{
        const url = `district/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteDistrict
}