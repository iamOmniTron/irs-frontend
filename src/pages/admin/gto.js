import { Breadcrumb,Typography,Button,Space,Form,Spin,message,Modal,Input,} from "antd";
import DataTable from "../../components/table";
import { BsGraphUpArrow, BsTrash } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateGto, useDeleteGto, useGtos, useUpdateGto } from "../../hooks/gto";
import { useState,useContext,useRef } from "react";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BiEdit } from "react-icons/bi";

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
                <BsGraphUpArrow/>
                Annual Gross Turnover Configuration
            </>
        )
    }
];


const GTO_COLS = [
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
        key:"value",
        dataIndex:"value"
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,turnover)=> <TurnOverEdit turnover={turnover}/>
    }
]



function TurnOverEdit({turnover}){
    const [isOpen,setIsOpen] = useState(false);

    
    const {flag,setFlag} = useContext(RefreshContext);

    const deleteTurnover = useDeleteGto();
    const updateTurnover = useUpdateGto();

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const handleDelete = async ()=>{
        await deleteTurnover(turnover.id);
        message.success("turnover config deleted successfully");
        setFlag(!flag);
    }


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await updateTurnover(turnover.id,payload);
        message.success(response.message??" updated successfully");
        setIsOpen(false);
        setFlag(!flag);
    }

    return(
        <>
            <Space>
                <Button type="primary" icon={<BiEdit/>} onClick={()=>setIsOpen(true)}/>
                <Button onClick={handleDelete} type="primary" icon={<BsTrash/>} danger/>
            </Space>
            <Modal title="Update District" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                <Form initialValues={{...turnover}}>
                        <Form.Item name="title">
                            <Input ref={titleRef} placeholder="enter title"/>
                        </Form.Item>
                        <Form.Item name="value">
                            <Input ref={valueRef} placeholder="enter value"/>
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



export default function TurnOvers(){
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const {loading,gtos} = useGtos(flag);
    const createGto = useCreateGto();


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await createGto(payload);
        message.success(response??"Gross Turnover Configuration created successfully");
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
                    Annual Gross Turnovers
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}>
                        Add Config
                    </Button>
                </div>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable cols={GTO_COLS} data={gtos} />
                </Spin>
            </div>
            <Modal title="Create Annual Turn over config" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                    <Form>
                        <Form.Item>
                            <Input ref={titleRef} placeholder="enter title"/>
                        </Form.Item>
                        <Form.Item>
                            <Input ref={valueRef} placeholder="enter value"/>
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