import { Breadcrumb,Typography,Button,Select,Modal, Spin,message, Form, Input, Space} from "antd"
import { MdFormatSize, MdLocationPin } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useContext,useRef} from "react";
import RefreshContext from "../../context/refreshContext";
import { PlusOutlined} from "@ant-design/icons";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useCreateSize, useDeleteSize, useSizes, useUpdateSize } from "../../hooks/size";


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
                <MdFormatSize/>
                Business Size
            </>
        )
    }
];


const SIZE_COLS = [
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
        title:"Business Size",
        key:"value",
        dataIndex:"value"
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,size)=> <SizeEdit size={size}/>
    }
]


function SizeEdit({size}){
    const [isOpen,setIsOpen] = useState(false);
    
    const {flag,setFlag} = useContext(RefreshContext);

    const deleteSize = useDeleteSize();
    const updateSize = useUpdateSize();
    
    const titleRef = useRef(null);
    const valueRef = useRef(null);


    const handleDelete = async ()=>{
        await deleteSize(size.id);
        message.success("size deleted successfully");
        setFlag(!flag);
    }

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await updateSize(size.id,payload);
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
            <Modal title="Update Business Size" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                <Form initialValues={{...size}}>
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


export default function Size(){
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const {loading,sizes} = useSizes(flag);
    const createSize = useCreateSize();

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await createSize(payload);
        message.success(response??"Business size created successfully");
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
                    
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}>
                        Create Size
                    </Button>
                </div>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable data={sizes} cols={SIZE_COLS}/>
                </Spin>
            </div>
            <Modal title="Create Business Size" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
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