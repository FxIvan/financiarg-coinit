"use client";
import { useState } from "react";

export default function PanelAdmin({}) {
  const [form, setForm] = useState({
    urlImagen: "",
    nombreEmpresa: "",
    benefit1Description: "",
    montoBeneficio1: "",
    batchBeneficio1: "",
    benefit2Description: "",
    montoBeneficio2: "",
    batchBeneficio2: "",
    benefit3Description: "",
    montoBeneficio3: "",
    batchBeneficio3: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://financiarg.tech/api/company/createPromotion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const data = await res.json();
  };

  return (
    <div className="bg-white h-screen">
      <div></div>
      <div>
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/*URL IMAGEN*/}
              <div className="sm:col-span-3">
                <label
                  htmlFor="urlImagen"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  URL IMAGEN
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="urlImagen"
                    value={form.urlImagen}
                    onChange={handleChange}
                    id="urlImagen"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/*Nombre de la empresa*/}
              <div className="sm:col-span-3">
                <label
                  htmlFor="nombreEmpresa"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre de la empresa
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={form.nombreEmpresa}
                    onChange={handleChange}
                    name="nombreEmpresa"
                    id="nombreEmpresa"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              {/*Beneficio #1*/}
              <div className="sm:col-span-3 mt-8">
                <label
                  htmlFor="benefit1Description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Beneficio #1
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="benefit1Description"
                    value={form.benefit1Description}
                    onChange={handleChange}
                    id="benefit1Description"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="benefit1Description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Costo del beneficio #1
                  </label>
                  <input
                    type="string"
                    name="montoBeneficio1"
                    placeholder="5$"
                    value={form.montoBeneficio1}
                    onChange={handleChange}
                    id="montoBeneficio1"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="batchBeneficio1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Lotes de cupones disponibles
                  </label>
                  <input
                    type="string"
                    name="batchBeneficio1"
                    placeholder="5"
                    value={form.batchBeneficio1}
                    onChange={handleChange}
                    id="batchBeneficio1"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/*Beneficio #2*/}
              <div className="sm:col-span-3 mt-8">
                <label
                  htmlFor="benefit2Description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Beneficio #2
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="benefit2Description"
                    value={form.benefit2Description}
                    onChange={handleChange}
                    id="benefit2Description"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="montoBeneficio2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Costo del beneficio #2
                  </label>
                  <input
                    type="string"
                    name="montoBeneficio2"
                    placeholder="5$"
                    value={form.montoBeneficio2}
                    onChange={handleChange}
                    id="montoBeneficio2"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="batchBeneficio2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Lotes de cupones disponibles
                  </label>
                  <input
                    type="string"
                    name="batchBeneficio2"
                    placeholder="5"
                    value={form.batchBeneficio2}
                    onChange={handleChange}
                    id="batchBeneficio2"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/*Beneficio #3*/}
              <div className="mt-8">
                <label
                  htmlFor="benefit3Description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Beneficio #3
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="benefit3Description"
                    value={form.benefit3Description}
                    onChange={handleChange}
                    id="benefit3Description"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="montoBeneficio3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Costo del beneficio #3
                  </label>
                  <input
                    type="string"
                    name="montoBeneficio3"
                    placeholder="5$"
                    value={form.montoBeneficio3}
                    onChange={handleChange}
                    id="montoBeneficio3"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="batchBeneficio3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Lotes de cupones disponibles
                  </label>
                  <input
                    type="string"
                    name="batchBeneficio3"
                    placeholder="5"
                    value={form.batchBeneficio3}
                    onChange={handleChange}
                    id="batchBeneficio3"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <button
              onClick={(e) => handleSubmit(e)}
              className="my-16 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Crear Beneficios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
