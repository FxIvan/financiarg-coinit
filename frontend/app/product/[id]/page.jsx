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
  const product = await getProductID(idProduct);

  const products = [
    {
      id: 1,
      name: "Zip Tote Basket",
      color: "White and black",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      imageAlt:
        "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
      price: "$140",
    },
  ];

  return (
    <div className="">
      <ProductDetail producDetail={products} />
    </div>
  );
}
