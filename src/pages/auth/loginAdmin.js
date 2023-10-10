import { Avatar, Button, Checkbox,message, Form, Input, Typography, Statistic,Modal,Card,QRCode, Layout } from "antd";
import { useRef } from "react";
import {RiAdminLine} from "react-icons/ri"
import { useAdminConfirmOTP, useAdminLogin } from "../../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { extractValueFromInputRef } from "../../utils/helpers";
import { getUserProfile,userStore } from "../../store/userStore";
import { AUTH_TOKEN_NAME, OTP_TOKEN_DEADLINE } from "../../utils/defaults";

const {Title} = Typography;
const {Countdown} = Statistic;


export default function LoginAdmin(){
    const [loading,setLoading] = useState(false);
    const [userId,setUserId] = useState(null)
    const [tempCode,setTempCode] = useState(null);
    const [showQRCode,setShowQRCode] = useState(false);
    const navigate = useNavigate();

    const setUser = userStore(state=>state.setUser);

    const [form] = Form.useForm();



    const userIdRef = useRef(null);
    const codeRef = useRef(null)


    const loginAdmin = useAdminLogin();
    const confirmAdminOTP = useAdminConfirmOTP()
    
    const login = async ()=>{
    try {
        setLoading(true);
        const payload = {
            userId:extractValueFromInputRef(userIdRef),
        }
        const {userId,code} = await loginAdmin(payload);
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
        const response = await confirmAdminOTP(userId,payload);
        if(!response){
            setLoading(false);
            return;
        }
        sessionStorage.setItem(AUTH_TOKEN_NAME,response);
        message.success("Admin Logged in successfully");
        message.success("Redirecting to Dashboard...")
         setTimeout(async()=>{
            const userData = await getUserProfile();
            setUser(userData);
            setLoading(false);
            return navigate("/admin")
        },1200)
    }
    
    return(
        <>
            <Layout
                style={{
                    height:"100vh",
                    width:"100vw",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:"#008000"
                }}>
                <div style={{
                    width:"25vw",
                    height:"60vh",
                    position:"relative",
                    marginTop:"15vh"
                }}>
                    {/* <Avatar size={112} icon={<RiAdminLine/>} 
                    style={{position:"absolute",top:"-2em",left:"30%",zIndex:"2",backgroundColor:"gray",boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"}}
                    /> */}
                    <Link to="/lga/login" style={{color:"white",textAlign:"end",fontWeight:"bold"}}>L.G.A Administrator?</Link>
                    <div style={{
                        position:"relative",
                        display:"flex",
                        backgroundColor:"lightgray",
                        padding:"2em",
                        borderRadius:"4px",
                        width:"100%",
                        height:"85%",
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"column",
                        zIndex:"1",
                        boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"
                    }}>
                        <Title level={3}>
                            Administrator
                        </Title>
                        {
                            !userId && 
                        <Form form={form} style={{width:"100%"}}>
                            <Form.Item>
                                <Input ref={userIdRef} placeholder="Enter your User ID"/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{backgroundColor:"#008000"}} onClick={login} loading={loading} size="large" block type="primary">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        }
                        {
                            userId && 
                            <Form form={form} style={{width:"100%"}}>
                            <Form.Item>
                                <Input ref={codeRef} placeholder="Enter OTP Sent"/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{backgroundColor:"#008000"}} onClick={handleOTP} loading={loading} size="large" block type="primary">
                                    Confirm OTP
                                </Button>
                                <div style={{textAlign:"center",marginTop:"1em"}}>
                                                    <Countdown prefix={"expires in:"} valueStyle={{fontSize:20}} value={Date.now() + OTP_TOKEN_DEADLINE} format="mm:ss" onFinish={()=>setShowQRCode(true)}/>
                                                </div>
                            </Form.Item>
                        </Form>
                        }
                        <div style={{width:"100%",textAlign:"start"}}>
                            <Checkbox>
                                Remember me
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </Layout>
            <Modal title={"scan the QR code to login"} width={300} open={showQRCode} footer={null} onCancel={()=>setShowQRCode(false)}>
                <Card>
                    <QRCode value={tempCode} size={200}/>
                </Card>
            </Modal>
        </>
    )
}