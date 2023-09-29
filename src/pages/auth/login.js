import {Row,Col,Button,Form,Typography,Image,message, Avatar, Input} from "antd"
import {UserOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Lafia from "../../assets/lafia.jpg";
import Logo from "../../assets/nsirs.webp";
import { userStore,getUserProfile } from "../../store/userStore";
import { extractValueFromInputRef } from "../../utils/helpers";
import { AUTH_TOKEN_NAME } from "../../utils/defaults";
import { useRef,useState } from "react";
import { useLogin } from "../../hooks/auth";

const {Title,Link} = Typography;



export default function LoginUser(){
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const setUser = userStore(state=>state.setUser);

    const emailRef = useRef(null);
    const passRef = useRef(null);


    const loginUser = useLogin();

    const login = async ()=>{
        setLoading(true);
        const payload = {
            email:extractValueFromInputRef(emailRef),
            password:extractValueFromInputRef(passRef)
        }
        const responseToken = await loginUser(payload);
        if(!responseToken){
            setLoading(false);
            return;
        }
        sessionStorage.setItem(AUTH_TOKEN_NAME,responseToken);
        message.success("User Logged in successfully");
        setTimeout(async()=>{
            const {password,...userData} = await getUserProfile();
            message.success("Redirecting to Dashboard...")
            setUser(userData);
            setLoading(false);
            return navigate("/user")
        },2000)
    }



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
                <Col style={{height:"60vh",width:"60%",backgroundColor:"#FFFFFF",borderRadius:"4px"}}>
                    <Row style={{height:"60vh"}}>
                        <Col span={14} style={{
                            backgroundImage:'url("/lafia.jpg")',
                            backgroundSize:"cover",
                            backgroundRepeat:"no-repeat"
                        }}/>
                        <Col span={10} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"2em",gap:"1em"}}>
                                <Avatar shape="square" src={Logo} size={120} style={{width:"80%"}}/>
                                <Title level={3}>Login</Title>
                                <Form>
                                    <Form.Item>
                                        <Input ref={emailRef} type="email" placeholder="enter your e-mail"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input.Password ref={passRef} placeholder="enter your password"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button onClick={login} type="primary" block style={{backgroundColor:"#008000"}}>
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