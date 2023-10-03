import { Avatar, Button, Layout, Menu, Tooltip,message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {AiOutlineSetting,AiOutlineUnlock} from "react-icons/ai"
import {RxDashboard} from "react-icons/rx";
import {BsPaypal} from "react-icons/bs";
import {LiaFileInvoiceSolid} from "react-icons/lia";
import { AUTH_TOKEN_NAME } from "../../../utils/defaults";
import Logo from "../../../assets/logo.png"
import { Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { userStore } from "../../../store/userStore";

const {Header,Content} = Layout;




const NAV_ITEMS = [
    {
        key:"dashboard",
        label:<Link to="/user" style={{color:"white"}}><b>Dashboard</b></Link>,
        icon:<RxDashboard style={{fontSize:20,color:"white"}}/>
    },
    {
        key:"invoices",
        label:<Link to="/user/invoices" style={{color:"white"}}><b>Invoices</b></Link>,
        icon:<LiaFileInvoiceSolid style={{fontSize:20,color:"white"}}/>
    },
    {
        key:"payments",
        label:<Link to="/user/payments" style={{color:"white"}}><b>Payments</b></Link>,
        icon:<BsPaypal style={{fontSize:20,color:"white"}}/>
    },
    // {
    //     key:"settings",
    //     label:<b style={{color:"white"}}>Settings</b>,
    //     icon:<AiOutlineSetting style={{fontSize:20,color:"white"}}/>,
    //     children:[
    //         {
    //             key:"passReset",
    //             icon:<AiOutlineUnlock style={{fontSize:20,color:"black"}}/>,
    //             label:<Link to="/user/settings/password-reset" style={{color:"black"}}><b>Reset Password</b></Link>
    //         }
    //     ]
    // },
]

export default function UserDashboardLayout(){
    const navigate = useNavigate();

    const logout = userStore(state=>state.logout);

    const handleLogout = ()=>{
        sessionStorage.removeItem(AUTH_TOKEN_NAME);
        logout();
        message.success("User Logged out successfully");
        navigate("/");
    }

    return(
        <>
        <Layout>
            <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                backgroundColor:"#008000"
              }}>
            <Avatar size={50} src={Logo}/>
            <div style={{display:"flex",alignItems:"center"}}>
              <Menu
               mode="horizontal"
               items={NAV_ITEMS}
               style={{minWidth:"40vw",backgroundColor:"#008000",color:"white"}}
              />
              <Tooltip title="logout">
                <Button type="text" onClick={handleLogout}>
                    <Avatar size={24} src={<FaUserCircle/>}/>
                </Button>
              </Tooltip>
            </div>
            </Header>
            <Content
            style={{
                padding: '2em',
                height:"90vh",
                overflowY:"scroll"
              }}>
                <Outlet/>
            </Content>
        </Layout>
        </>
    )
}