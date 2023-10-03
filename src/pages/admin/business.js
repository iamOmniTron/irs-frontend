import { Breadcrumb,Typography,Spin, Button, Tag, Form, Input, message, Space } from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { BsPaypal, BsShopWindow, BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { NAIRA } from "../../utils/defaults";
import { formatCurrency } from "../../utils/helpers";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useBusinesses } from "../../hooks/business";
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
                <BsShopWindow/>
                Business
            </>
        )
    }
];


const BUSINESS_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        dataIndex:"name"
    },
    {
        title:"Owner",
        key:"owner",
        dataIndex:"User",
        render:(u)=>`${u.firstname} ${u.lastname}`
    },
    {
        title:"Local Government Area",
        key:"lga",
        dataIndex:"LocalGovernmentArea",
        render:(l)=>l.value
    },
    {
        title:"Tax Identity Number (TIN)",
        key:"tin",
        dataIndex:"User",
        render:(u)=>u.tin
    },
    {
        title:"Annual Gross Turnover",
        key:"ato",
        dataIndex:"Tax",
        render:(t)=>t.GrossTurnOver.value
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"isRegistered",
        render:(s)=>!s? <Tag color="red">Not Registered</Tag>:<Tag color="green">Registered</Tag>
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,business)=><BusinessEdit business={business}/>
    }
]




function BusinessEdit({business}){

    const navigate = useNavigate();

    const navigateToBusiness = ()=>navigate("/admin/view-business",{state:business})
    return(
        <>
            <Button icon={<EyeOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={navigateToBusiness}/>
        </>
    )
}


export default function Business(){

    const {loading,businesses} = useBusinesses();
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    BUSINESSES
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable data={businesses} cols={BUSINESS_COLS}/>
                </Spin>
            </div>
        </>
    )
}