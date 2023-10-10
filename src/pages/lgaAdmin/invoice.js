import { Breadcrumb,Typography,Spin, Button, Tag, Form, Input, message, Space } from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { PlusOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { BsPaypal, BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useInvoices, useLgaInvoices } from "../../hooks/invoice";
import { NAIRA } from "../../utils/defaults";
import { formatCurrency } from "../../utils/helpers";
import { FaFileInvoiceDollar } from "react-icons/fa6";


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
                <FaFileInvoiceDollar/>
                Invoices
            </>
        )
    }
];


const INVOICES_COL = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Invoice Number",
        key:"invoiceNumber",
        dataIndex:"invoiceNumber"
    },
    {
        title:"Business",
        key:"business",
        dataIndex:"Business",
        render:(b)=>b.name
    },
    {
        title:"Amount",
        key:"amount",
        dataIndex:"amount",
        render:(a)=>`${NAIRA} ${formatCurrency(a)}`
    },
    {
        title:"Payment Status",
        key:"paymentStatus",
        dataIndex:"status",
        render:(s)=> s === "pending"?<Tag color="red">Pending</Tag>:<Tag color="green">Successful</Tag>
    },
    {
        title:"Generated On",
        key:"generatedOn",
        dataIndex:"createdAt",
        render:(d)=>new Date(d).toDateString()
    }
]



export default function LgaInvoices(){

    const {loading,invoices} = useLgaInvoices();

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    INVOICES HISTORY
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable data={invoices} cols={INVOICES_COL}/>
                </Spin>
            </div>
        </>
    )
}

