import { Breadcrumb,Typography,Button,Select,Modal, Spin,message, Form, Input, Space} from "antd"
import { MdLocationPin } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useContext,useRef} from "react";
import RefreshContext from "../../context/refreshContext";
import { PlusOutlined} from "@ant-design/icons";
import { useCreateLga, useDeleteLga, useLgas, useUpdateLga } from "../../hooks/lga";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useDistricts } from "../../hooks/district";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";



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
                <MdLocationPin/>
                Local Government Area
            </>
        )
    }
];


const LGA_COLS = [
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
        title:"Local Government Area",
        key:"value",
        dataIndex:"value"
    },
    {
        title:"District",
        key:"district",
        dataIndex:"District",
        render:(d)=>d.name
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,lga)=><LGAEdit lga={lga}/>
    }
];


function NoDataComponent(){
    return(
        <h4>click search to view data</h4>
    )
}



function LGAEdit({lga}){
    const [isOpen,setIsOpen] = useState(false);
    const {flag,setFlag} = useContext(RefreshContext);
    const [district,setDistrict] = useState(lga.DistrictId)

    const deleteLGA = useDeleteLga();
    const updateLGA = useUpdateLga();

    const titleRef = useRef(null);
    const valueRef = useRef(null);
    const {districts} = useDistricts();

    const handleDelete = async ()=>{
        await deleteLGA(lga.id);
        message.success("Local government area deleted successfully");
        setFlag(!flag);
    }


   
    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef),
            DistrictId:district.toString()
        }
        const response = await updateLGA(lga.id,payload);
        message.success(response.message??"Local government area updated successfully");
        setIsOpen(false);
        setFlag(!flag);
    }


    return(
        <>
            <Space>
                <Button icon={<BiEdit/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}/>
                <Button icon={<BsTrash/>} type="primary" danger onClick={handleDelete}/>
            </Space>
            <Modal title="Update L.G.A" footer={null} onCancel={()=>setIsOpen(false)} open={isOpen}>
            <div>
                    <Form initialValues={{...lga}}>
                        <Form.Item name="title">
                            <Input ref={titleRef} placeholder="enter title"/>
                        </Form.Item>
                        <Form.Item name="value">
                            <Input ref={valueRef} placeholder="enter local govt area name"/>
                        </Form.Item>
                        <Form.Item name="DistrictId">
                            <Select placeholder="select L.G.A district" onChange={(e)=>setDistrict(e)}>
                                {
                                    districts.map((d,idx)=>(
                                        <Option key={idx} value={d.id}>{d.name}</Option>
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





export default function LocalGovernmentAreas(){
    const [isOpen,setIsOpen] = useState(false);
    const [district,setDistrict] = useState("");
    const [tempData,setTempData] = useState([]);


    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const {loading,lgas} = useLgas(flag);
    const createLga = useCreateLga();

    const {districts} = useDistricts();


    function handleFilter(search){
        if(!search){
            setTempData([...lgas])
            return;
        }
       const t = lgas.filter(l=>l.value.toLowerCase() === search);
        setTempData(t);
        return;
    }

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef),
            DistrictId:district.toString()
        }
        const response = await createLga(payload);
        message.success(response??"Local Government Area created successfully");
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
                    Local Government Areas
                </Title>
                <div>
                    <Button icon={<PlusOutlined/>} type="primary" style={{backgroundColor:"#008000"}} onClick={()=>setIsOpen(true)}>
                        Add Local Government Area
                    </Button>
                </div>
            </div>
            <div style={{width:"100%",display:"flex",justifyContent:"center",marginBlock:"2em"}}>
                <div style={{height:"4em",width:"50%",backgroundColor:"white",padding:"1em 2em",display:"flex",justifyContent:"center",boxShadow:"0px 3px 21px -1px rgba(0,0,0,0.75)"}}>
                    <div style={{}}>
                        Search :
                        <Input.Search style={{width:"10em",marginLeft:"1em"}} onSearch={handleFilter}
                          />
                    </div>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={tempData} cols={LGA_COLS} locale={{
                        emptyText:<NoDataComponent/>
                    }}/>
                </Spin>
            </div>
            <Modal footer={null} title="Create L.G.A" open={isOpen} onCancel={()=>setIsOpen(false)}>
                <div>
                    <Form>
                        <Form.Item>
                            <Input ref={titleRef} placeholder="enter title"/>
                        </Form.Item>
                        <Form.Item>
                            <Input ref={valueRef} placeholder="enter local govt area name"/>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="select L.G.A district" onChange={(e)=>setDistrict(e)}>
                                {
                                    districts.map((d,idx)=>(
                                        <Option key={idx} value={d.id}>{d.name}</Option>
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