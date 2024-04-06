"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import myToast from "../../components/custom/MyToast";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isClient, setIsClient] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8080/api/users/register`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const info = await res.json();

    if (info.success) {
      myToast({
        variant: "success",
        children: info.message,
      });
      router.push("/auth/login");
    } else {
      console.log("Info", info);
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
