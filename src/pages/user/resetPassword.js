import { Breadcrumb,Button,Form,Input,Typography,Card,Divider,message } from "antd";
import { RxDashboard } from "react-icons/rx";
import {AiFillSetting} from "react-icons/ai";
import {BsFillShieldLockFill} from "react-icons/bs"
import { useRef } from "react";
import { useResetPassword } from "../../hooks/auth";
import { extractValueFromInputRef } from "../../utils/helpers";


const {Title} = Typography;

const BREADCRUMB_ITEMS = [
    {
        key:1,
        title:(
            <>
                <RxDashboard/>
                Dashboard
            </>
        )
    },
    {
        key:2,
        title:(
            <>
                <AiFillSetting/>
                Settings
            </>
        )
    }
]




export default function ResetPassword(){

    const [form] = Form.useForm();

    const resetPassword = useResetPassword();

    const passRef = useRef(null);
    const newPassRef = useRef(null);
    const confPassRef = useRef(null);

    const handleSubmit = async ()=>{
        const payload = {
            currentPassword:extractValueFromInputRef(passRef),
            newPassword:extractValueFromInputRef(newPassRef),
            confirmPassword:extractValueFromInputRef(confPassRef)
        }
        await resetPassword(payload);
        message.success("Password reset successful");
        form.resetFields();
    }

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <Title level={4}>PASSWORD RESET</Title>
            <Card style={{width:"100%",padding:"1em",margin:"1em 0",minHeight:"50vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{width:"30vw"}}>
                    <Divider>
                    <Title level={4} style={{textAlign:"center",margin:"2em 0"}}>Reset Password <BsFillShieldLockFill/></Title>
                    </Divider>
                    <Form form={form} labelCol={{
                            span: 8,
                            }}
                            wrapperCol={{
                            span: 16,
                            }}>
                        <Form.Item name="pass" label="enter current password" rules={[
                            {
                            required: true,
                            message: 'field is required',
                            },
                        ]}>
                            <Input ref={passRef} placeholder="enter current password"/>
                        </Form.Item>
                        <Form.Item name="new" label="enter new password" rules={[
                            {
                            required: true,
                            message: 'field is required',
                            },
                        ]}>
                            <Input ref={newPassRef} placeholder="enter new password"/>
                        </Form.Item>
                        <Form.Item name="confirm" label="re-enter new password" rules={[
                            {
                            required: true,
                            message: 'field is required',
                            },
                        ]}>
                            <Input ref={confPassRef} placeholder="re-enter new password"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                            span:24
                        }}>
                            <Button onClick={handleSubmit} style={{backgroundColor:"#008000"}} block type="primary">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </>
    )
}