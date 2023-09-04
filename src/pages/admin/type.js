import { Breadcrumb,Typography,Button,Select,Modal, Spin,message, Form, Input, Space} from "antd"
import { MdFormatSize, MdLocationPin } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useContext,useRef} from "react";
import RefreshContext from "../../context/refreshContext";
import { PlusOutlined} from "@ant-design/icons";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BiEdit } from "react-icons/bi";
import { BsGlobe, BsTrash } from "react-icons/bs";
import { useCreateType, useDeleteType, useTypes, useUpdateType } from "../../hooks/types";


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
                <BsGlobe/>
                Business Size
            </>
        )
    }
];


const TYPE_COLS = [
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
        title:"Business Type",
        key:"value",
        dataIndex:"value"
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,type)=> <TypeEdit type={type}/>
    }
];



function TypeEdit({type}){
    const [isOpen,setIsOpen] = useState(false);
    
    const {flag,setFlag} = useContext(RefreshContext);
    const deleteType = useDeleteType();
    const updateType =  useUpdateType();
    
    const titleRef = useRef(null);
    const valueRef = useRef(null);


    const handleDelete = async ()=>{
        await deleteType(type.id);
        message.success("type deleted successfully");
        setFlag(!flag);
    }

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await updateType(type.id,payload);
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
            <Modal title="Update Business Type" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                <Form initialValues={{...type}}>
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



export default function Type(){
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const {loading,types} = useTypes(flag);
    const createType = useCreateType();
    
    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await createType(payload);
        message.success(response??"Business type created successfully");
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
                    Business Type
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}>
                        Create Size
                    </Button>
                </div>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable data={types} cols={TYPE_COLS}/>
                </Spin>
            </div>
            <Modal title="Create Business Type" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
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