"use client";

import { Button, Col, Flex, Layout, Row, Typography } from "antd";
import Navigation from "app/home-page/Navigation/Navigation";
import React from "react";
import styles from "./Homepage.module.scss";
import Container from "app/components/Container/Container";
import { IoMdLock } from "react-icons/io";
import { motion } from "framer-motion";

const { Paragraph } = Typography;

const HomePage = () => {
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
          <h2 className={styles.ExploreGamesHeading}>Explore Games</h2>
          <Row align={"middle"} gutter={48}>
            <Col span={8}>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  duration: 0.5,
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
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  duration: 0.5,
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
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  duration: 0.5,
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
      </Container>
    </Layout>
  );
};

export default HomePage;
