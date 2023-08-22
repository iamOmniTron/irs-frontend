import { Typography,Breadcrumb, Select } from "antd"
import { RxDashboard } from "react-icons/rx";
import {TbFileInvoice} from "react-icons/tb";
import DataTable from "../../components/table";

const {Title} = Typography;
const {Option} = Select;


const DUMMY_DATA = [
    {
        id:1,
        invoice_number:"10020020",
        payment_status:"success",
        generatedOn:new Date().toDateString()
    }
];


const INVOICE_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Invoice Number",
        key:"invoiceNumber",
        dataIndex:"invoice_number"
    },
    {
        title:"Payment Status",
        key:"paymentStatus",
        dataIndex:"payment_status"
    },
    {
        title:"Generated On",
        key:"generatedOn",
        dataIndex:"generatedOn"
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

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                <div style={{height:"4em",width:"50%",backgroundColor:"white",padding:"1em 2em",display:"flex",justifyContent:"center",boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"}}>
                    <div style={{}}>
                        filter by :
                        <Select style={{width:"5em",marginLeft:"1em"}}>
                            <Option key={1} value="date">date</Option>
                            <Option key={2} value="status">status</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div style={{marginTop:"3em",padding:"0 2em"}}>
                <Title level={4}>INVOICES</Title>
                <DataTable cols={INVOICE_COLS} data={DUMMY_DATA}/>
            </div>
        </>
    )
}