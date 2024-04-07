import PaymentGateway from "components/app/components/PaymentGateway";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const getProductID = async (idProduct) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/company/getPromotion/${idProduct}`
    ).catch((error) => {
      console.error("Error:", error);
    });
    const data = await response.json();

    return {
      promotions: data,
    };
  } catch (error) {
    console.error("Error al obtener la información del producto:", error);
    // Puedes manejar el error aquí (por ejemplo, mostrar un mensaje al usuario)
    return { promotions: null }; // Devolver un valor predeterminado en caso de error
  }
};

export default async function BuyBenefitID({ params }) {
  const idProduct = params.id;
  const dataPromotions = await getProductID(idProduct);
  const session = await getServerSession(authOptions);

  const { promotions } = dataPromotions;
  return (
    <div className="">
      <PaymentGateway
        promotion={promotions}
        idCompany={idProduct}
        session={session}
      />
    </div>
  );
}
