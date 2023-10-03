import { Avatar, Descriptions,QRCode,Typography } from "antd";
import Logo from "../assets/nsirs.webp"
import { NAIRA } from "../utils/defaults";
import { convertToWords, formatCurrency } from "../utils/helpers";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";


const {Title} = Typography;


export default function PaymentReciept(){

    const {state:payment} = useLocation();

    if(!payment){
        return <Navigate to={"/"}/>
    }

    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
                backgroundColor:"lightgray",
                paddingBlock:"2em",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>

                <div style={{
                    height:"90vh",
                    width:"50vw",
                    backgroundColor:"white",
                    borderRadius:"2px",
                    padding:"1em"
                }}>
                    <div style={{height:"12%",width:"20%"}}>
                        <Avatar src={Logo} shape="square" size={50} style={{width:"100%"}}/>
                    </div>
                    <Title level={4} style={{textAlign:"center"}}>PAYMENT RECIEPT</Title>
                    <div style={{height:"50vh",paddingInline:"2em",paddingTop:"1em"}}>
                        <Descriptions column={2}>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}  span={2} labelStyle={{fontWeight:"bold"}} label="Paid by">
                               {payment.Invoice.Business.User.gender === "male"?"Mr":"Mrs"} {payment.Invoice.Business.User.firstname} {payment.Invoice.Business.User.firstname}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}  span={2} labelStyle={{fontWeight:"bold"}} label="Business Name">
                                {payment.Invoice.Business.name}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}   span={2} labelStyle={{fontWeight:"bold"}} label="Amount">
                            {NAIRA} {formatCurrency(payment.amount)}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}   span={2} labelStyle={{fontWeight:"bold"}} label="Amount in Words">
                            {convertToWords(payment.amount)}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}  span={2} labelStyle={{fontWeight:"bold"}} label="Payment Date">
                                {new Date(payment.createdAt).toLocaleDateString("en-US",{month:"short",year:"numeric",day:"numeric"})}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}  span={2} labelStyle={{fontWeight:"bold"}} label="Invoice Number">
                                {payment.Invoice.invoiceNumber}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}  span={2} labelStyle={{fontWeight:"bold"}} label="Reference Number">
                                {payment.referenceNumber}
                            </Descriptions.Item>
                            <Descriptions.Item contentStyle={{fontWeight:"bold"}}  span={2} labelStyle={{fontWeight:"bold"}} label="Payment For">
                                Nasarawa State Internal Revenue Service 
                            </Descriptions.Item>
                           
                        </Descriptions>
                    </div>
                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <QRCode value="https:localhost:3000" size={100}/>
                        </div>
                </div>
            </div>
        </>
    )
}