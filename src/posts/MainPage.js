import React from "react";
import styled from "styled-components";
import { Button, Layout, PageHeader } from "antd";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";
import { fetchPosts, signout, fetchUser } from "../actions";

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  overflow-y: auto;
`;

const Header = styled(PageHeader)`
  width: 1000px;
`;

function MainPage({ user, posts, fetchPosts, fetchUser, signout }) {
  const [display, setDisplay] = React.useState("default"); // default, create

  const onLogoutClick = () => {
    try {
      signout();
    } catch (error) {
      console.log("error logging out");
    }
  };

  React.useEffect(() => {
    console.log("fetchPosts is called");
    fetchPosts();
    fetchUser();
  }, [fetchPosts, fetchUser]);

  const onCreatePostClick = () => {
    setDisplay("create");
  };

  const onCancelClick = () => {
    setDisplay("default");
  };

  if (display === "create") {
    return <CreatePost onCancelClick={onCancelClick} />;
  }

  if (!user) {
    return (
      <MainLayout>
        <Header
          title="Postgram"
          subTitle="Connecting people"
          extra={[
            <Link to="/register" key="1">
              <Button>Register</Button>
            </Link>,
            <Link to="/login" key="2">
              <Button>Login</Button>
            </Link>,
          ]}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header
        title="Postgram"
        extra={[
          <Button key="1" onClick={onLogoutClick}>
            Logout
          </Button>,
          <Button type="primary" key="3" onClick={onCreatePostClick}>
            Create Post
          </Button>,
        ]}
      />
      {posts.map((post) => (
        <SinglePost post={post} />
      ))}
    </MainLayout>
  );
}

const mapStateToProps = ({ user, posts }) => {
  return { user, posts };
};

export default connect(mapStateToProps, { fetchPosts, signout, fetchUser })(
  MainPage
);
