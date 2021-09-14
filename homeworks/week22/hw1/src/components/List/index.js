import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext, PostContext } from "../../contexts";
import { getArticle } from "../../WebApi";
import { List as AntdList } from "antd";

export default function List() {
  const [posts, setPosts] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const { setIsLoading } = useContext(LoadingContext);
  const { setPost } = useContext(PostContext);

  useEffect(() => {
    setIsLoading(true);
    getArticle(page)
      .then((res) => {
        setTotal(res.headers.get("x-total-count"))
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, [page, setPosts]);

  const handleOnclick = (title, body) => {
    return function () {
      setPost({
        title,
        body,
      });
    };
  };

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 830, margin: "16px 0" }}
    >
      <AntdList
        itemLayout="horizontal"
        dataSource={posts}
        size="large"
        pagination={{
          pageSize: 5,
          defaultCurrent: 1,
          total,
          showSizeChanger: false,
          onChange: page => {
            setPage(page);
          },
        }}
        renderItem={(item) => (
          <AntdList.Item>
            <AntdList.Item.Meta
              title={
                <Link
                  to={{ pathname: `/post/${item.id}` }}
                  onClick={handleOnclick(item.title, item.body)}
                >
                  {item.title}
                </Link>
              }
            />
          </AntdList.Item>
        )}
      />
    </div>
  );
}
