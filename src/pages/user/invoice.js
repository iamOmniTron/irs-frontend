import { Typography,Breadcrumb, Select, Spin, Tag } from "antd"
import { RxDashboard } from "react-icons/rx";
import {TbFileInvoice} from "react-icons/tb";
import DataTable from "../../components/table";
import { useMyInvoices } from "../../hooks/invoice";
import { NAIRA } from "../../utils/defaults";
import { formatCurrency } from "../../utils/helpers";

const {Title} = Typography;
const {Option} = Select;



const INVOICE_COLS = [
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

const BREADCRUMB_ITEMS = [
    {
        key:1,
        title:(
            <>
                <RxDashboard/>
                Dashboard
            </>
        )
    },
    {
        key:2,
        title:(
            <>
                <TbFileInvoice/>
                Invoices
            </>
        )
    }
]


export default function UserInvoices(){


    const {loading,invoices} = useMyInvoices();

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{marginTop:"3em",padding:"0 2em"}}>
                <Title level={4}>GENERATED INVOICES</Title>
                <Spin spinning={loading}>    
                    <DataTable cols={INVOICE_COLS} data={invoices}/>
                </Spin>
            </div>
        </>
    )
}