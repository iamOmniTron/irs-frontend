import { Layout,Menu,Tooltip,Button,Avatar,message } from "antd";
import { RxDashboard } from "react-icons/rx";
import {RiUserSettingsLine} from "react-icons/ri";
import {BsShopWindow,BsFillBuildingsFill, BsPaypal,BsGraphUpArrow,BsPeopleFill, BsGlobe} from "react-icons/bs";
import {FaFileInvoiceDollar,FaUserPlus,FaCog,FaCoins,FaUserCircle} from "react-icons/fa"
import {FaMapLocationDot} from "react-icons/fa6"
import {MdFormatSize,MdLocationPin,MdAdminPanelSettings} from "react-icons/md";
import {LiaBusinessTimeSolid} from "react-icons/lia";
import {SlOrganization} from "react-icons/sl";
import {RiUserLocationFill} from "react-icons/ri";
import {GoReport} from "react-icons/go"
import { Link, Outlet,useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";
import { AUTH_TOKEN_NAME } from "../../../utils/defaults";
import Logo from "../../../assets/nsirs.webp"
import { UserOutlined } from "@ant-design/icons";



const {Header,Sider,Content} = Layout;


const SIDEBAR_MENU_ITEMS = [
    {
        key:"overview",
        label:<Link to="/lga"><b>Overview</b></Link>,
        icon:<RxDashboard/>
    },
    {
        key:"users",
        label:<b>Users</b>,
        icon:<BsPeopleFill/>,
        children:[
            {
                key:"manage-users",
                label:<Link to="/lga/users"><b>Manage Users</b></Link>,
                icon:<RiUserSettingsLine/>
            },
            {
                key:"new-users",
                label:<Link to="/lga/unregistered/users"><b>New Applications</b></Link>,
                icon:<FaUserPlus/>
            }
        ]
    },
    {
        key:"business",
        label:<b>Businesses</b>,
        icon:<BsFillBuildingsFill/>,
        children:[
            {
                key:"manage-business",
                label:<Link to="/lga/businesses"><b>Manage Businesses</b></Link>,
                icon:<BsShopWindow/>
            },
        ]
    },
    {
        key:"invoices",
        label:<Link to="/lga/invoices"><b>Invoices</b></Link>,
        icon:<FaFileInvoiceDollar/>
    },
    {
        key:"payments",
        label:<Link to="/lga/payments"><b>Payments</b></Link>,
        icon:<BsPaypal/>
    },
    // {
    //     key:"report",
    //     label:<Link to="/admin/reports"><b>Profile</b></Link>,
    //     icon:<UserOutlined/>
    // }
]





export default function LgaAdminDashboardLayout(){
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
                        height:"5em",
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor:"white",
                        borderBottom:"1px solid white",
                        justifyContent:"space-between"
                        }}
                    >
                        <img src={Logo} style={{width:"10%",height:"100%",backgroundSize:"cover"}} alt="portal-logo"/>
                        <Tooltip title="logout">
                        <Button style={{background:"rgba(0,0,0,0.3)"}} type="text" onClick={handleLogout}>
                            <Avatar size={24} src={<FaUserCircle/>}/>
                        </Button>
                    </Tooltip>
                </Header>
                <Layout>
        <Sider
          width={350}
          style={{
            backgroundColor:"#008000",
          }}
        >
          <Menu
            mode="inline"
            style={{
              height: '92vh',
              overflowY:"scroll",
              borderRight: 0,
              backgroundColor:"#008000",
              color:"white"
            }}
            items={SIDEBAR_MENU_ITEMS}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 0 0 12px',
          }}
        >
             <Content
            style={{
              padding: 24,
              margin: 0,
              height: "calc(100vh - 5em)",
              background: "rgba(0,0,0,0.02)",
              overflowY:"scroll"
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
        </Layout>
        </Layout>
        </>
    )
}