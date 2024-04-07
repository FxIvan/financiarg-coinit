import ProductDetail from "components/app/components/ProductDetail";

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

  return (
    <div className="">
      {promotion && (
        <ProductDetail producDetail={promotion} idCoupon={idProduct} />
      )}
    </div>
  );
}
