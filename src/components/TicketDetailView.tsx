import { Button, Form, Input, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";

function ChangeAdminPassword() {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const signupOnClick = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <Button
        shape="round"
        onClick={signupOnClick}
        style={{ marginRight: "20px", background: "white" }}
      >
        Change password
      </Button>
      <Modal
        title={<div className={"!text-center"}>Change password</div>}
        open={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_register"
          initialValues={{ remember: true }}
          preserve={false}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            label={<strong>Old password</strong>}
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label={<strong>New password</strong>}
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 14, offset: 8 }}>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ChangeAdminPassword;
