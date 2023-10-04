import { Breadcrumb,Typography,Spin } from "antd"
import DataTable from "../../components/table"
import { RxDashboard } from "react-icons/rx";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useLoginSessions } from "../../hooks/user";




const {Title} = Typography;


const BREADCRUMB_ITEMS = [
    {
        key:1,
        title:(
            <>
                <RxDashboard/>
                Overview
            </>
        )
    },
    {
        key:2,
        title:(
            <>
                <LiaBusinessTimeSolid/>
                Payments
            </>
        )
    }
];

const SESSION_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"User",
        key:"user",
        dataIndex:"User",
        render:(_,{User,isAdmin})=>isAdmin?"Administrator": `${User.firstname} ${User.lastname}`
    },
    {
        title:"Date",
        key:"date",
        dataIndex:"time",
        render:(t)=> new Date(t).toLocaleDateString("en-US",{weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})
    },
    {
        title:"Time",
        key:"time",
        dataIndex:"time",
        render:(t)=> new Date(t).toLocaleTimeString("en-US",{
            hour12:true,
            timeStyle:"short"
        })
    },

]



export default function Sessions(){
    const {loading,sessions} = useLoginSessions();

    const sortedSessions = sessions.sort((prev,next)=>next.id - prev.id)
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    Login Activities
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable data={sortedSessions} cols={SESSION_COLS} />
                </Spin>
            </div>
        </>
    )
}