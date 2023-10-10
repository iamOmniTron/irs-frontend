import { UserOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb,Card,Col,Descriptions,Row,Typography   } from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import { useLgaBusinesses } from "../../hooks/business";
import { useAdminProfile } from "../../hooks/auth";


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



const COLS = [
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
        title:"Applied On",
        key:"appliedOn",
        dataIndex:"createdAt",
        render:(createdDate)=><text style={{color:"#008000"}}>{new Date(createdDate).toDateString()}</text>
    }
]


export default function LgaAdminDashboard(){
    const {businesses} = useLgaBusinesses();
    const {adminProfile} = useAdminProfile();

    return(
        <>
             <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em"}}>
                <Title level={3}>
                    L.G.A ADMINISTRATOR
                </Title>
            </div>
            <Row style={{
                height:"35vh"
            }}>
                <Card style={{
                    width:"100%",
                    height:"100%"
                }}>
                    <Row style={{height:"100%",width:"100%"}}>
                        <Col span={8}>
                            <Avatar icon={<UserOutlined/>} size={150} shape="square"/>
                        </Col>
                        <Col span={16}>
                            <Descriptions 
                            column={1}
                            title="Dashboard">
                            <Descriptions.Item label={"Local Government Area"}>
                                {adminProfile?.LocalGovernmentArea?.title}
                            </Descriptions.Item>
                            <Descriptions.Item label={"User ID"}>
                                {adminProfile?.userId}
                            </Descriptions.Item>
                            <Descriptions.Item label={"Name"}>
                                {adminProfile?.firstname} {adminProfile?.lastname}
                            </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            </Row>
                <Title level={4}>
                    BUSINESSES
                </Title>
            <div style={{
                marginBottom:"1em"
            }}>
                <DataTable data={businesses} cols={COLS}/>
            </div>
        </>
    )
}