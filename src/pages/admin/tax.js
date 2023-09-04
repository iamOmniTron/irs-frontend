import { Breadcrumb,Typography,Button,Space,Form,Spin,message,Modal,Input, Select, InputNumber,} from "antd";
import DataTable from "../../components/table";
import { BsGraphUpArrow, BsTrash } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { PlusOutlined } from "@ant-design/icons";

import { useState,useContext,useRef } from "react";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BiEdit } from "react-icons/bi";
import { FaCoins } from "react-icons/fa6";
import { useCreateTax, useDeleteTax, useTaxes, useUpdateTax } from "../../hooks/tax";
import { PERCENT } from "../../utils/defaults";
import { useGtos } from "../../hooks/gto";


const {Option} = Select;
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
                <FaCoins/>
                Company Income Tax Rates
            </>
        )
    }
];



const CIT_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"Gross Turnover",
        key:"gto",
        dataIndex:"GrossTurnOver",
        render:(g)=>g.title
    },
    {
        title:"Tax name",
        key:"value",
        dataIndex:"value"
    },
    {
        title:"Percentage",
        key:"percentage",
        dataIndex:"percentage",
        render:(p)=>`${p}${PERCENT}`
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,tax)=> <TaxEdit tax={tax}/>
    }
]






function TaxEdit({tax}){
    const [isOpen,setIsOpen] = useState(false);
    const [gto,setGto] = useState(tax.GrossTurnOverId);

    
    const {flag,setFlag} = useContext(RefreshContext);
    const titleRef = useRef(null);
    const valueRef = useRef(null);
    const percentageRef = useRef(null);


    const deleteTax = useDeleteTax();
    const updateTax  = useUpdateTax();
    const {gtos} = useGtos();


    const handleDelete = async ()=>{
        await deleteTax(tax.id);
        message.success("Tax deleted successfully");
        setFlag(!flag);
    }

    
    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef),
            percentage:+percentageRef.current.value,
            gto:+gto
        }
        const response = await updateTax(tax.id,payload);
        message.success(response.message??"Tax updated successfully");
        setIsOpen(false);
        setFlag(!flag);
    }

    return(
        <>
            <Space>
                <Button type="primary" icon={<BiEdit/>} onClick={()=>setIsOpen(true)}/>
                <Button onClick={handleDelete} type="primary" icon={<BsTrash/>} danger/>
            </Space>
            <Modal title="Update Company Income Tax" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                    <Form initialValues={{...tax}}>
                        <Form.Item name="title">
                            <Input ref={titleRef} placeholder="enter title"/>
                        </Form.Item>
                        <Form.Item name="value">
                            <Input ref={valueRef} placeholder="enter value"/>
                        </Form.Item>
                        <Form.Item name="percentage">
                            <InputNumber suffix={PERCENT} style={{width:"100%"}} ref={percentageRef} placeholder="enter percentage value"/>
                        </Form.Item>
                        <Form.Item name="GrossTurnOver">
                            <Select onChange={(e)=>setGto(e)} placeholder="Select Gross Turnover to this Tax">
                                {
                                    gtos.map((g,idx)=>(
                                        <Option key={idx} value={g.id}>{g.value}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" style={{backgroundColor:"#008000"}} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}





export default function Taxes(){
    const [isOpen,setIsOpen] = useState(false);
    const [gto,setGto] = useState("");

    const {flag,setFlag} = useContext(RefreshContext);
    const {loading,taxes} = useTaxes(flag);
    const {gtos} = useGtos();
    const createTax = useCreateTax();

    const titleRef = useRef(null);
    const valueRef = useRef(null);
    const percentageRef = useRef(null);

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef),
            percentage:+percentageRef.current.value,
            gto:+gto
        }
        const response = await createTax(payload);
        message.success(response??"Tax Added successfully");
        setIsOpen(false);
        setFlag(!flag);
    }

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
                  <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    Company Income Tax (CIT) Rates
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}>
                        Add CIT
                    </Button>
                </div>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable cols={CIT_COLS} data={taxes} />
                </Spin>
            </div>
            <Modal title="Create Company Income Tax" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                    <Form>
                        <Form.Item>
                            <Input ref={titleRef} placeholder="enter title"/>
                        </Form.Item>
                        <Form.Item>
                            <Input ref={valueRef} placeholder="enter value"/>
                        </Form.Item>
                        <Form.Item>
                            <InputNumber suffix={PERCENT} style={{width:"100%"}} ref={percentageRef} placeholder="enter percentage value"/>
                        </Form.Item>
                        <Form.Item>
                            <Select onChange={(e)=>setGto(e)} placeholder="Select Gross Turnover to this Tax">
                                {
                                    gtos.map((g,idx)=>(
                                        <Option key={idx} value={g.id}>{g.value}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" style={{backgroundColor:"#008000"}} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}


