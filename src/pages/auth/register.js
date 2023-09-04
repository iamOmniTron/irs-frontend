import {Row,Col,Button,Form,Typography,Avatar, Input, Card, Space, Steps, Select, DatePicker, Result,message} from "antd"
import Logo from "../../assets/nsirs.webp";
import {BackwardOutlined,CheckOutlined,ForwardOutlined,LockOutlined,LoadingOutlined} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSizes } from "../../hooks/size";
import { useCategories } from "../../hooks/category";
import { useLgas } from "../../hooks/lga";
import { useGtos } from "../../hooks/gto";
import { useBillings } from "../../hooks/billing";
import { useTypes } from "../../hooks/types";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useRegistration } from "../../hooks/auth";

const {Title} = Typography;
const {Option} = Select;

const steps = [
    {
        title:"User Information"
    },
    {
        title:"Business Information"
    },
    {
        title:"Done"
    }
];



const NextButton = ({form,next,step})=>{
    const [submittable,setSubmittable] = useState(true);

    const values = Form.useWatch([],form);

    // useEffect(()=>{
    //     form.validateFields({
    //         validateOnly:true
    //     }).then(()=>{setSubmittable(true)},()=>setSubmittable(false))
    // },[values])


    return(
        <Button htmlType="submit" disabled={!submittable} icon={step == (steps.length -1)?<CheckOutlined/>:<ForwardOutlined/>} size="large" type="primary" style={{borderRadius:0,backgroundColor:`${!submittable? "gray":"#1677ff"}`,border:0}} onClick={next}>
            {step == (steps.length -1) ? "Confirm":"Next"}
        </Button>
    )
}



export default function RegisterUser(){
    const [currentStep,setCurrentStep] = useState(0);
    const [loading,setLoading] = useState(false)
    const [gender,setGender] = useState("");
    const [size,setSize] = useState("");
    const [type,setType] = useState("");
    const [category,setCategory] = useState("");
    const [lga,setLga] = useState("");
    const [gto,setGto] = useState("");
    const [duration,setDuration] = useState("");
    const [estDate,setEstDate] = useState("");

    const navigate = useNavigate();
    const [form] = Form.useForm();


    const {sizes} = useSizes();
    const {categories} = useCategories();
    const {lgas} = useLgas();
    const {gtos} = useGtos();
    const {billings} = useBillings();
    const {types} = useTypes();

    const next = ()=>{
        if(currentStep == (steps.length -1)) return;
        setCurrentStep((s)=>s+1)
    }

    const prev = ()=>{
        if(currentStep == 0) return;
        setCurrentStep((s)=>s-1)
    }
    
    // REFS TO INPUTS
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const emailRef =  useRef(null);
    const phoneRef =  useRef(null);
    const passRef =  useRef(null);
    const confPassRef =  useRef(null);
    const homeTownRef =  useRef(null);
    const homeAddressRef =  useRef(null);
    const busnameRef =  useRef(null);
    const busAddRef =  useRef(null);

    const signup = useRegistration();



    const handleSubmit = async ()=>{
        setLoading(true)

        const userData = {
            firstname:extractValueFromInputRef(firstnameRef),
            lastname:extractValueFromInputRef(lastnameRef),
            email:extractValueFromInputRef(emailRef),
            phone:extractValueFromInputRef(phoneRef),
            password:extractValueFromInputRef(passRef),
            confirmPassword:extractValueFromInputRef(confPassRef),
            gender,
            homeTown:extractValueFromInputRef(homeTownRef),
            address:extractValueFromInputRef(homeAddressRef)
        };

        const businessData = {
            name:extractValueFromInputRef(busnameRef),
            address:extractValueFromInputRef(busAddRef),
            LocalGovernmentAreaId:lga.toString(),
            TaxId:gto.toString(),
            establishment:new Date(estDate),
            BillingDurationId:duration.toString(),
            SizeId:size.toString(),
            TypeId:type.toString(),
            CategoryId:category.toString()
        }
        const payload = {userData,businessData};
        await signup(payload);
        message.success("signup successful");
        setLoading(false);
        return navigate('/');
    }


    return(
        <>
            <Row style={{
                width:"100vw",
                height:"100vh",
                backgroundColor:"#008000",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <div style={{width:"15vw",marginBottom:"1em"}}>
                    <Avatar shape="square" src={Logo} size={90} style={{width:"100%"}}/>
                </div>
                <Title level={3} style={{color:"white",marginBottom:"1em"}}>User Registration</Title>
                <div style={{width:"57vw",textAlign:"end"}}>
                        <Link to="/" style={{color:"white"}}>
                            <LockOutlined />
                            Login
                        </Link>
                </div>
                <Card title={steps[currentStep].title} style={{width:"60vw",height:"50vh"}}>
                    <Form form={form} name="validateOnly" style={{display:`${currentStep === 0?"block":"none"}`}}>
                    <Row gutter={8} style={{height:"5em"}}>
                        <Col span={8}>
                            <Form.Item name="firstname" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input ref={firstnameRef} placeholder="enter firstname"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="lastname" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input ref={lastnameRef} placeholder="enter lastname"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="phone" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input ref={phoneRef} placeholder="enter phone number"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item name="email" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input ref={emailRef} type="email" placeholder="enter email"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="password" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input.Password ref={passRef} placeholder="enter password"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="confirmPassword" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input.Password ref={confPassRef} placeholder="re-enter password"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <Form.Item name="address" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input ref={homeAddressRef} placeholder="enter address"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item name="gender" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Select placeholder="select gender" onChange={(e)=>setGender(e)}>
                                    <Option value="male" key={1}>Male</Option>
                                    <Option value="female" key={2}>Female</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="hometown" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input ref={homeTownRef} placeholder="enter home town"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    </Form>
                            <Form form={form} style={{marginTop:"1em",display:`${currentStep === 1?"block":"none"}`}}>
                                <Form.Item name="businessName" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                                ]}>
                                    <Input ref={busnameRef} placeholder="enter business name"/>
                                </Form.Item>
                                <Form.Item name="businessAdress" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                                ]}>
                                    <Input ref={busAddRef} placeholder="enter business address"/>
                                </Form.Item>
                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item name='lga' rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                                <Select placeholder="select local government area business is situated at" onChange={(e)=>setLga(e)}>
                                                    {
                                                        lgas.map((l,idx)=>(
                                                            <Option value={l.id} key={idx}>{l.title}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                    <Form.Item name="ato" rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                                <Select placeholder="select annual turn over (ATO) amount" onChange={(e)=>setGto(e)}>
                                                    {
                                                        gtos.map((g,idx)=>(
                                                            <Option key={idx} value={g.Tax.id}>{g.title}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={12}>
                                    <Col span={8}>
                                        <Form.Item name="businessSize" rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                            <Select placeholder="select business size" onChange={(e)=>setSize(e)}>
                                                {
                                                    sizes.map((s,idx)=>(
                                                        <Option value={s.id} key={idx}>{s.title}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="category" rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                            <Select placeholder="select business category" onChange={(e)=>setCategory(e)}>
                                                {
                                                    categories.map((c,idx)=>(
                                                        <Option value={c.id} key={idx}>{c.value}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="type" rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                            <Select placeholder="select business type" onChange={(e)=>setType(e)}>
                                                {
                                                    types.map((t,idx)=>(
                                                        <Option value={t.id} key={idx}>{t.title}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item name="establishment date" rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                            <DatePicker onChange={(_,v)=>setEstDate(v)} placeholder="enter establishment date" style={{width:"100%"}} picker="date"/> 
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="duration" rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                            <Select placeholder="select payment duration" onChange={(e)=>setDuration(e)}>
                                                {
                                                    billings.map((d,idx)=>(
                                                        <Option value={d.id} key={idx}>{d.duration}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <div style={{display:`${currentStep === (steps.length -1)?"block":"none"}`}}>
                                <Result 
                                icon={<LoadingOutlined />}
                                status={"success"}
                                title="Confirming Registration..."
                                extra={[
                                    <Button loading={loading} key={1}  onClick={handleSubmit} type="primary" style={{backgroundColor:"#1677ff"}}>
                                        Confirm
                                    </Button>
                                ]}
                                />
                            </div>
                </Card>
                <div style={{width:"58vw",margin:"1em 0"}}>
                    <Steps current={currentStep} items={steps}/>
                </div>
                <Form>
                <Space style={{marginTop:"1em",display:"flex",justifyContent:"space-between",width:"55vw"}}>
                    <Button icon={<BackwardOutlined />} danger size="large" type="primary" style={{borderRadius:0,border:0}}onClick={prev}>
                        Back
                    </Button>
                    <NextButton form={form} next={next} step={currentStep}/>
                </Space>
                </Form>
            </Row>
        </>
    )
}