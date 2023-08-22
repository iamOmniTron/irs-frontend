import { UserOutlined,ShopOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb,Button,Card,Col,Descriptions,Divider,Row,Typography } from "antd";
import { BsPaypal } from "react-icons/bs";
import {FcAlarmClock} from "react-icons/fc"
import { RxDashboard } from "react-icons/rx";
import {HiOutlineBuildingOffice2} from "react-icons/hi2"


const {Title} = Typography;


const BREADCRUMB_ITEMS = [
    {
        key:"1",
        title:(
            <>
            <RxDashboard/>
            Dashboard
            </>
        )
    }
]



export default function UserDashboard(){



    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em"}}>
                <Title level={3}>
                    <b>MUSA</b> Abdulmumeen
                </Title>
            </div>
            <Row gutter={24}>
                <Col span={10}>
                    <Card>
                    <Divider orientation="left">
                        <Title level={4}>
                            <UserOutlined style={{color:"green"}}/>
                            User Details
                        </Title>
                        </Divider>
                        <div>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Fullname">
                                    <b>Musa Abdulmumeen</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="E-mail">
                                    <b>abdulmumeen15500@gmail.com</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Phone number">
                                   <b>07081320894</b>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </Card>
                </Col>
                <Col span={14}>
                    <Card>
                        <Divider orientation="right">
                            <Title level={4}>
                                <ShopOutlined style={{color:"red"}}/>
                                Business Details
                            </Title>
                        </Divider>
                        <div>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Business name">
                                   <b>Alaska Owonikoko Groups Ltd</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Establishment Date">
                                   <b>12th January 2012</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Business name">
                                  <b>Iyana paja, Lagos</b>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Card style={{width:"100%",marginTop:"2em"}}>
                    <Row>
                        <Col span={4}>
                            <Avatar icon={<HiOutlineBuildingOffice2 style={{color:"#008000"}}/>} shape="square" size={200}/>
                        </Col>
                        <Col span={20}>
                            <Divider>
                                <Title level={4}>Payment enquiry</Title>
                            </Divider>
                            <Descriptions column={3}>
                                <Descriptions.Item label={`Payment Due Date`}>
                                    {new Date().toDateString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Last payment">
                                    {new Date().toDateString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="amount">
                                    #3,000
                                </Descriptions.Item>
                                <Descriptions.Item label="billing duration">
                                    <b>weekly</b>
                                </Descriptions.Item>
                            </Descriptions>
                            <div style={{width:"20em"}}>
                                <Button style={{height:"3em",backgroundColor:"#008000"}} block type="primary" icon={<BsPaypal/>}>
                                    Pay
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </>
    )
}