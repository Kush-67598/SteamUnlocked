import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
    const [token,setToken]=useState('')
    const router=useRouter()
  
  useEffect(()=>{
     const token= localStorage.getItem("TOKEN")
     setToken(token)
    })
    if(token){
      router.push('/')
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in the required fields", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    } else if (password.length < 8) {
      toast.info("Password must contian 8 characters")

    } else {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const response = await res.json();
        if (response.success) {
          toast.success(response.message || "Account created", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          });
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.message || "Something went wrong", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.error("Network error. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }

    }


  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
      {loading && <Loader />}
<div className="max-h-screen">

      <div className="h-[65.8svh] relative  lg:h-[100vh]">
        <picture className="z-10">
          <source media="(min-width: 1024px)" srcSet="/images/lifeisstrange.jpg" />
          <img
            src="/images/ghost.jpeg"
            alt="Signup Background"
            className="w-full h-full object-fit object-center"
          />
        </picture>

        <div className="absolute inset-0 flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mx-12">
              <h1 className="font-bold text-3xl text-white py-4 text-center ">
                Signup
              </h1>

              <input
                onChange={handleChange}
                name="name"
                type="text"
                value={name}
                className="bg-white py-2 my-2 rounded-md placeholder:text-gray-600 px-3"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                name="email"
                type="email"
                value={email}
                className="bg-white py-2 my-2 rounded-md placeholder:text-gray-600 px-3"
                placeholder="Enter Email"
              />

              {/* Password field with toggle */}
              <div className="flex items-center bg-white rounded-md px-3 my-2">
                <input
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="bg-transparent py-2 w-full placeholder:text-gray-600 outline-none"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                className="bg-rose-600 text-white rounded mx-20 px-10 py-2 my-3 lg:mx-40"
                type="submit"
              >
                Signup
              </button>
              <p className="text-center py-2 text-white">
                Already a member?{" "}
                <span className="text-rose-500 font-bold">
                  <Link href="/login">Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      </div>

    </>
  );
};

export default Signup;
