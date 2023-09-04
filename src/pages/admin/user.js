import { Breadcrumb,Typography,Spin, Button, Modal, Form, Input, message, Space, Card, Descriptions } from "antd"
import { FaMapLocationDot } from "react-icons/fa6"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import {useState,useRef,useContext} from "react";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

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
                <UserOutlined/>
                User
            </>
        )
    }
];



export default function User(){
    const {state:user} = useLocation();
    const navigate = useNavigate();

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    User Details
                </Title>
            </div>
            <div style={{marginTop:"2em"}}>
                <Card style={{height:"40vh"}}>
                    <Descriptions column={2}>
                        <Descriptions.Item span={2} contentStyle={{fontSize:15,fontWeight:"bold"}} label="Fullname">
                            {user.firstname} {user.lastname}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Tax Identity Number (TIN)">
                            {user.tin}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="E-mail">
                            {user.email}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Phone number">
                            {user.phone}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="gender">
                            {user.gender}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Contact Address">
                            {user.address}
                        </Descriptions.Item>
                        <Descriptions.Item contentStyle={{fontSize:15,fontWeight:"bold"}} label="Home Town">
                            {user.homeTown}
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{marginTop:"2em"}}>
                        <Button type="primary" style={{backgroundColor:"#008000"}} onClick={()=>navigate(-1)}>
                            Go Back
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    )
}