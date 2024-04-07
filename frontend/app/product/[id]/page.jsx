import ProductDetail from "components/app/components/ProductDetail";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const getProductID = async (id) => {
  const response = await fetch(
    `https://financiarg.tech/api/company/getPromotion/${id}`
  );
  const data = await response.json();
  return data;
};

export default async function ProductID({ params }) {
  const idProduct = params.id;
  const { promotion } = await getProductID(idProduct);
  const session = await getServerSession(authOptions);

  return (
    <div className="">
      {promotion && (
        <ProductDetail
          producDetail={promotion}
          idCoupon={idProduct}
          session={session}
        />
      )}
    </div>
  );
}
