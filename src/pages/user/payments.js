import { Breadcrumb,Select,Tag,Typography,Card,Row,Col, Descriptions, Divider, Button, Spin } from "antd"
import { RxDashboard } from "react-icons/rx"
import {FaMoneyBillWave} from "react-icons/fa";
import DataTable from "../../components/table";
import { BsPaypal } from "react-icons/bs";
import { userStore } from "../../store/userStore";
import { useMyPayments } from "../../hooks/payment";
import { NAIRA } from "../../utils/defaults";
import { formatCurrency } from "../../utils/helpers";
import {useNavigate} from "react-router-dom";


const {Option} = Select;
const {Title} = Typography;




const INVOICE_COLS = [
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
        title:"Reference Number",
        key:"refID",
        dataIndex:"referenceNumber"
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

    const currentUser = userStore(state=>state.user);
    const business = currentUser.Business;

    const naviagate = useNavigate();

    const IsNotPayable = new Date(business.nextPaymentDate).valueOf() > new Date(Date.now()).valueOf()


    const {loading,payments} = useMyPayments();
    console.log(payments)
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <Title level={4}>PAYMENT INFORMATION</Title>
            <Card style={{width:"100%",padding:"1em",margin:"1em 0",minHeight:"30vh"}}>
                <Row style={{height:"100%",width:"100%"}}>
                    <Col span={18} style={{height:"100%"}}>
                        <Descriptions layout="vertical">
                            <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="last payment due date">
                                {business.lastPaymentDate?new Date(business.lastPaymentDate).toDateString():"None"}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Company Income Tax (CIT) Rate">
                                {business.Tax.percentage} of Annual Gross Turnover (GTO)
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="next payment due date">
                                {new Date(business.nextPaymentDate).toDateString()}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Billing Bases">
                                {business.BillingDuration.title}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={4} style={{width:"100%",height:"50%"}}>
                        <div style={{height:"20vh",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"}}>
                                <Descriptions layout="vertical">
                                    <Descriptions.Item label="Payment status">
                                        {
                                            IsNotPayable ? <Tag color="orange">Not Available</Tag>:<Tag color="green">Available</Tag>
                                        }
                                    </Descriptions.Item>
                                </Descriptions>
                            <Button onClick={()=>naviagate("/user")} disabled={IsNotPayable} size="large" icon={<BsPaypal/>} type="primary" style={{backgroundColor:"green"}}>
                                {IsNotPayable ? "Payment Not Available":" Generate Invoice"}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
            <Title level={4}>PAYMENT HISTORY</Title>
            {/* <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                <div style={{height:"4em",width:"50%",backgroundColor:"white",padding:"1em 2em",display:"flex",justifyContent:"center",boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"}}>
                    <div style={{}}>
                        filter by :
                        <Select style={{width:"10em",marginLeft:"1em"}}>
                            <Option key={1} value="date">date</Option>
                            <Option key={2} value="status">status</Option>
                        </Select>
                    </div>
                </div>
            </div> */}
            <div style={{height:"30vh",overflowY:"scroll",marginTop:"3em",padding:"0 2em"}}>
                <Spin spinning={loading}>
                    <DataTable cols={INVOICE_COLS} data={payments}/>
                </Spin>
            </div>
        </>
    )
}