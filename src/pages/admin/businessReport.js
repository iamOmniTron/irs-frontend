import { Breadcrumb,Typography,Spin, Button, Tag, Form, Input, message, Space, Row, Col, Avatar, Descriptions } from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { EyeOutlined, PlusOutlined, ShopOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { BsPaypal, BsShopWindow, BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { NAIRA, PERCENT } from "../../utils/defaults";
import { formatCurrency, getPercentageRatio,groupBy } from "../../utils/helpers";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useBusinesses } from "../../hooks/business";
import { useNavigate, useLocation, } from "react-router-dom";
import { useLGAPayments } from "../../hooks/payment";
import { ResponsiveContainer,Pie,PieChart, Legend, Tooltip, Cell } from "recharts";
import { COLORS } from "../../utils/defaults";

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
                Business
            </>
        )
    }
];




export default function BusinessReport(){


    const {state:business} = useLocation();
    const {payments} = useLGAPayments(business.LocalGovernmentAreaId);

    let total = 0;
    payments.forEach(p=>{
        total +=p.amount;
    })

    const lgaPayments = payments.map((p)=>({business:{id:p.Invoice.BusinessId,name:p.Invoice.Business.name},amount:p.amount}))




    const grouped = groupBy(lgaPayments,l=>l.business.id)

    const main = {
        name:grouped[business.id] && grouped[business.id][0].business.name,
        amount:grouped[business.id] && grouped[business.id].map(b=>b.amount).reduce((prev,curr)=>prev+curr,0)
    }

    const CHART_DATA = [
        {
            "name":main.name??business.name,
            "amount":main.amount
        },
        {
            "name":"Others",
            "amount":+(total - main.amount)
        }
    ];
    // console.log(CHART_DATA)

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
                <Row gutter={16} style={{height:"30vh"}}>
                    <Col span={6}>
                        <Avatar style={{backgroundColor:"white"}} shape="square" icon={<ShopOutlined style={{color:"green",fontSize:200}}/>} size={200}/>
                    </Col>
                    <Col span={18}>
                        <Descriptions title="BUSINESS INFORMATION" column={2}>
                            <Descriptions.Item label="name">
                                {business.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="address">
                                {business.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="size">
                                {business.Size.title}
                            </Descriptions.Item>
                            <Descriptions.Item label="tax identification number (TIN)">
                                {business.User.tin}
                            </Descriptions.Item>
                            <Descriptions.Item label="L.G.A">
                                {business.LocalGovernmentArea.value}
                            </Descriptions.Item>
                            <Descriptions.Item label="category">
                                {business.Category.title}
                            </Descriptions.Item>
                            <Descriptions.Item label="business type">
                                {business.Type.title}
                            </Descriptions.Item>
                            <Descriptions.Item label="payment duration">
                                {business.BillingDuration.duration}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={4}>
                    BUSINESS REPORT
                </Title>
            </div>
            <Row style={{height:"30vh"}} gutter={24}>
                <Col span={8} style={{height:"100%"}}>
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <PieChart width={700} height={600}>
                        <Pie data={CHART_DATA} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#008000" label={(c)=>c.name}>
                            {
                                CHART_DATA.map((_,idx)=>(
                                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]}/>
                                ))
                            }
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col span={16}>
                    <Descriptions column={1} title={`${business.LocalGovernmentArea.value} L.G.A Generated Revenue`}>
                        <Descriptions.Item label="Total Revenue Generated By L.G.A">
                            <b style={{color:"green"}}>{NAIRA} {formatCurrency(total)}</b>
                        </Descriptions.Item>
                        <Descriptions.Item label={`Total Revenue Generated By ${business.name} in LGA`}>
                            <b style={{color:"green"}}>{NAIRA} {formatCurrency(main.amount??0)}</b>
                        </Descriptions.Item>
                        <Descriptions.Item label={`% of Business Revenue in ${business.LocalGovernmentArea.value} L.G.A`}>
                            <b style={{color:"green"}}>{!isNaN(getPercentageRatio(main.amount,total))?getPercentageRatio(main.amount,total):0 } {PERCENT}</b>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </>
    )
}

