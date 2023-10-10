import { Button, Card,Form,Input,Layout,Typography,message,Statistic,Modal,QRCode } from "antd";
import {useState,useRef} from "react";
import { userStore,getUserProfile, getAdminProfile } from "../../store/userStore";
import { Link, useNavigate } from "react-router-dom";
import { useLGAAdminLogin, useLgaAdminConfirmOTP } from "../../hooks/auth";
import { extractValueFromInputRef } from "../../utils/helpers";
import { AUTH_TOKEN_NAME,OTP_TOKEN_DEADLINE } from "../../utils/defaults";


const {Title} = Typography
const {Countdown} = Statistic;


export default function LoginLgaAdmin(){
    const [loading,setLoading] = useState(false);
    const [userId,setUserId] = useState(null)
    const [tempCode,setTempCode] = useState(null);
    const [showQRCode,setShowQRCode] = useState(false);
    const navigate = useNavigate();

    
    const userIdRef = useRef(null);
    const codeRef = useRef(null)
    const setUser = userStore(state=>state.setUser);


    const loginLGAAdmin = useLGAAdminLogin();
    const confirmLGAAdminLogin = useLgaAdminConfirmOTP();

    const login = async ()=>{
        try {
            setLoading(true);
            const payload = {
                userId:extractValueFromInputRef(userIdRef),
            }
            const {userId,code} = await loginLGAAdmin(payload);
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
            const response = await confirmLGAAdminLogin(userId,payload);
            if(!response){
                setLoading(false);
                return;
            }
            sessionStorage.setItem(AUTH_TOKEN_NAME,response);
            message.success("Admin Logged in successfully");
            message.success("Redirecting to Dashboard...")
             setTimeout(async()=>{
                const userData = await getAdminProfile();
                setUser(userData);
                setLoading(false);
                return navigate("/lga")
            },1200)
        }


    return(
        <>
            <Layout style={{
                height:"100vh",
                width:"100vw",
                backgroundColor:"#008000",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <div style={{width:"25vw"}}>
                    <Link to="/admin/login" style={{fontWeight:"bold",color:"white",textDecoration:"none"}}>Administrator?</Link>
                </div>
                <Card style={{height:"40vh",width:"25vw",backgroundColor:"lightgray"}}>
                    <Title level={3} style={{textAlign:"center",marginBlock:"1em"}}>
                        L.G.A ADMINISTRATOR
                    </Title>
                    { !userId &&
                        <Form>
                            <Form.Item>
                                <Input ref={userIdRef} placeholder="Enter your userId"/>
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" style={{backgroundColor:"#008000"}} onClick={login}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    }

                    { userId && 
                        <Form>
                        <Form.Item>
                            <Input ref={codeRef} placeholder="Enter OTP sent"/>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" style={{backgroundColor:"#008000"}} onClick={handleOTP}>
                                Confirm OTP
                            </Button>
                            <div style={{textAlign:"center",marginTop:"1em"}}>
                                <Countdown prefix={"expires in:"} valueStyle={{fontSize:20}} value={Date.now() + OTP_TOKEN_DEADLINE} format="mm:ss" onFinish={()=>setShowQRCode(true)}/>
                            </div>
                        </Form.Item>
                    </Form>
                    }
                </Card>
            </Layout>
            <Modal title={"scan the QR code to login"} width={300} open={showQRCode} footer={null} onCancel={()=>setShowQRCode(false)}>
                <Card>
                    <QRCode value={tempCode} size={200}/>
                </Card>
            </Modal>
        </>
    )
}