"use client";

import { Layout } from "antd";
import Navigation from "app/home-page/Navigation/Navigation";
import React from "react";
import styles from "./Homepage.module.scss";
import Container from "app/components/Container/Container";

const { Header, Footer, Sider, Content } = Layout;

const HomePage = () => {
  return (
    <Layout className={styles.Home}>
      <Navigation />
      <Container type="fluid">
        <Container>
          <Content className={styles.Content}>Content</Content>
        </Container>
      </Container>
    </Layout>
  );
};

export default HomePage;
