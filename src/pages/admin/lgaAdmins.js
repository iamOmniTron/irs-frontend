import { Breadcrumb,Typography,Spin, Button, Modal, Form, Input, message, Space,Select } from "antd"
import { MdAdminPanelSettings } from "react-icons/md"
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
import { useAdmins, useCreateAdmin, useDeleteAdmin } from "../../hooks/admin";
import { useLgas } from "../../hooks/lga";



const {Title} = Typography;

const {Option} = Select;



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
                <MdAdminPanelSettings/>
                Administrators
            </>
        )
    }
];



const ADMINS_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        render:(_,{firstname,lastname})=>`${firstname} ${lastname}`
    },
    {
        title:"E-mail",
        key:"email",
        dataIndex:"email"
    },
    {
        title:"Phone",
        key:"phone",
        dataIndex:"phone"
    },
    {
        title:"Local Government Area",
        key:"lga",
        dataIndex:"LocalGovernmentArea",
        render:(l)=>l.title
    },
    {
        title:"Action",
        key:"actions",
        render:(_,admin)=><AdminEdit admin={admin}/>
    }
]


function AdminEdit({admin}){

    const deleteAdmin = useDeleteAdmin();
    const {flag,setFlag} = useContext(RefreshContext);

    const handleDelete = async ()=>{
        const res = await deleteAdmin(admin.id);
        message.success(res.message??"Deleted successfully");
        setFlag(!flag)
    }


    return(
        <>
            <Space>
                <Button onClick={handleDelete} icon={<BsTrash/>} danger type="primary"/>
            </Space>
        </>
    )
}





export default function LgaAdmins(){
    const [isOpen,setIsOpen] = useState(false);
    const [lgaId,setLgaId] = useState("");

    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);



    const {lgas} = useLgas();

    const createAdmin = useCreateAdmin();
    
    const {flag,setFlag} = useContext(RefreshContext);


    const handleSubmit = async ()=>{
        const payload = {
            firstname:extractValueFromInputRef(firstnameRef),
            lastname: extractValueFromInputRef(lastnameRef),
            email:extractValueFromInputRef(emailRef),
            phone:extractValueFromInputRef(phoneRef),
            lgaId
        };
        const response = await createAdmin(payload);
        console.log(response)
        setIsOpen(false);
        message.success(response.message??"Admin created successfully");
        setFlag(!flag);
    }


    const {admins,loading} = useAdmins(flag)
    return(
        <>
             <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    Administrators
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" onClick={()=>setIsOpen(true)} style={{backgroundColor:"#008000"}} >
                        Add Administrator
                    </Button>
                </div>
            </div>
            <div style={{marginTop:"2em"}}>
                <Spin spinning={loading}>    
                    <DataTable cols={ADMINS_COLS} data={admins}/>
                </Spin>
            </div>
            <Modal title="Create L.G.A Admin" open={isOpen} footer={null} onCancel={()=>setIsOpen(false)}>
                <div>
                    <Form>
                        <Form.Item>
                            <Input ref={firstnameRef} placeholder="Enter firstname"/>
                        </Form.Item>
                        <Form.Item>
                            <Input ref={lastnameRef} placeholder="Enter lastname"/>
                        </Form.Item>
                        <Form.Item>
                            <Input ref={emailRef} placeholder="Enter email"/>
                        </Form.Item>
                        <Form.Item>
                            <Input ref={phoneRef} placeholder="Enter phone number"/>
                        </Form.Item>
                        <Form.Item>
                            <Select onChange={(e)=>setLgaId(e)} placeholder="Select Local government area">
                                {
                                    lgas.map((l,idx)=>(
                                        <Option key={idx} value={l.id}>{l.title}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleSubmit} block type="primary" style={{backgroundColor:"#008000"}}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}