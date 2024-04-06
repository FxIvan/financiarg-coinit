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
    <div>
      <h2 className="mt-10 text-xl font-semibold text-gray-900">Login</h2>
      <p className="mt-2 text-sm text-gray-700">
        <Link href="/auth/register">Registrate</Link>
      </p>
      <form>
        {isClient && (
          <>
            <input
              className="mt-10"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              className="mt-10"
              type="text"
              name="Password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </>
        )}
        <div>
          <button
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
            onClick={loginHandler}
          >
            <span>
              Ingresar
              <span aria-hidden="true">&rarr;</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
