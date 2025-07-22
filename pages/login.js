import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const name =
    router.pathname === "/ReqGames" ||
    router.pathname === "/[slug]" ||
    router.pathname === "/" ||
    router.pathname === "/Action" ||
    router.pathname === "/Racing" ||
    router.pathname === "/AllGames" ||
    router.pathname === "/Story" ||
    router.pathname === "/Horror" ||
    router.pathname === "/FPS" ||
    router.pathname === "/RPG" ||
    router.pathname === "/Adventure" ||
    router.pathname === "/Contact" ||
    router.pathname === "/Wishlist";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    setToken(token);
  });
  if (token) {
    router.push("/");
  }
  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      if (!email || !password) {
        toast.info("Plz Fill the Required Fields");
        return;
      } else {
        setLoading(true);
        let res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        let response = await res.json();

        if (response.success) {
          toast.success("Successfully Logged In", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });

          localStorage.setItem("TOKEN", response.token);
          const token = localStorage.getItem("TOKEN");

          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API}/api/Get/getusers`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            }
          );

          const userData = await userRes.json();

          if (userData.success) {
            if (userData.admin) {
              router.push("/admin");
            } else {
              router.push("/");
            }
          } else {
            toast.error("Failed to fetch user data", {
              position: "top-right",
              autoClose: 2000,
              theme: "dark",
            });
          }
        } else {
          toast.error("Wrong Credentials", {
            position: "top-right",
            autoClose: 1000,
            theme: "dark",
          });
        }
      }
    } catch (err) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading && (name !== "" || password !== "" || email !== "") && (
        <Loader />
      )}
      { (
        <div className='max-h-screen'>

        <div className="h-[65.8svh] relative lg:h-[100vh]  ">
          <picture className="z-10">
            <source
              media="(min-width: 1024px)"
              srcSet="/images/lifeisstrange.jpg"
            />
            <img
              src="/images/ghost.jpeg"
              alt="Signup Background"
              className="w-full h-full object-fit"
            />
          </picture>

          <div className="absolute inset-0 flex justify-center items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:left-[35vw]  lg:top-[25vh] rounded-lg p-12 ">
                <h1 className="font-bold text-3xl text-white py-4 text-center ">
                  Login
                </h1>

                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  value={email}
                  className="bg-white py-2 my-2 rounded-md placeholder:text-gray-600 px-3"
                  placeholder="Enter Email"
                />

                <div className="flex items-center bg-white rounded-md">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="flex-1 px-3 py-2 rounded-md outline-none placeholder:text-gray-600"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="lg:text-black  text-white font-semibold px-1 mt-2 ">
                  <Link href={"/Passwordreset"}>
                    <span className="hover:underline hover:text-gray-100">
                      Forget Password ?{" "}
                    </span>
                  </Link>
                </div>

                <button
                  className="bg-rose-600 text-white rounded mx-20 px-8 py-2 my-3 lg:mx-40"
                  type="submit"
                >
                  Login
                </button>

                <p className="text-center py-2 text-white">
                  Not a member?{" "}
                  <span className="text-rose-500 font-bold hover:text-red-300">
                    <Link href={"/Signup"}>Signup</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
                </div>

      )}
    </>
  );
};

export default Login;
