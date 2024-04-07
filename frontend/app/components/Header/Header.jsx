import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"; //@/app/api/auth/[...nextauth]/route
import NoAuth from "./noAuth";
import Auth from "./Auth";

const getData = async () => {
  const session = await getServerSession(authOptions);
  return {
    session,
  };
};

export default async function Header() {
  const { session } = await getData();

  return (
    <div>
      {session && <Auth />}
      {!session && <NoAuth />}
    </div>
  );
}
