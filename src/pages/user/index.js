import { UserOutlined,ShopOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb,Button,Card,Col,Descriptions,Divider,Modal,Row,Typography,Form,Input,InputNumber,DatePicker,message } from "antd";
import { BsPaypal } from "react-icons/bs";
import {FcAlarmClock} from "react-icons/fc"
import { RxDashboard } from "react-icons/rx";
import {HiOutlineBuildingOffice2} from "react-icons/hi2"
import { getUserProfile, userStore } from "../../store/userStore";
import { NAIRA } from "../../utils/defaults";
import { useState } from "react";
import { extractNumberFromWord, formatCurrency, getAmountToPay, getUpperBoundAGTO } from "../../utils/helpers";
import { useCreateInvoice } from "../../hooks/invoice";
import { useCreatePayment } from "../../hooks/payment";


const {Title} = Typography;


const BREADCRUMB_ITEMS = [
    {
        key:"1",
        title:(
            <>
            <RxDashboard/>
            Dashboard
            </>
        )
    }
]



export default function UserDashboard(){
    const [isOpen,setIsOpen] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [invoice,setInvoice] = useState(null);
    const [isPending,setIsPending] = useState(false);

    const generateInvoice = useCreateInvoice();
    const makePayment = useCreatePayment();

    const currentUser = userStore(state=>state.user);
    const setUser = userStore(state=>state.setUser);

    const business = currentUser.Business;
    const billingDuration = business.BillingDuration;
    const tax = business.Tax;
    const annualTurnOver = tax.GrossTurnOver.title;

    const atoBound = getUpperBoundAGTO(annualTurnOver);
    const atoAmount = extractNumberFromWord(atoBound);
    const amountToPay = getAmountToPay(atoAmount,tax.percentage,billingDuration.duration);

    const IsNotPayable = new Date(business.nextPaymentDate).valueOf() > new Date(Date.now()).valueOf()


    const handleGenerateInvoice = async ()=>{
        if(invoice !== null||undefined){
            console.log("here")
            setIsOpen(true);
            return;
        };
        setIsPending(true);
        const payload = {amount:amountToPay}
        const data = await generateInvoice(payload);
        setInvoice(data);
        setIsPending(false);
        setIsOpen(true);
    }

    const handlePayment = async ()=>{
        if(!invoice) return message.error("Invalid Invoice, Regenerate another one");
        const payload = {invoiceId:invoice.id};
        const response = await makePayment(payload);
        const {password,...userData} = await getUserProfile();
        setUser(userData);
        message.success("Payment successful");
        setPaymentOpen(false);
        setIsOpen(false);
    }

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em"}}>
                <Title level={3}>
                    <b>{currentUser.firstname}</b> {currentUser.lastname}
                </Title>
            </div>
            <Row gutter={24}>
                <Col span={10}>
                    <Card>
                    <Divider orientation="left">
                        <Title level={4}>
                            <UserOutlined style={{color:"green"}}/>
                            User Details
                        </Title>
                        </Divider>
                        <div>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Fullname">
                                    <b>{currentUser.firstname} {currentUser.lastname}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="E-mail">
                                    <b>{currentUser.email}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Phone number">
                                   <b>{currentUser.phone}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Tax Identity Number (TIN)">
                                   <b>{currentUser.tin}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Home Address">
                                   <b>{currentUser.address}</b>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </Card>
                </Col>
                <Col span={14}>
                    <Card>
                        <Divider orientation="right">
                            <Title level={4}>
                                <ShopOutlined style={{color:"red"}}/>
                                Business Details
                            </Title>
                        </Divider>
                        <div>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Business name">
                                   <b>{currentUser.Business.name}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Establishment Date">
                                   <b>{new Date(currentUser.Business.establishment).toDateString()}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Business address">
                                  <b>{currentUser.Business.address}, {currentUser.Business.LocalGovernmentArea.title}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Business Category">
                                  <b>{currentUser.Business.Category.title}</b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Business Type">
                                  <b>{currentUser.Business.Type.title}</b>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Card style={{width:"100%",marginTop:"2em"}}>
                    <Row>
                        <Col span={4}>
                            <Avatar icon={<HiOutlineBuildingOffice2 style={{color:"#008000"}}/>} shape="square" size={200}/>
                        </Col>
                        <Col span={20}>
                            <Divider>
                                <Title level={4}>Payment enquiry</Title>
                            </Divider>
                            <Descriptions column={3}>
                                <Descriptions.Item label={`Payment Due Date`}>
                                    {new Date(currentUser.Business.nextPaymentDate).toDateString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Last payment">
                                    {currentUser.Business.lastPaymentDate ?new Date(currentUser.Business.lastPaymentDate).toDateString():"None"}
                                </Descriptions.Item>
                                <Descriptions.Item label="amount">
                                    {NAIRA} {formatCurrency(amountToPay)}
                                </Descriptions.Item>
                                <Descriptions.Item label="billing duration">
                                    <b>{currentUser.Business.BillingDuration.title}</b>
                                </Descriptions.Item>
                            </Descriptions>
                            <div style={{width:"20em"}}>
                                <Button disabled={IsNotPayable} loading={isPending} onClick={handleGenerateInvoice} style={{height:"3em",backgroundColor:"#008000"}} block type="primary" icon={<BsPaypal/>}>
                                    {IsNotPayable?"Payment Not Available":"Pay"}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Row>

            <Modal onCancel={()=>setIsOpen(false)} title="Payment Invoice" open={isOpen} footer={null}>
                <div>
                    <Descriptions column={1}>
                        <Descriptions.Item label="Invoice Number">
                            {invoice?.invoiceNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Amount">
                            {NAIRA} {formatCurrency(amountToPay)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Generated On">
                            {new Date(invoice?.createdAt).toDateString()}
                        </Descriptions.Item>
                    </Descriptions>
                    <div>
                        <Button onClick={()=>setPaymentOpen(true)} block size="large" icon={<BsPaypal/>} type="primary" style={{backgroundColor:"#008000"}}>
                            Proceed To Payment
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal width={500} centered onCancel={()=>setPaymentOpen(false)} title="Payment Details" open={paymentOpen} footer={null}>
                    <div style={{marginTop:"3em",maxHeight:"70vh",paddingLeft:"1em",paddingRight:"1em"}}>
                        <Form>
                            <Form.Item>
                                <Input readOnly placeholder="Enter your E-Mail address" value={currentUser.email}/>
                            </Form.Item>
                            <Form.Item rules={[
                                {
                                    required:true,
                                    message:"Card number is Required"
                                }
                            ]}>
                                <InputNumber style={{width:"100%"}} placeholder="Enter Card Number"/>
                            </Form.Item>
                            <Row gutter={4}>
                                <Col span={12}>
                                    <Form.Item rules={[
                                {
                                    required:true,
                                    message:"Card Expriration date is Required"
                                }
                            ]}>
                                        <DatePicker placeholder="Exp Date"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                <Form.Item rules={[
                                {
                                    required:true,
                                    message:"Card CVV is Required"
                                }
                            ]}>
                                    <InputNumber style={{width:"100%"}} placeholder="CVV"/>
                                </Form.Item>
                                </Col>
                            </Row>
                            <div style={{marginBottom:"1em",display:"flex",padding:"1em",justifyContent:"space-between",backgroundColor:"rgba(0,0,0,0.2)",borderRadius:"2px"}}>
                                <span>Total :</span>
                                <span style={{fontWeight:"bold"}}>{NAIRA} {formatCurrency(amountToPay)}</span>
                            </div>
                            <Form.Item>
                                <Button onClick={handlePayment} style={{height:"4em",backgroundColor:"green"}} block type="primary">
                                    Make Payment
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
            </Modal>
        </>
    )
}