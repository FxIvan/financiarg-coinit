"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import myToast from "../../components/custom/MyToast";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [rememberCheck, setRememberCheck] = useState(false);

  const errorUrl = searchParams.get("error");

  useEffect(() => {
    setIsClient(true);
    if (errorUrl) {
      const decodedErrorMessage = atob(errorUrl);
      myToast({
        variant: "danger",
        children: decodedErrorMessage,
      });
      router.replace("/auth/login");
    }
  }, []);

  if (rememberCheck) {
    secureLocalStorage.setItem("ofertar-email", email);
    secureLocalStorage.setItem("ofertar-password", password);
  }

  useEffect(() => {
    const storedEmail = secureLocalStorage.getItem("ofertar-email");
    const storedPassword = secureLocalStorage.getItem("ofertar-password");

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberCheck(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        loginEmail: email,
        loginPassword: password,
        redirect: false,
      });

      if (!res.ok) {
        myToast({
          variant: "danger",
          children: atob(res.error),
        });

        return;
      }

      if (rememberCheck) {
        secureLocalStorage.setItem("ofertar-email", email);
        secureLocalStorage.setItem("ofertar-password", password);
      } else {
        secureLocalStorage.removeItem("ofertar-email");
        secureLocalStorage.removeItem("ofertar-password");
      }

      window.location.href = "/protect/accounts";
    } catch (error) {
      // Manejar excepciones
      console.error("Exception during login:", error);
      // Mostrar error en la interfaz de usuario
    }
  };

  const handleRememberMeChange = () => {
    setRememberCheck(!rememberCheck);
  };

  return (
    <div className="p-6 bg-white shadow-md h-screen text-center items-center flex justify-center">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-black mb-4">Login</h2>
        <p className="text-sm text-gray-700 mb-4">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-blue-500">
            Regístrate aquí
          </Link>
        </p>
        <form>
          <input
            className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={loginHandler}
          >
            <span className="flex justify-between items-center py-2 px-4">
              Ingresar
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
