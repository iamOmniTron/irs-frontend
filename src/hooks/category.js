import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateCategory = ()=>{

    const createCategory = async (body)=>{
        const url = `category/create`;
        console.log("created")
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createCategory;
}


export const useCategories = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    useEffect(()=>{
        const fetchCategories = async ()=>{
            setLoading(true);
            const url = `category/get-all`;
            const {data} = await query(url);
            setCategories(data);
            setLoading(false);
        }
        fetchCategories();
    },[flag]);

    return {
        loading,categories
    }
}



export const useUpdateCategory = ()=>{
    const updateCategory = async (id,body)=>{
        const url = `category/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateCategory;
}



export const useDeleteCategory = ()=>{
    const deleteCategory = async (id)=>{
        const url = `category/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteCategory
}