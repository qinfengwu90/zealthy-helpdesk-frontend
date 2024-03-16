import {useState} from "react";
import { Button, Form, Input, message, Modal } from 'antd';
import {registerAdmin} from "../utilities/AdminUtilities";
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';

function AdminRegister() {
    const [displayModal, setDisplayModal] = useState(false);

    const handleCancel = () => {
        setDisplayModal(false)
    }


    const signupOnClick = () => {
        setDisplayModal(true)
    }


    const onFinish = (data: any) => {
        registerAdmin(data.email, data.password, data.firstName, data.lastName)
            .then(() => {
                setDisplayModal(false)
                message.success('Successfully registered a new admin');
            }).catch((err) => {
            message.error(err.message);
        })
    }

    return (
      <>
          <Button shape="round" onClick={signupOnClick} style={{ marginRight: '20px', background: "white"}}>
              Register another admin</Button>
          <Modal
              title={<div className={"text-center"}>Register</div>}
              open={displayModal}
              onCancel={handleCancel}
              footer={null}
              destroyOnClose={true}
          >
              <Form
                  name="normal_register"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  preserve={false}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 12}}
              >
                  <Form.Item
                      label={<strong>Email</strong>}
                      name="email"
                      rules={[{ required: true, message: 'Please input your email' }]}
                  >
                      <Input prefix={<MailOutlined />}  />
                  </Form.Item>
                  <Form.Item
                      label={<strong>Password</strong>}
                      name="password"
                      rules={[{ required: true, message: 'Please input your password' }]}
                  >
                      <Input.Password prefix={<LockOutlined />}/>
                  </Form.Item>
                  <Form.Item
                      label={<strong>First Name</strong>}
                      name="firstName"
                      rules={[{ required: true, message: 'Please input your first name' }]}
                  >
                      <Input/>
                  </Form.Item>
                  <Form.Item
                      label={<strong>Last Name</strong>}
                      name="lastName"
                      rules={[{ required: true, message: 'Please input your last name' }]}
                  >
                      <Input/>
                  </Form.Item>
                  <Form.Item
                      wrapperCol={{span: 14, offset: 8}}
                  >
                      <Button htmlType="submit">
                          Register
                      </Button>
                  </Form.Item>
              </Form>
          </Modal>
      </>

  );
}

export default AdminRegister;