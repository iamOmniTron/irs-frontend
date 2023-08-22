import {Row,Col,Button,Form,Typography,Image, Avatar, Input, Card, Space, Steps, Select, DatePicker, InputNumber, Result} from "antd"
import Logo from "../../assets/nsirs.webp";
import {BackwardOutlined,CheckOutlined,ForwardOutlined,LockOutlined,LoadingOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    const [submittable,setSubmittable] = useState(false);

    const values = Form.useWatch([],form);

    useEffect(()=>{
        form.validateFields({
            validateOnly:true
        }).then(()=>{setSubmittable(true)},()=>setSubmittable(false))
    },[values])


    return(
        <Button htmlType="submit" disabled={!submittable} icon={step == (steps.length -1)?<CheckOutlined/>:<ForwardOutlined/>} size="large" type="primary" style={{borderRadius:0,backgroundColor:`${!submittable? "gray":"#1677ff"}`,border:0}} onClick={next}>
            {step == (steps.length -1) ? "Confirm":"Next"}
        </Button>
    )
}



export default function RegisterUser(){
    const [currentStep,setCurrentStep] = useState(0);

    const [form] = Form.useForm();

    const next = ()=>{
        if(currentStep == (steps.length -1)) return;
        setCurrentStep((s)=>s+1)
    }

    const prev = ()=>{
        if(currentStep == 0) return;
        setCurrentStep((s)=>s-1)
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
                    {
                        currentStep == 0 && (
                    <Form form={form} name="validateOnly">
                    <Row gutter={8} style={{height:"5em"}}>
                        <Col span={8}>
                            <Form.Item name="firstname" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input placeholder="enter firstname"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="lastname" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input placeholder="enter lastname"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="phone" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input placeholder="enter phone number"/>
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
                                <Input type="email" placeholder="enter email"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="password" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input.Password placeholder="enter password"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item name="confirmPassword" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                            ]}>
                                <Input.Password placeholder="re-enter password"/>
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
                                <Input placeholder="enter address"/>
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
                                <Select placeholder="select gender">
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
                                <Input placeholder="enter home town"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    </Form>
                        )
                    }
                    {
                        currentStep === 1  && (
                            <Form form={form} style={{marginTop:"1em"}}>
                                <Form.Item name="businessName" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                                ]}>
                                    <Input placeholder="enter business name"/>
                                </Form.Item>
                                <Form.Item name="businessAdress" rules={[
                                {
                                    required:true,
                                    message:"This field is required"
                                }
                                ]}>
                                    <Input placeholder="enter business address"/>
                                </Form.Item>
                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item name='lga' rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                                <Select placeholder="select local government area business is situated at">
                                                    <Option value="lafia">Lafia</Option>
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
                                                <InputNumber prefix={"₦"} step={100} style={{width:"100%"}} placeholder="enter annual turn over (ATO) amount"/>
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
                                            <DatePicker placeholder="enter establishment date" style={{width:"100%"}} picker="date"/> 
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="duration" rules={[
                                            {
                                                required:true,
                                                message:"This field is required"
                                            }
                                            ]}>
                                            <Select placeholder="select payment duration">
                                                <Option value="weekly">weekly</Option>
                                                <Option value="monthly">monthly</Option>
                                                <Option value="yearly">yearly</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }
                    {
                        currentStep === (steps.length -1) && (
                            <div>
                                <Result 
                                icon={<LoadingOutlined />}
                                status={"success"}
                                title="Confirming Registration..."
                                extra={[
                                    <Button type="primary" style={{backgroundColor:"#1677ff"}}>
                                        Confirm
                                    </Button>
                                ]}
                                />
                            </div>
                        )
                    }
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