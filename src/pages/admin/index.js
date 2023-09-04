import {Row,Col,Card,Breadcrumb,Typography} from "antd"
import { RxDashboard } from "react-icons/rx";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {FaRecycle} from "react-icons/fa"
import { BsPaypal,BsGraphUp } from "react-icons/bs";
import {BiSolidReport} from "react-icons/bi";
import Charts from "./components/charts";
import DataTable from "../../components/table";
import {useLgas } from "../../hooks/lga";
import {Link} from "react-router-dom"
import { useBusinesses } from "../../hooks/business";
import { usePayments } from "../../hooks/payment";
import { NAIRA } from "../../utils/defaults";
import { formatCurrency } from "../../utils/helpers";


const {Title} = Typography;

const BREADCRUMB_ITEMS = [
    {
        key:"1",
        title:(
            <>
            <RxDashboard/>
            Overview
            </>
        )
    }
];



const DUMMY_BUSINESS_DATA = [
    {
        id:1,
        name:"Alaska groups ltd",
        owner:"Mr. Adeyinka Benson",
        registeredAt:"21 march 2012",
        businessSize:"large",
        ato:"above NGN 25,000,000"
    },
    {
        id:2,
        name:"God's Time Business",
        owner:"Mr Adeleke Jamiu",
        registeredAt:"10 september 2008",
        businessSize:"medium",
        ato:"below NGN 10,000,000"
    },
    {
        id:3,
        name:"Alaska groups ltd",
        owner:"Mr. Adeyinka Benson",
        registeredAt:"21 march 2012",
        businessSize:"large",
        ato:"above NGN 25,000,000"
    },
    {
        id:4,
        name:"God's Time Business",
        owner:"Mr Adeleke Jamiu",
        registeredAt:"10 september 2008",
        businessSize:"medium",
        ato:"below NGN 10,000,000"
    },
    {
        id:5,
        name:"Alaska groups ltd",
        owner:"Mr. Adeyinka Benson",
        registeredAt:"21 march 2012",
        businessSize:"large",
        ato:"above NGN 25,000,000"
    },
    {
        id:6,
        name:"God's Time Business",
        owner:"Mr Adeleke Jamiu",
        registeredAt:"10 september 2008",
        businessSize:"medium",
        ato:"below NGN 10,000,000"
    },
    
]


const BUSINESS_DATA_COLS = [
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
]



export default function AdminDashboard(){

    const {lgas} = useLgas();
    const {businesses} = useBusinesses();
    const {payments} = usePayments();
    let total = 0;
    payments.forEach((p)=>{
        total+= +(p.amount)
    })
    return(
        <>
        <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em"}}>
                <Title level={3}>
                    Administrator
                </Title>
            </div>
            <Row style={{height:"30vh"}} gutter={16}>
                <Col span={6} style={{height:"100%"}}>
                    <Link to="/admin/business">
                        <Card style={{height:"100%",backgroundColor:"#008000",color:"white",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                            <Title style={{color:"white",marginBlock:"1em"}} level={2}>{businesses.length}</Title>
                            <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignSelf:"flex-end"}}>
                                <Title style={{color:"white"}} level={4}>Total Businesses</Title>
                                <BsPaypal style={{fontSize:30}}/>
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col span={6} style={{height:"100%"}}>
                    <Link to="/admin/payment">
                        <Card style={{height:"100%",backgroundColor:"#008000",color:"white",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <Title style={{color:"white",marginBlock:"1em"}} level={2}>{NAIRA} {formatCurrency(total)}</Title>
                            <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignSelf:"flex-end"}}>
                                <Title style={{color:"white"}} level={4}>Total Generated Revenue</Title>
                                <FaRecycle style={{fontSize:30}}/>
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col span={6} style={{height:"100%"}}>
                    <Link to="/admin/lga">
                        <Card style={{height:"100%",backgroundColor:"#008000",color:"white",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <Title style={{color:"white",marginBlock:"1em"}} level={2}>{lgas.length}</Title>
                            <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignSelf:"flex-end"}}>
                                <Title style={{color:"white"}} level={4}>Total LGAs</Title>
                                <HiOutlineBuildingOffice2 style={{fontSize:30}}/>
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col span={6} style={{height:"100%"}}>
                    <Link to="/admin/reports">
                        <Card style={{height:"100%",backgroundColor:"#008000",color:"white",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <Title style={{color:"white",marginBlock:"1em"}} level={2}>
                            <BsGraphUp/>
                        </Title>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignSelf:"flex-end"}}>
                                <Title style={{color:"white"}} level={4}>Generate Reports</Title>
                                <BiSolidReport style={{fontSize:30}}/>
                            </div>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <div style={{marginTop:"4em",height:"50vh"}}>
                <Title level={4} style={{marginBlock:"1em"}}>Generated Revenue By Local Government Areas</Title>
                    <Charts/>
            </div>
            <div style={{marginTop:"4em",height:"50vh"}}>
            <Title level={4} style={{marginBlock:"1em"}}>Businesses</Title>
            <div style={{paddingBottom:"2em"}}>
                <DataTable cols={BUSINESS_DATA_COLS} data={businesses}/>
            </div>
            </div>
        </>
    )
}