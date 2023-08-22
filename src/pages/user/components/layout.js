import { Avatar, Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {AiOutlineSetting,AiOutlineUnlock} from "react-icons/ai"
import {RxDashboard} from "react-icons/rx";
import {BsPaypal} from "react-icons/bs";
import {LiaFileInvoiceSolid} from "react-icons/lia";

import Logo from "../../../assets/logo.png"
import { Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

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
    {
        key:"settings",
        label:<b style={{color:"white"}}>Settings</b>,
        icon:<AiOutlineSetting style={{fontSize:20,color:"white"}}/>,
        children:[
            {
                key:"passReset",
                icon:<AiOutlineUnlock style={{fontSize:20,color:"black"}}/>,
                label:<Link style={{color:"black"}}><b>Reset Password</b></Link>
            }
        ]
    },
]

export default function UserDashboardLayout(){

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
                <Avatar size={24} src={<FaUserCircle/>}/>
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