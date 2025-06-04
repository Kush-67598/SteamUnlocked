import Link from "next/link";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
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
  }

  
  try {
      setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const response = await res.json();

    if (response.success) {
      toast.success(response.message || "Your account has been created", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      setName("");
      setEmail("");
      setPassword("");
    
} else {
      // Show error toast when user already exists
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
};

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
        <Loader/>
      )}

      <div className=" h-[61.4svh] font-mono lg:h-[80vh] ">
        <picture className=" z-10">
          <source media="(min-width: 1024px)" srcSet="/images/re_door.webp" />
          <img
            src="/images/qwer.webp"
            alt="Signup Background"
            className="w-full h-full object-fit"
          />
        </picture>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col absolute top-[20vh] left-[7vw] mx-12 lg:left-[35vw] lg:top-[25vh] ">
            <h1 className="font-bold text-3xl text-white py-4 text-center font-mono">
              Signup
            </h1>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={name}
              className="bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 "
              placeholder="Enter Name"
            />
            <input
              onChange={handleChange}
              name="email"
              type="email"
              value={email}
              className="bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 "
              placeholder="Enter Email"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              value={password}
              className="bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 "
              placeholder="Enter Password"
            />
            <button
              className="bg-fuchsia-500 rounded mx-20 px-8 py-2 my-3 lg:mx-40"
              type="submit"
            >
              Signup
            </button>
            <p className="text-center py-2 text-white">
              Already a member?{" "}
              <span className=" text-red-500 font-bold">
                <Link href={"/login"}>Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
