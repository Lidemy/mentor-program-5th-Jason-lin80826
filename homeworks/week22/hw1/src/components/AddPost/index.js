import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { AuthContext, LoadingContext } from "../../contexts";
import { postNewPost } from "../../WebApi";
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

export default function AddPost() {
  const { setIsLoading } = useContext(LoadingContext);
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const onFinish = (values) => {
    const { title, content } = values.post;
    console.log(title, content);
    setIsLoading(true);
    postNewPost(title, content)
      .then((data) => {
        if (data.code === 2) {
          history.push("/");
          setIsLoading(false);
          return message.error("請先登入");
        }
        history.push("/list");
        message.success("新增成功");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        return message.error("新增失敗");
      });
  };
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 830, margin: "16px 0" }}
    >
      {user?  (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["post", "title"]}
            label="文章標題"
            rules={[
              {
                required: true,
                message: "請輸入文章標題",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["post", "content"]}
            label="文章內容"
            rules={[
              {
                required: true,
                message: "請輸入文章內容",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : '先去登入喔' }
    </div>
  );
}
