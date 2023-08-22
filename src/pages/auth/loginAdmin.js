import { Avatar, Button, Checkbox, Form, Input, Typography } from "antd";
import {RiAdminLine} from "react-icons/ri"

const {Title} = Typography;


export default function LoginAdmin(){
    
    return(
        <>
            <div
                style={{
                    height:"100vh",
                    width:"100vw",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundImage:"url('/admin-background.png')",
                    backgroundColor:"rgba(0,0,0,0.3)"
                }}>
                <div style={{
                    width:"25vw",
                    height:"50vh",
                    position:"relative",
                }}>
                    <Avatar size={112} icon={<RiAdminLine/>} 
                    style={{position:"absolute",top:"-1.5em",left:"30%",zIndex:"2000",backgroundColor:"gray",boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"}}
                    />
                    <div style={{
                        position:"relative",
                        display:"flex",
                        backgroundColor:"lightgray",
                        padding:"2em",
                        borderRadius:"4px",
                        width:"100%",
                        height:"80%",
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"column",
                        zIndex:"1",
                        boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"
                    }}>
                        <Title level={3}>
                            Administrator
                        </Title>
                        <Form style={{width:"100%"}}>
                            <Form.Item>
                                <Input placeholder="Enter your User ID"/>
                            </Form.Item>
                            <Form.Item>
                                <Input placeholder="Enter your password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button size="large" block type="primary">
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