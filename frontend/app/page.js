import Image from "next/image";
import PlantillaInicio from "./components/PlantillaInicio/index.jsx";

async function getProducts() {
  const { promotions } = await fetch(
    "http://localhost:8080/api/company/getPromotion",
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

  return {
    promotions,
  };
}

const Home = async () => {
  const { promotions } = await getProducts();

  return (
    <main className="">
      <div>
        <Image
          src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          alt="Banner"
          width={1920}
          height={500}
          className="h-[50vh] object-cover w-full"
        />
      </div>
      <div>
        <PlantillaInicio promotions={promotions} />
      </div>
    </main>
  );
};

export default Home;
