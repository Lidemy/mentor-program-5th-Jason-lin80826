import React, { useContext } from "react";
import { login, getMe } from "../../WebApi";
import { setAuthToken } from "../../utils";
import { AuthContext, LoadingContext } from "../../contexts";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";

export default function LoginForm(props) {
  const { setUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  const { handleOk } = props;
  const history = useHistory();

  const onFinish = (values) => {
    const { username, password } = values;
    setIsLoading(true);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        setIsLoading(false);
        return message.error("帳號密碼錯誤");
      }
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
        }
        setUser(response.data);
        handleOk();
        history.push("/");
        message.success("登入成功");
        setIsLoading(false);
      });
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          登入
        </Button>
      </Form.Item>
    </Form>
  );
}
