import {create} from "zustand";
import {persist,createJSONStorage} from "zustand/middleware"
import { query } from "../utils/fetch";


export const getUserProfile = async ()=>{
    const profileEndpoint = 'get-current-user';
    const {data} = await query(profileEndpoint);
    return data;
}
export const getAdminProfile = async ()=>{
    const profileEndpoint = 'admin/profile';
    const {data} = await query(profileEndpoint);
    return data;
}


export const userStore = create(
    persist((set,get)=>({
                user:{},
                setUser: (profile)=>set(()=>({user:{...profile}})),
                logout: ()=>set(()=>({user:{}})),
                getUser: ()=>get().user
    }),
    {
        name:"revenue-app-key",
        storage:createJSONStorage(()=>sessionStorage)
    })
)