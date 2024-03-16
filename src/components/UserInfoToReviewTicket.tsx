import { Button, Form, Input, message } from "antd";
import { getAllTicketsAndEmailUpdatesForUser } from "../utilities/UserUtilities";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Notification, Ticket } from "../models/models";

function UserInfoToReviewTicket({
  onSuccess,
}: {
  onSuccess: (tickets: Ticket[], emails: Notification[]) => void;
}) {
  const [form] = Form.useForm();
  const onFinish = (data: { email: string; lastName: string }) => {
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userLastName", data.lastName);
    getAllTicketsAndEmailUpdatesForUser(data.email, data.lastName)
      .then((value) => {
        onSuccess(value.tickets, value.emails);
        window.location.reload();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <div className={"flex flex-col gap-y-3 w-1/2 place-content-center"}>
      <div className={"!text-center font-semibold text-lg md:text-2xl"}>
        Enter your info to retrieve all your tickets
      </div>

      <Form
        name={"user_login"}
        onFinish={onFinish}
        preserve={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label={"Email"}
          name={"email"}
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          label={"Last Name"}
          name={"lastName"}
          rules={[{ required: true, message: "Please input your last name" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item>
          <div className={"flex flex-row gap-x-2 md:justify-end"}>
            <Button htmlType="submit">Retrieve tickets</Button>
            <Button
              htmlType={"reset"}
              style={{ background: "darkred", color: "white" }}
            >
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserInfoToReviewTicket;
