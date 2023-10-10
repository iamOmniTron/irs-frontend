import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateAdmin = ()=>{

    const createAdmin = async (body)=>{
        const url = `admin/lga/create`;
        const {data} = await mutate(url,true,body);
        return data;
    }
    return createAdmin;
}


export const useAdmins = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [admins,setAdmins] = useState([]);
    useEffect(()=>{
        const fetchAdmins = async ()=>{
            setLoading(true);
            const url = `admin/lga/get-all`;
            const {data} = await query(url);
            setAdmins(data);
            setLoading(false);
        }
        fetchAdmins();
    },[flag]);

    return {
        loading,admins
    }
}



// export const useUpdateAdmin = ()=>{
//     const updateAdmin = async (id,body)=>{
//         const url = `admin/update/${id}`;
//         const response = await update(url,body);
//         return response;
//     }
//     return updateAdmin;
// }



export const useDeleteAdmin = ()=>{
    const deleteAdmin = async (id)=>{
        const url = `admin/lga/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteAdmin
}