import {Row,Col,Button,Form,Typography,Image,message, Avatar, Input,Statistic, Modal, Card, QRCode} from "antd"
import {UserOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {BsShieldLockFill} from "react-icons/bs"
import Logo from "../../assets/nsirs.webp";
import { userStore,getUserProfile } from "../../store/userStore";
import { extractValueFromInputRef } from "../../utils/helpers";
import { AUTH_TOKEN_NAME, OTP_TOKEN_DEADLINE } from "../../utils/defaults";
import { useRef,useState } from "react";
import { useConfirmOTP, useLogin } from "../../hooks/auth";

const {Title,Link} = Typography;
const {Countdown} = Statistic;



export default function LoginUser(){
    const [loading,setLoading] = useState(false);
    const [tempCode,setTempCode] = useState("")
    const [showQRCode,setShowQRCode] = useState(false);
    const [userId,setUserId] = useState("");
    const navigate = useNavigate();

    const setUser = userStore(state=>state.setUser);
    const emailRef = useRef(null);
    const codeRef = useRef(null);


    const loginUser = useLogin();
    const confirmOTP = useConfirmOTP();

    const login = async ()=>{
        try {
            setLoading(true);
            const payload = {
                email:extractValueFromInputRef(emailRef),
            }
            const res = await loginUser(payload);
            const {userId,code} = res;
            setUserId(userId);
            setTempCode(code);
            setLoading(false);
            message.success("OTP sent successfully");
        } catch (error) {
            setLoading(false);
            message.error(error.message);
        }
    }

    const handleOTP = async ()=>{
        setLoading(true);
        const payload = {
            code:extractValueFromInputRef(codeRef)
        };
        const response = await confirmOTP(userId,payload);
        if(!response){
            setLoading(false);
            return;
        }
        sessionStorage.setItem(AUTH_TOKEN_NAME,response);
        message.success("User Logged in successfully");
        message.success("Redirecting to Dashboard...")
         setTimeout(async()=>{
            const userData = await getUserProfile();
            setUser(userData);
            setLoading(false);
            return navigate("/user")
        },1200)
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
                    <span>
                        <RouterLink style={{color:"white"}} to="/admin/login">
                            <BsShieldLockFill/>
                            Admin
                        </RouterLink>
                    </span>
                </div>
                <Col style={{height:"60vh",width:"60%",backgroundColor:"#FFFFFF",borderRadius:"4px"}}>
                    <Row style={{height:"60vh"}}>
                        <Col span={14} style={{
                            backgroundImage:'url("/lafia.jpg")',
                            backgroundSize:"cover",
                            backgroundRepeat:"no-repeat",
                            backgroundPosition: "center top"
                        }}/>
                        <Col span={10} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"1em"}}>
                                <Avatar shape="square" src={Logo} size={120} style={{width:"80%"}}/>
                                {
                                    !userId &&
                                    <>
                                <Title level={3}>Login</Title>
                                <Form>
                                    <Form.Item>
                                        <Input ref={emailRef} type="email" placeholder="enter your e-mail"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button loading={loading} onClick={login} type="primary" block style={{backgroundColor:"#008000"}}>
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                                    </>
                                }
                                
                                { 
                                userId &&
                                    <>
                                        <Title level={3}>Confirm Login</Title>
                                        <Form>
                                            <Form.Item>
                                                <Input ref={codeRef} placeholder="enter OTP"/>
                                            </Form.Item>
                                            <Form.Item>
                                        <Button loading={loading} onClick={handleOTP} type="primary" block style={{backgroundColor:"#008000"}}>
                                            Confirm OTP
                                        </Button>
                                        <div style={{textAlign:"center",marginTop:"1em"}}>
                                                    <Countdown prefix={"expires in:"} valueStyle={{fontSize:20}} value={Date.now() + OTP_TOKEN_DEADLINE} format="mm:ss" onFinish={()=>setShowQRCode(true)}/>
                                                </div>
                                    </Form.Item>
                                        </Form>
                                    </>
                                }
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal title={"scan the QR code to login"} width={300} open={showQRCode} footer={null} onCancel={()=>setShowQRCode(false)}>
                <Card>
                    <QRCode value={tempCode} size={200}/>
                </Card>
            </Modal>
        </>
    )
}