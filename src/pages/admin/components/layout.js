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



const {Header,Sider,Content} = Layout;


const SIDEBAR_MENU_ITEMS = [
    {
        key:"overview",
        label:<Link to="/admin"><b>Overview</b></Link>,
        icon:<RxDashboard/>
    },
    {
        key:"users",
        label:<b>Users</b>,
        icon:<BsPeopleFill/>,
        children:[
            {
                key:"manage-users",
                label:<Link to="/admin/users"><b>Manage Users</b></Link>,
                icon:<RiUserSettingsLine/>
            },
            {
                key:"user-sessions",
                label:<Link to="/admin/users/sessions"><b>Login Activities</b></Link>,
                icon:<LiaBusinessTimeSolid/>
            },
            {
                key:"new-users",
                label:<Link to="/admin/users/new"><b>New Applications</b></Link>,
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
                label:<Link to="/admin/business"><b>Manage Businesses</b></Link>,
                icon:<BsShopWindow/>
            },
            {
                key:"bus-category",
                label:<Link to={"/admin/category"}><b>Business Categories</b></Link>,
                icon:<SlOrganization/>
            },
            {
                key:"bus-size",
                label:<Link to="/admin/business-size"><b>Business Sizes</b></Link>,
                icon:<MdFormatSize/>
            },
            {
                key:"bus-type",
                label:<Link to="/admin/type"><b>Business Types</b></Link>,
                icon:<BsGlobe/>
            }
        ]
    },
    {
        key:"location",
        label:<b>Localities</b>,
        icon:<RiUserLocationFill/>,
        children:[
            {
                key:"district",
                label:<Link to="/admin/district"><b>Districts</b></Link>,
                icon:<FaMapLocationDot/>
            },
            {
                key:"lga",
                label:<Link to="/admin/lga"><b>Local Government Areas</b></Link>,
                icon:<MdLocationPin/>
            },
            {
                key:"admins",
                label:<Link to="/admin/lga/admin"><b>L.G.A Administrator</b></Link>,
                icon:<MdAdminPanelSettings/>
            }
        ]
    },
    {
        key:"invoices",
        label:<Link to="/admin/invoice"><b>Invoices</b></Link>,
        icon:<FaFileInvoiceDollar/>
    },
    {
        key:"payments",
        label:<Link to="/admin/payment"><b>Payments</b></Link>,
        icon:<BsPaypal/>
    },
    // {
    //     key:"explorer",
    //     label:<Link><b>Blockchain Explorer</b></Link>,
    //     icon:<CgLink/>
    // },
    {
        key:"config",
        label:<b>Configurations</b>,
        icon:<FaCog/>,
        children:[
            {
                key:'taxes',
                label:<Link to="/admin/cit"><b>Company Income Tax (CIT)</b></Link>,
                icon:<FaCoins/>
            },
            {
                key:"turnover",
                label:<Link to="/admin/gto"><b>Annual Gross Turnover (GTO)</b></Link>,
                icon:<BsGraphUpArrow/>
            }
        ]
    },
    {
        key:"report",
        label:<Link to="/admin/reports"><b>Report</b></Link>,
        icon:<GoReport/>
    }
]





export default function AdminDashboardLayout(){
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