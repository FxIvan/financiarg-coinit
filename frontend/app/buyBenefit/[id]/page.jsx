import PaymentGateway from "components/app/components/PaymentGateway";

const getProductID = async (params) => {
  const idProduct = params.id;

  const response = await fetch(
    `http://localhost:8080/api/company/getPromotion/${idProduct}`
  );
  const { promotions } = await response.json();
  console.log("params", promotions);
  return {
    promotions,
  };
};

export default async function BuyBenefitID({ params }) {
  const idProduct = params.id;
  const { promotions } = await getProductID(params);
  console.log("params", promotions);
  return (
    <div className="">
      <PaymentGateway promotion={promotions} idProduct={idProduct} />
    </div>
  );
}
