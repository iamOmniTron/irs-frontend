import { Breadcrumb,Typography,Button, message, Space, Card, Descriptions,Image,Row,Col } from "antd"
import { RxDashboard } from "react-icons/rx";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import { BiArrowBack, BiSync } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminResetPassword } from "../../hooks/auth";
import { FALLBACK_IMAGE,SERVER_URL } from "../../utils/defaults";
import { useApproveUser } from "../../hooks/user";



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



export default function LgaUnRegisteredUser(){
    const {state:user} = useLocation();
    const navigate = useNavigate();

    const approveUser = useApproveUser();

    const handleUserApproval = async ()=>{
        const response = await approveUser(user.id);
        message.success(response);
        return navigate("/admin/users");
    }

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    New User Details
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Card style={{minHeight:"50vh"}}>
                <Row gutter={16} style={{marginBlock:"1em"}}>
                    <Col span={8}>
                            <Image
                            height={210}
                            width={250}
                            src={`${SERVER_URL.replace("/api","")}/${user.imageUrl}`}
                            fallback={FALLBACK_IMAGE}
                                />
                    </Col>
                    <Col span={16}>
                            <Descriptions column={2} title="User Information">
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
                            <Descriptions column={2} title="User's Business Information" style={{marginBlock:"1em"}}>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="name">
                                    {user.Business.name}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="address">
                                    {user.Business.address}
                                </Descriptions.Item>
                                <Descriptions.Item  contentStyle={{fontSize:15,fontWeight:"bold"}} label="Local Government Area">
                                    {user.Business.LocalGovernmentArea.value}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="District">
                                    {user.Business.LocalGovernmentArea.District.title}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Size">
                                    {user.Business.Size.title}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Type">
                                    {user.Business.Type.title}
                                </Descriptions.Item>
                                <Descriptions.Item span={2} contentStyle={{fontSize:15,fontWeight:"bold"}} label="Category">
                                    {user.Business.Category.title}
                                </Descriptions.Item>
                                <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Annual Turn Over (ATO)">
                                    {user.Business.Tax.GrossTurnOver.title}
                                </Descriptions.Item>
                            </Descriptions>


                            <Space style={{marginTop:"2em"}} wrap>
                                <Button icon={<BiArrowBack style={{fontSize:20}}/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>navigate(-1)}>
                                    Go Back
                                </Button>
                                <Button icon={<CheckOutlined style={{fontSize:20}}/>} onClick={handleUserApproval} type="primary" style={{backgroundColor:"orange"}}>
                                    Approve User
                                </Button>
                            </Space>
                    </Col>
                </Row>
                    </Card>
            </div>
        </>
    )
}