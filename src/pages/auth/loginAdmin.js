import { Avatar, Button, Checkbox,message, Form, Input, Typography } from "antd";
import { useRef } from "react";
import {RiAdminLine} from "react-icons/ri"
import { useAdminLogin } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { extractValueFromInputRef } from "../../utils/helpers";
import { getUserProfile,userStore } from "../../store/userStore";
import { AUTH_TOKEN_NAME } from "../../utils/defaults";

const {Title} = Typography;


export default function LoginAdmin(){
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const setUser = userStore(state=>state.setUser);

    const [form] = Form.useForm();



    const userIdRef = useRef(null);
    const passRef = useRef(null);


    const loginAdmin = useAdminLogin();


    const login = async ()=>{
        setLoading(true);
        const payload = {
            userId:extractValueFromInputRef(userIdRef),
            password:extractValueFromInputRef(passRef)
        }
        const responseToken = await loginAdmin(payload);
        if(!responseToken){
            setLoading(false);
            return;
        }
        sessionStorage.setItem(AUTH_TOKEN_NAME,responseToken);
        message.success("Admin Logged in successfully");
        form.resetFields();
        setTimeout(async()=>{
            const {password,...userData} = await getUserProfile();
            message.success("Redirecting to Dashboard...")
            setUser(userData);
            setLoading(false);
            return navigate("/admin")
        },2000)
    }
    
    return(
        <>
            <div
                style={{
                    height:"100vh",
                    width:"100vw",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    // backgroundImage:"url('/admin-background.png')",
                    backgroundColor:"#008000"
                    // backgroundColor:"rgba(0,0,0,0.3)"
                }}>
                <div style={{
                    width:"25vw",
                    height:"60vh",
                    position:"relative",
                    marginTop:"15vh"
                }}>
                    <Avatar size={112} icon={<RiAdminLine/>} 
                    style={{position:"absolute",top:"-2em",left:"30%",zIndex:"2000",backgroundColor:"gray",boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"}}
                    />
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
                        <Form form={form} style={{width:"100%"}}>
                            <Form.Item>
                                <Input ref={userIdRef} placeholder="Enter your User ID"/>
                            </Form.Item>
                            <Form.Item>
                                <Input.Password ref={passRef} placeholder="Enter your password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{backgroundColor:"#008000"}} onClick={login} loading={loading} size="large" block type="primary">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{width:"100%",textAlign:"start"}}>
                            <Checkbox>
                                Remember me
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}