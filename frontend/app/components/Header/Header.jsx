import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"; //@/app/api/auth/[...nextauth]/route
import NoAuth from "./noAuth";
import Auth from "./Auth";

const getData = async () => {
  const session = await getServerSession(authOptions);
  console.log("Session", session);
  return {
    session,
  };
};

export default function Header() {
  const { session } = getData();

  return (
    <div>
      {session && <Auth />}
      {!session && <NoAuth />}
    </div>
  );
}
