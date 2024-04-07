"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Tab, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        { name: "Sleep", href: "#" },
        { name: "Swimwear", href: "#" },
        { name: "Underwear", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Basic Tees", href: "#" },
        { name: "Artwork Tees", href: "#" },
        { name: "Bottoms", href: "#" },
        { name: "Underwear", href: "#" },
        { name: "Accessories", href: "#" },
      ],
      brands: [
        { name: "Full Nelson", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Significant Other", href: "#" },
      ],
    },
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Basic Tees", href: "#" },
      ],
      brands: [
        { name: "Significant Other", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail({ producDetail }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [packetSelected, setPacketSelected] = useState("pack1");
  const [pricePack, setPricePack] = useState("pack1");

  useEffect(() => {
    if (packetSelected === "pack1") {
      setPricePack(producDetail.montoBeneficio1);
    } else if (packetSelected === "pack2") {
      setPricePack(producDetail.montoBeneficio2);
    } else if (packetSelected === "pack3") {
      setPricePack(producDetail.montoBeneficio3);
    }
  }, [packetSelected]);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* Currency selector */}
                  <form>
                    <div className="inline-block">
                      <label htmlFor="mobile-currency" className="sr-only">
                        Currency
                      </label>
                      <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                        <select
                          id="mobile-currency"
                          name="currency"
                          className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                        >
                          {currencies.map((currency) => (
                            <option key={currency}>{currency}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                          <ChevronDownIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="pt-10 sm:pt-16">
        {/* Image gallery */}
        <div className="flex flex-row">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <Image
                src={
                  "https://www.creativefabrica.com/wp-content/uploads/2022/10/24/Retro-Noir-Coffee-Poster-43017810-1.png"
                }
                alt={producDetail.urlImagen}
                className="h-full w-full object-cover object-center"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {producDetail.nombreEmpresa}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {pricePack} $ARS
            </p>
            {/* Colors */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  Pack de beneficios disponible
                </h3>
              </div>

              <h3>Seleccion de pack de beneficios</h3>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                <button
                  onClick={(e) => setPacketSelected("pack1")}
                  className={classNames(
                    packetSelected === "pack1" ? "bg-blue-100" : "bg-white",
                    "flex items-center justify-center h-12 w-18 rounded-lg border border-gray-200 px-4"
                  )}
                >
                  <span className="sr-only">Pack de beneficios 1</span>
                  <span className="text-sm font-medium text-gray-900">
                    Pack 1
                  </span>
                </button>

                <button
                  onClick={(e) => setPacketSelected("pack2")}
                  className={classNames(
                    packetSelected === "pack2" ? "bg-blue-100" : "bg-white",
                    "flex items-center justify-center h-12 w-18 rounded-lg border border-gray-200 px-4"
                  )}
                >
                  <span className="sr-only">Pack de beneficios 2</span>
                  <span className="text-sm font-medium text-gray-900">
                    Pack 2
                  </span>
                </button>

                <button
                  onClick={(e) => setPacketSelected("pack3")}
                  className={classNames(
                    packetSelected === "pack3" ? "bg-blue-100" : "bg-white",
                    "flex items-center justify-center h-12 w-18 rounded-lg border border-gray-200 px-4"
                  )}
                >
                  <span className="sr-only">Pack de beneficios 3</span>
                  <span className="text-sm font-medium text-gray-900">
                    Pack 3
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={(e) => {
                router.push(
                  `/buyBenefit/${producDetail.id}?pack=${packetSelected}`
                );
              }}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Presentar oferta
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6 text-black">
                <h4>Beneficio #1</h4>
                <p>{producDetail.benefit1Description}</p>
                <span>Precio: {producDetail.montoBeneficio1} $ARS</span>
              </div>

              <div className="space-y-6 text-black mt-12">
                <h4>Beneficio #2</h4>
                <p>{producDetail.benefit2Description}</p>
                <span>Precio: {producDetail.montoBeneficio2} $ARS</span>
              </div>

              <div className="space-y-6 text-black mt-12">
                <h4>Beneficio #3</h4>
                <p>{producDetail.benefit3Description}</p>
                <span>Precio: {producDetail.montoBeneficio3} $ARS</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
