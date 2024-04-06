import Image from "next/image";
import PlantillaInicio from "./components/PlantillaInicio/index.jsx";

export default function Home() {
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
        <PlantillaInicio filter={"subasta"} />
      </div>
    </main>
  );
}
