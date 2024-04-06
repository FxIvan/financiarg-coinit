"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import myToast from "../../components/custom/MyToast";

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
      body: form,
      headers: {
        cache: "no-store",
        "Content-Type": "application/json",
      },
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
    <div>
      {isClient && (
        <div>
          <div className="flex items-center justify-center mt-10"></div>
          <form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              required
            />
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              type="password"
              required
            />
            <div className="col-span-full">
              <button
                type="submit"
                variant="solid"
                color="blue"
                className="w-full"
                onClick={handleSubmit}
              >
                <span>Registrate</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
