import ProductDetail from "components/app/components/ProductDetail";

const getProductID = async (id) => {
  const response = await fetch(
    `http://localhost:8080/api/company/getPromotion/${id}`
  );
  const data = await response.json();
  return data;
};

export default async function ProductID({ params }) {
  const idProduct = params.id;
  const { promotion } = await getProductID(idProduct);

  return (
    <div className="">
      <ProductDetail producDetail={promotion} />
    </div>
  );
}
