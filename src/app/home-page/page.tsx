"use client";

import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  Layout,
  Row,
  Typography,
} from "antd";
import Navigation from "app/home-page/Navigation/Navigation";
import React from "react";
import styles from "./Homepage.module.scss";
import Container from "app/components/Container/Container";
import { IoMdLock } from "react-icons/io";
import { motion } from "framer-motion";

const { Paragraph, Title } = Typography;

const HomePage = () => {
  const text = `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`;
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Where can I watch?",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "Where can I watch?",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "Where can I watch?",
      children: <p>{text}</p>,
    },
    {
      key: "4",
      label: "What is the game?",
      children: <p>{text}</p>,
    },
  ];
  return (
    <Layout className={styles.Home}>
      <Navigation />
      <Container type="fluid">
        {/* Banner */}
        <Container>
          <Row>
            <Col span={24}>
              <Paragraph className={styles.BannerContainer}>
                <Flex className={styles.TasksCompleted}>0/10 Completed</Flex>
                <Flex className={styles.Heading}>THE ARCANE TRIALS</Flex>
                <Flex className={styles.SubHeading}>
                  Play 10 rounds of Realm of Aces
                </Flex>
                <Button className={styles.BannerCTA}>Complete Quest</Button>
              </Paragraph>
            </Col>
          </Row>
        </Container>

        {/* Explore Games */}
        <Container>
          <Title level={2} className={styles.ExploreGamesHeading}>
            Explore Games
          </Title>
          <Row align={"middle"} gutter={48}>
            <Col span={8}>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                }}
              >
                <Flex
                  vertical
                  className={`${styles.GamesCard} ${styles.RealmOfAcesCard}`}
                  justify="flex-end"
                >
                  <Flex className={styles.GameTitle}>Realm of Aces</Flex>
                  <Flex className={styles.SubHeading}>Heads Up Poker</Flex>
                </Flex>
              </motion.div>
            </Col>
            <Col span={8}>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                }}
              >
                <Flex vertical className={styles.GamesCard} justify="center">
                  <Flex vertical gap={14} align="center" justify="center">
                    <IoMdLock fontSize={45} color="rgba(248, 248, 248, 0.11)" />
                    <Flex className={styles.ComingSoonText}>Coming Soon</Flex>
                  </Flex>
                </Flex>
              </motion.div>
            </Col>
            <Col span={8}>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                }}
              >
                <Flex vertical className={styles.GamesCard} justify="center">
                  <Flex vertical gap={14} align="center" justify="center">
                    <IoMdLock fontSize={45} color="rgba(248, 248, 248, 0.11)" />
                    <Flex className={styles.ComingSoonText}>Coming Soon</Flex>
                  </Flex>
                </Flex>
              </motion.div>
            </Col>
          </Row>
        </Container>

        {/* FAQ */}
        <Container className={styles.FAQContainer}>
          <Title level={2} className={styles.FAQHeading}>
            FAQ
          </Title>
          <Collapse
            className={styles.FAQCollapse}
            defaultActiveKey={["1"]}
            ghost
            items={items}
            accordion
            expandIconPosition="right"
          />
        </Container>
      </Container>
    </Layout>
  );
};

export default HomePage;
