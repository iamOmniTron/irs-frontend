import {Row,Col,Button,Form,Typography,Image, Avatar, Input} from "antd"
import {UserOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import { Link as RouterLink } from "react-router-dom";
import Lafia from "../../assets/lafia.jpg";
import Logo from "../../assets/nsirs.webp";

const {Title,Link} = Typography;



export default function LoginUser(){




    return(
        <>
            <Row style={{
                width:"100vw",
                height:"100vh",
                backgroundColor:"#008000",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <div style={{justifyContent:"flex-end",width:"55%",display:"flex",gap:"1em"}}>
                    <span>
                       <RouterLink to={"/register"} style={{color:"white"}}>
                        <UserOutlined/>
                        Register
                       </RouterLink>
                    </span>
                    <span>
                       <Link style={{color:"white"}}>
                       <QuestionCircleOutlined />
                        Help
                       </Link>
                    </span>
                </div>
                <Col style={{height:"60%",width:"60%",backgroundColor:"#FFFFFF",borderRadius:"4px"}}>
                    <Row>
                        <Col span={14}>
                            <Image preview={false} style={{backgroundSize:"cover",backgroundColor:"rgba(0,0,0,0.3)"}} src={Lafia} height={471} width={"100%"} alt="revenue image"/>
                        </Col>
                        <Col span={10} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"2em",gap:"1em"}}>
                                <Avatar shape="square" src={Logo} size={120} style={{width:"80%"}}/>
                                <Title level={3}>Login</Title>
                                <Form>
                                    <Form.Item>
                                        <Input type="email" placeholder="enter your e-mail"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input.Password placeholder="enter your password"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" block style={{backgroundColor:"#008000"}}>
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}