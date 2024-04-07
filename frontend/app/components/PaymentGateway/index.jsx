"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const PaymentGateway = ({ promotion, session, idCompany }) => {
  const dataPromotions = promotion.promotion;

  const router = useRouter();
  const searchParams = useSearchParams();
  const idProduct = searchParams.get("pack");

  const [dataCard, setDataCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const [dataPackage, setDataPackage] = useState({
    type: "",
    montoBeneficio: "",
    cantidadBeneficio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataCard({ ...dataCard, [name]: value });
  };

  useEffect(() => {
    if (idProduct === "pack1") {
      setDataPackage({
        type: "Beneficio #1",
        montoBeneficio: dataPromotions.montoBeneficio1,
        cantidadBeneficio: dataPromotions.batchBeneficio1,
      });
    } else if (idProduct === "pack2") {
      setDataPackage({
        type: "Beneficio #2",
        montoBeneficio: dataPromotions.montoBeneficio2,
        cantidadBeneficio: dataPromotions.batchBeneficio2,
      });
    } else if (idProduct === "pack3") {
      setDataPackage({
        type: "Beneficio #3",
        montoBeneficio: dataPromotions?.montoBeneficio3,
        cantidadBeneficio: dataPromotions?.batchBeneficio3,
      });
    }
  }, [idProduct]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await fetch("https://financiarg.tech/api/payment/created", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataCard,
          dataPackage,
          idProduct,
          idCompany,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          router.push("/payment/success");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Aquí puedes mostrar un mensaje de error al usuario
        });
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  return (
    <div className="bg-white h-screen container mx-auto">
      <div className="flex flex-col">
        <div className="bg-white  max-w-md mx-auto my-28 ">
          <div className="text-black font-semibold">
            <p>{dataPackage.type}</p>
            <p>{dataPackage.montoBeneficio} $ARS</p>
            <p>{dataPackage.cantidadBeneficio} CUPONES</p>
          </div>
        </div>
        <div className="">
          <form onSubmit={handleSubmit} className="bg-white  max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="cardNumber" className="text-gray-800 block mb-1">
                Número de tarjeta
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={dataCard.cardNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black  font-semibold"
                placeholder="Ingrese el número de tarjeta"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cardHolder" className="text-gray-800 block mb-1">
                Nombre del titular
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={dataCard.cardHolder}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black  font-semibold"
                placeholder="Ingrese el nombre del titular"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="expirationDate"
                  className="text-gray-800 block mb-1"
                >
                  Fecha de expiración
                </label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={dataCard.expirationDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black  font-semibold"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="text-gray-800 block mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={dataCard.cvv}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black  font-semibold"
                  placeholder="CVV"
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Finalizar Compra
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
