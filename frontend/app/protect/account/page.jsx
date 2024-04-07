import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export async function getUserInfo() {
  const session = await getServerSession(authOptions);

  const data = await fetch(
    `http://localhost:8080/api/users/userInfo/${session.user.id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  ).catch((err) => {});
  const userInfo = await data.json();
  return {
    userInfo,
    session,
  };
}

export default async function Account() {
  const { userInfo, session } = await getUserInfo();
  return <>
  </>;
}
