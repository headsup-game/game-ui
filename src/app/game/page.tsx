import Game from "app/game/Game";
import { NextPage } from "next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Title Comes here",
  description: "description comes here",
};

const Page: NextPage = () => <Game />;

export default Page;
