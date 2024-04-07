"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import myToast from "../../components/custom/MyToast";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rol: "user",
  });
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`https://financiarg.tech/api/users/register`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const info = await res.json();

    if (info.success) {
      setForm({
        email: "",
        password: "",
        confirmPassword: "",
        rol: "user",
      });
      router.push("/auth/login");
    } else {
      myToast({
        variant: "danger",
        children: info,
      });
    }
  };

  return (
    <div className="p-6 bg-white shadow-md h-screen text-center items-center flex justify-center">
      <div className="flex flex-col items-center">
        <div className="">
          {isClient && (
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Register</h2>
              <form className="mt-6  flex flex-col">
                <select
                  className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                >
                  <option value="user">Cliente</option>
                  <option value="admin">Empresa</option>
                </select>
                <input
                  className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  required
                />
                <input
                  className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  required
                />
                <input
                  className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  type="password"
                  required
                />
                <div className="col-span-2">
                  <button
                    type="submit"
                    className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                  >
                    <span className="flex justify-between items-center py-2 px-4">
                      Registrate
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
