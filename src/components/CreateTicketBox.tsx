import {Button, Form, Input, message} from "antd";
import {createTicket} from "../utilities/utilities";
import {UserOutlined, MailOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useState} from "react";

function CreateTicketBox() {
    const [form] = Form.useForm();
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail')! || "");
    const [userLastName, setUserLastName] = useState(localStorage.getItem('userLastName')! || "");
    const [userFirstName, setUserFirstName] = useState(localStorage.getItem('userFirstName')! || "");

    const onFinish = (data: { email: string; description: string; firstName: string; lastName: string; }) => {

        createTicket(data.email, data.description, data.firstName, data.lastName)
            .then( () => {
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userLastName', data.lastName);
                localStorage.setItem('userFirstName', data.firstName);
                form.resetFields();
                message.success({content: `Your ticket has been created`, duration: 3} )
                window.location.reload();
            }
            ).catch(err => {
                message.error(err.message);
        })
    }


    return (
        <div className={"flex flex-col gap-y-3 w-1/2 align-middle"}>
            <div className={"!text-center font-semibold text-2xl"}>Create a help desk ticket</div>
            <Form
                form={form}
                name={"new_ticket"}
                onFinish={onFinish}
                preserve={false}
                labelCol={{span: 8}}
                wrapperCol={{span: 12}}
                initialValues={{
                    ["email"]:  userEmail,
                    ["firstName"]: userFirstName,
                    ["lastName"]: userLastName
                }}
            >
                <Form.Item
                    label={"Email"}
                    name={"email"}
                    rules={[{required: true, message: 'Please input your email'}]}
                >
                    <Input prefix={ <MailOutlined />}  />
                </Form.Item>
                <Form.Item
                    label={"First Name"}
                    name={"firstName"}
                    rules={[{required: true, message: 'Please input your first name'}]}
                >
                    <Input prefix={<UserOutlined />}  />
                </Form.Item>
                <Form.Item
                    label={"Last Name"}
                    name={"lastName"}
                    rules={[{required: true, message: 'Please input your last name'}]}
                >
                    <Input prefix={<UserOutlined />}  />
                </Form.Item>
                <Form.Item
                    label={"Description"}
                    name={"description"}
                    rules={[{required: true, message: 'Please enter the description of the issue'}]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    wrapperCol={{span: 14, offset: 8}}
                >
                    <div className={"flex flex-row gap-x-2"}>
                        <Button htmlType="submit">
                            Create ticket
                        </Button>
                        <Button htmlType={"reset"} style={{background: "darkred", color: "white"}}>
                            Reset
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateTicketBox;