import { Breadcrumb,Typography, } from "antd"
import { FaMapLocationDot } from "react-icons/fa6"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import { useLocation } from "react-router-dom";



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
                <FaMapLocationDot/>
                District
            </>
        )
    }
];


const DISTRICT_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"title",
        dataIndex:"value"
    },
    {
        title:"Local government Area",
        key:"value",
        dataIndex:"title"
    },
];




export default function DistrictLGA(){
    const {state} = useLocation();
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    Local Government Areas In {(state.name).toUpperCase()}
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>    
                    <DataTable data={state.LocalGovernmentAreas} cols={DISTRICT_COLS}/>
            </div>
        </>
    )
}
