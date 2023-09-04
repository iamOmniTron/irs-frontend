import { Breadcrumb,Typography,Spin, Tag, Modal, Form, Input, message, Space } from "antd"
import { FaMapLocationDot } from "react-icons/fa6"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { PlusOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BsPaypal, BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { usePayments } from "../../hooks/payment";
import { formatCurrency } from "../../utils/helpers";
import { NAIRA } from "../../utils/defaults";


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
                <BsPaypal/>
                Payments
            </>
        )
    }
];


const PAYMENTS_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Invoice Number",
        key:"invoiceNumber",
        dataIndex:"Invoice",
        render:(i)=>i.invoiceNumber
    },
    {
        title:"Payment Reference Number",
        key:"refID",
        dataIndex:"referenceNumber"
    },
    {
        title:"Business",
        key:"business",
        dataIndex:"Invoice",
        render:(i)=>i.Business.name
    },
    {
        title:"Amount",
        key:"amount",
        dataIndex:"amount",
        render:(a)=>`${NAIRA} ${formatCurrency(a)}`
    },
    {
        title:"Paid On",
        key:"generatedOn",
        dataIndex:"createdAt",
        render:(c)=> new Date(c).toDateString(),
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"Invoice",
        render:(s)=>s.status === "pending" ?<Tag color="red">{s.status}</Tag>:<Tag color="green">{s.status}</Tag>
    }
]



export default function Payments(){

    const {loading,payments} = usePayments();
    console.log(payments)
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    Payments
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable data={payments} cols={PAYMENTS_COLS}/>
                </Spin>
            </div>
        </>
    )
}