import { Breadcrumb,Typography,Spin, Button, Modal, Form, Input, message, Space } from "antd"
import { FaMapLocationDot } from "react-icons/fa6"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useCreateDistrict, useDeleteDistrict, useDistricts, useUpdateDistrict } from "../../hooks/district";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";



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
        title:"Title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"District Name",
        key:"value",
        dataIndex:"name"
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,district)=><DistrictEdit district={district}/>
    }
];






function DistrictEdit({district}){
    const [isOpen,setIsOpen] = useState(false);
    const {flag,setFlag} = useContext(RefreshContext);
    const deleteDistrict = useDeleteDistrict();
    const updateDistrict = useUpdateDistrict();

    const navigate = useNavigate();

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const handleDelete = async ()=>{
        await deleteDistrict(district.id);
        message.success("District deleted successfully");
        setFlag(!flag);
    }


    const navigateToLgas = ()=>{
        navigate("/admin/district/lga",{state:district})
    }


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            name:extractValueFromInputRef(valueRef)
        }
        const response = await updateDistrict(district.id,payload);
        message.success(response.message??"District updated successfully");
        setIsOpen(false);
        setFlag(!flag);
    }

    return(
        <>
            <Space>
                <Button icon={<BiEdit/>} type="primary" onClick={()=>setIsOpen(true)}/>
                <Button icon={<BsTrash/>} type="primary" onClick={handleDelete} danger/>
                <Button icon={<EyeOutlined/>} type="primary" style={{backgroundColor:"orange"}} onClick={navigateToLgas}/>
            </Space>
            <Modal title="Update District" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                    <Form initialValues={{...district}}>
                        <Form.Item name="title">
                            <Input ref={titleRef} placeholder="enter title"/>
                        </Form.Item>
                        <Form.Item name="name">
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





export default function District(){
    const [isOpen,setIsOpen] = useState(false);



    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const {loading,districts} = useDistricts(flag);

    const createDistrict = useCreateDistrict();


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            name:extractValueFromInputRef(valueRef)
        }
        const response = await createDistrict(payload);
        message.success(response??"District created successfully");
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
                    Districts
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}>
                        Add District
                    </Button>
                </div>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable data={districts} cols={DISTRICT_COLS}/>
                </Spin>
            </div>
            <Modal title="Create District" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
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