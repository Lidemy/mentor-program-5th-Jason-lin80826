import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../../contexts";

export default function Post() {
  const { post } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    if (post === null) {
      history.push("/");
    }
  }, []);
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 830, margin: "16px 0" }}
    >
      {post && (
        <div className="posts">
          <article className="post">
            <div className="post__header">
              <h1>{post.title}</h1>
            </div>
            <div className="post__content">{post.body}</div>
          </article>
        </div>
      )}
    </div>
  );
}
