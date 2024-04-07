import PanelAdmin from "components/app/components/PanelAdmin";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
export async function getUserInfo() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}

export default async function PanelEmpresa() {
  const { user } = await getUserInfo();

  return <>{user.role === "admin" && <PanelAdmin />}</>;
}
