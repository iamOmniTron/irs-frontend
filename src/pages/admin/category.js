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
import { SlOrganization } from "react-icons/sl";
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from "../../hooks/category";



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
                <SlOrganization/>
                Business Categories
            </>
        )
    }
];


const CATEGORY_COLS = [
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
        title:"Business Category",
        key:"value",
        dataIndex:"value"
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,category)=> <CategoryEdit category={category}/>
    }
]




function CategoryEdit({category}){
    const [isOpen,setIsOpen] = useState(false);

    
    const {flag,setFlag} = useContext(RefreshContext);
    
    const titleRef = useRef(null);
    const valueRef = useRef(null);
    const deleteCategory = useDeleteCategory();
    const updateCategory = useUpdateCategory();

    
    const handleDelete = async ()=>{
        await deleteCategory(category.id);
        message.success("businessCategory deleted successfully");
        setFlag(!flag);
    }

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await updateCategory(category.id,payload);
        message.success(response.message??"business category updated successfully");
        setIsOpen(false);
        setFlag(!flag);
    }



    return(
        <>
             <Space>
                <Button type="primary" icon={<BiEdit/>} onClick={()=>setIsOpen(true)}/>
                <Button onClick={handleDelete} type="primary" icon={<BsTrash/>} danger/>
            </Space>
            <Modal title="Update Business Category" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                <Form initialValues={{...category}}>
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


export default function Category(){
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const {loading,categories} = useCategories(flag);
    const createCategory = useCreateCategory();

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        }
        const response = await createCategory(payload);
        message.success(response??"Business Category created successfully");
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
                    Business Category
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}>
                        Add Category
                    </Button>
                </div>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable cols={CATEGORY_COLS} data={categories} />
                </Spin>
            </div>
            <Modal title="Create Business Category" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
                <div>
                    <Form>
                        <Form.Item>
                            <Input ref={titleRef} placeholder="enter title e.g engineering, fashion"/>
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