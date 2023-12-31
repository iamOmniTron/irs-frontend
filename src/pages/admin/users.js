import { Breadcrumb,Typography,Spin, Button,} from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useContext} from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { RiUserSettingsLine } from "react-icons/ri";
import { useUsers } from "../../hooks/user";
import { useNavigate } from "react-router-dom";


const {Title} = Typography;


const BREADCRUMB_ITEMS = [
    {
        key:1,
        title:(
            <>
                <RxDashboard/>
                Overview
            </>
        )
    },
    {
        key:2,
        title:(
            <>
                <RiUserSettingsLine/>
                Users
            </>
        )
    }
];

const USER_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        render:(_,{firstname,lastname})=>`${firstname} ${lastname}`
    },
    {
        title:"Tax Identity Number (TIN)",
        key:"tin",
        dataIndex:"tin"
    },
    {
        title:"E-mail",
        key:"email",
        dataIndex:"email"
    },
    {
        title:"Home Address",
        key:"address",
        dataIndex:"address"
    },
    {
        title:"Business Name",
        key:"business",
        dataIndex:"Business",
        render:(b)=>b.name
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,user)=><UserEdit user={user}/>
    }
];


function UserEdit({user}){
    const navigate = useNavigate();
    const navigateToUser = ()=>navigate("/admin/user",{state:user})
    return(
        <>
            <Button icon={<EyeOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={navigateToUser}/>
        </>
    )
}




export default function Users(){
    const {flag} = useContext(RefreshContext);

    const {loading,users} =  useUsers(flag);

    const registered = (users ?? []).filter((u)=>u.isConfirmed === true);


    return (
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    Users
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable cols={USER_COLS} data={registered} />
                </Spin>
            </div>
        </>
    )
}