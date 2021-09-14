import React from "react";
import "./App.css";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import List from "./components/List";
import About from "./components/About";
import AddPost from "./components/AddPost"
import Post from "./components/Post";
import Register from "./components/Register";
import { AuthContext, LoadingContext, PostContext } from "./contexts";

import { getMe } from "./WebApi";
import { Layout } from "antd";
import Loading from "./components/Loading";

function App() {
  const { useState, useEffect } = React;
  const { Content, Footer } = Layout;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    // TDOO: 有 token 才 call api
    getMe().then((response) => {
      if (response.ok) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading && <Loading />}
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <PostContext.Provider value={{ post, setPost }}>
          <HashRouter>
            <Layout>
              <Header />
              <Content
                className="site-layout"
                style={{ padding: "0 50px", marginTop: 64 }}
              >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/list" component={List} />
                  <Route path="/addPost" component={AddPost} />
                  <Route path="/about" component={About} />
                  <Route path="/register" component={Register} />
                  <Route path="/post/:id" component={Post} />
                  <Redirect to="/" component={Home} />
                </Switch>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Made with <span style={{color: 'red'}}>♥</span> by Jason
              </Footer>
            </Layout>
          </HashRouter>
        </PostContext.Provider>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
