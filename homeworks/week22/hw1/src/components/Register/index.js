import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { AuthContext, LoadingContext } from "../../contexts";
import { register, getMe } from "../../WebApi";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../../utils";

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
};

export default function Register() {
  const { setIsLoading } = useContext(LoadingContext);
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const onFinish = (values) => {
    const { username, password, nickname } = values.user;
    setIsLoading(true);
    register(username, password, nickname).then((data) => {
      if (data.ok === 1) {
        setAuthToken(data.token);
        getMe().then((response) => {
          setUser(response.data);
          history.push("/");
          message.success("註冊成功");
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        return message.error("此帳號已有人使用");
      }
    });
  };
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 830, margin: "16px 0" }}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "username"]}
          label="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="password"
          rules={[
            { required: true },
            { min: 4, message: "必須為4位以上" },
            { max: 12, message: "必須為12位以下" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "不能有英數字與下滑線外之字符",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={["user", "nickname"]}
          label="nickname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
