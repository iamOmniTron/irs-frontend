import { Breadcrumb,Select,Tag,Typography,Card, Progress,Row,Col } from "antd"
import { RxDashboard } from "react-icons/rx"
import {FaMoneyBillWave} from "react-icons/fa";
import DataTable from "../../components/table";


const {Option} = Select;
const {Title} = Typography;


const DUMMY_DATA = [
    {
        id:1,
        invoice_number:"10020020",
        status:"success",
        generatedOn:new Date().toDateString(),
        amount:"20,000",
        refID:"099-9IWL-9922992"
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
        title:"Reference Number",
        key:"refID",
        dataIndex:"refID"
    },
    {
        title:"Amount",
        key:"amount",
        dataIndex:"amount"
    },
    {
        title:"Generated On",
        key:"generatedOn",
        dataIndex:"generatedOn"
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"status",
        render:(s)=><Tag color="green">{s}</Tag>
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
                <FaMoneyBillWave/>
                Payments
            </>
        )
    }
]



export default function UserPayments(){


    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <Card style={{width:"100%",padding:"1em",margin:"2em 0",minHeight:"30vh"}}>
                <Row style={{height:"100%",width:"100%"}}>
                    <Col span={6}>
                        <Progress type="circle" percent={20} size={200} format={(d)=>`${d} days left`}/>
                    </Col>
                </Row>
            </Card>
            <div style={{height:"30vh",overflowY:"scroll"}}>
            <Title level={4}>PAYMENT HISTORY</Title>
            <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                <div style={{height:"4em",width:"50%",backgroundColor:"white",padding:"1em 2em",display:"flex",justifyContent:"center",boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"}}>
                    <div style={{}}>
                        filter by :
                        <Select style={{width:"10em",marginLeft:"1em"}}>
                            <Option key={1} value="date">date</Option>
                            <Option key={2} value="status">status</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div style={{marginTop:"3em",padding:"0 2em"}}>
                <DataTable cols={INVOICE_COLS} data={DUMMY_DATA}/>
            </div>
            </div>
        </>
    )
}