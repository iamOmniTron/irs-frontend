import { Avatar, Button, Typography } from "antd"
import {ArrowLeftOutlined,ReloadOutlined} from "@ant-design/icons";
import Logo from "../../assets/nsirs.webp";
import {useNavigate} from "react-router-dom"

const {Title} = Typography;



export default function UnregisteredUserPage(){
    const navigate = useNavigate();

    const goToLogin =()=> navigate("/");
    const refresh = ()=> window.location.reload();

    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
                backgroundColor:"lightgray",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <div style={{height:"20vh",width:"20vw"}}>
                    <Avatar shape="square" src={Logo} size={100} style={{width:"80%"}}/>
                </div>
                <Title level={4}>
                    Your Registration is Still Under Review
                </Title>
                <div style={{
                    height:"20vh",
                    width:"20vw",
                    display:"flex",
                    alignItems:"center",
                    gap:"2em"
                }}>
                    <Button type="text" onClick={goToLogin}>
                        <ArrowLeftOutlined/>
                        Log out
                    </Button>
                    <Button type="text" onClick={refresh}>
                        <ReloadOutlined/>
                        Refresh
                    </Button>
                </div>
            </div>
        </>
    )
}