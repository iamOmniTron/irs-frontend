import { Breadcrumb,Typography,Button,Select,Modal, Spin,message, Form, Input, Space} from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {formatCurrency, getPercentageRatio, groupBy } from "../../utils/helpers";
import { BiEdit } from "react-icons/bi";
import { NAIRA, PERCENT } from "../../utils/defaults";
import { BsTrash } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import {PieChart,Pie} from "recharts"
import {usePayments } from "../../hooks/payment";
import { EyeOutlined } from "@ant-design/icons";


const {Title} = Typography;



const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ]; 
  



  const DISTRICT_PAYMENTS_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"District",
        key:"district",
        dataIndex:"district",
    },
    {
        title:"Percentage (%)",
        key:"percentage",
        dataIndex:"percentage",
        render:(p)=>`${p}${PERCENT} of Total Revenue Generated in State`
    },
    {
        title:"Amount Generated So Far",
        key:"amount",
        dataIndex:"amount",
        render:(a)=> `${NAIRA} ${formatCurrency(a)}`
    },
    {
        title:"Actions",
        key:"action",
        render: ()=><ViewReport/>
    }
  ]


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
                <GoReport/>
                Business Categories
            </>
        )
    }
];


function ViewReport(){

    return(
        <>
            <Space>
                <Button icon={<EyeOutlined/>} type="primary" style={{backgroundColor:"#008000"}}/>
            </Space>
        </>
    )
}



export default function Reports(){

    const {payments} = usePayments();
    
    const groupedDistrictPayments = groupBy(payments,p=>p.Invoice.Business.LocalGovernmentArea.District.id)

    const total = payments.reduce((prev,curr)=>prev+curr.amount,0);

    const districtPaymentsArr = Object.keys(groupedDistrictPayments).map(k=>({
        district:groupedDistrictPayments[k]&&groupedDistrictPayments[k][0].Invoice.Business.LocalGovernmentArea.District.title,
        amount:groupedDistrictPayments[k] && groupedDistrictPayments[k].map(d=>d.amount).reduce((prev,curr)=>prev + curr,0),
        percentage:!isNaN(getPercentageRatio(groupedDistrictPayments[k] && groupedDistrictPayments[k].map(d=>d.amount).reduce((prev,curr)=>prev + curr,0),total))?getPercentageRatio(groupedDistrictPayments[k] && groupedDistrictPayments[k].map(d=>d.amount).reduce((prev,curr)=>prev + curr,0),total):0
    }))


    return (
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    REPORTS
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                {/* BAR CHART FOR TOTAL */}
                <DataTable data={districtPaymentsArr} cols={DISTRICT_PAYMENTS_COLS}/>
            </div>
            {/* DATA TABLE FOR LGAS REPORT */}
            <div>   
                {/* <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#008000" label/>
                </PieChart> */}
            </div>
        </>
    )
}