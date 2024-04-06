import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import * as Sentry from "@sentry/nextjs";

const base64ToImage = (base64) => {
  return "data:image/png;base64," + base64;
};

export default async function Portfolio() {
  const { friends, balance, username } = await getFriends();

  return <></>;
}
