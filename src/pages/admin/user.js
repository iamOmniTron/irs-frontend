import { Breadcrumb,Typography,Button, message, Space, Card, Descriptions,Image,Row,Col } from "antd"
import { RxDashboard } from "react-icons/rx";
import { UserOutlined } from "@ant-design/icons";
import { BiArrowBack, BiSync } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminResetPassword } from "../../hooks/auth";
import { FALLBACK_IMAGE,SERVER_URL } from "../../utils/defaults";

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
                <UserOutlined/>
                User
            </>
        )
    }
];



export default function User(){
    const {state:user} = useLocation();
    const navigate = useNavigate();
    const resetPassword = useAdminResetPassword();

    const handlePasswordReset = async ()=>{
        const response = await resetPassword(user.id);
        message.success(response);
        return;
    }

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    User Details
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Card style={{height:"40vh"}}>
                <Row gutter={16}>
                    <Col span={8}>
                            <Image
                            height={250}
                            width={250}
                            src={`${SERVER_URL.replace("/api","")}/${user.imageUrl}`}
                            fallback={FALLBACK_IMAGE}
                                />
                    </Col>
                    <Col span={16}>
                            <Descriptions column={2}>
                                <Descriptions.Item span={2} contentStyle={{fontSize:15,fontWeight:"bold"}} label="Fullname">
                                    {user.firstname} {user.lastname}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Tax Identity Number (TIN)">
                                    {user.tin}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="E-mail">
                                    {user.email}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Phone number">
                                    {user.phone}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="gender">
                                    {user.gender}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Contact Address">
                                    {user.address}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Home Town">
                                    {user.homeTown}
                                </Descriptions.Item>
                            </Descriptions>
                            <Space style={{marginTop:"2em"}} wrap>
                                <Button icon={<BiArrowBack style={{fontSize:20}}/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>navigate(-1)}>
                                    Go Back
                                </Button>
                                <Button icon={<BiSync style={{fontSize:20}}/>} type="primary" style={{backgroundColor:"orange"}} onClick={handlePasswordReset}>
                                    Reset Password
                                </Button>
                            </Space>
                    </Col>
                </Row>
                    </Card>
            </div>
        </>
    )
}