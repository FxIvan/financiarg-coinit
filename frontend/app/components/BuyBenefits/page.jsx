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
      "http://localhost:8080/api/company/createPromotion",
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
          <div className="w-full text-center">
            <button
              onClick={(e) => handleSubmit(e)}
              className="my-16 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Finalizar Compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
