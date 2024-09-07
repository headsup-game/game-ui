import Leaderboard from "app/leaderboard/Leaderboard";
import { NextPage } from "next";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard",
    description: "Leaderboard",
};

const Page: NextPage = () => <Leaderboard />;

export default Page;
