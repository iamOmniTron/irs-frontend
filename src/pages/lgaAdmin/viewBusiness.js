import { Breadcrumb,Typography,Spin, Button, Tag, Form, Input, message, Space, Card, Descriptions } from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { PlusOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { BsPaypal, BsShopWindow, BsTrash } from "react-icons/bs";
import { BiEdit, BiSync } from "react-icons/bi";
import { NAIRA } from "../../utils/defaults";
import { formatCurrency } from "../../utils/helpers";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";


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
                <BsShopWindow/>
                Business Details
            </>
        )
    }
];


export default function LgaViewBusiness(){
    const {state:business} = useLocation();
    const navigate = useNavigate();

    const navigateToReport = ()=>navigate("/lga/business/report",{state:business});
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                  BUSINESS DETAILS
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Card style={{minHeight:"40vh"}}>
                    <Descriptions column={2} layout="vertical">
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Business Name">
                            {business.name}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Business Owner">
                        {business.User.gender === "male"?"Mr.":"Mrs."} {business.User.firstname} {business.User.lastname}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Tax Identification Number (TIN)">
                            {business.User.tin}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Local Government Area">
                            {business.LocalGovernmentArea.title}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Business Establishment">
                            {new Date(business.establishment).toDateString()}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Payment Duration">
                            {business.BillingDuration.duration}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} contentStyle={{fontSize:15,fontWeight:"bold"}} label="Business Annual Gross Turnover (GTO)">
                            {business.Tax.GrossTurnOver.value}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold",textTransform:"capitalize"}} label="Business Category">
                            {business.Category.value}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold",textTransform:"capitalize"}} label="Business Type">
                            {business.Type.value}
                        </Descriptions.Item>
                    </Descriptions>
                    <div>
                        <Button icon={<BiSync style={{fontSize:20}}/>} style={{backgroundColor:"#008000"}} type="primary" onClick={navigateToReport}>
                            Generate Report
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}