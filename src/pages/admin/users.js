import { Breadcrumb,Typography,Spin, Button, Modal, Form, Input, message, Space } from "antd"
import { FaMapLocationDot } from "react-icons/fa6"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
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
                District
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
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const {loading,users} =  useUsers(flag);



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
                    <DataTable cols={USER_COLS} data={users} />
                </Spin>
            </div>
        </>
    )
}