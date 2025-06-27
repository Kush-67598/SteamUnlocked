import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import {  useRouter } from "next/router";

const RequestGames = () => {
  const [text, setText] = useState("");
  const router=useRouter()
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const HandleChange = (e) => {
    if (e.target.name == "text") {
      setText(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const data = { text, email };
      const RequestedGamesdata = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/Get/reqgames`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let response = await RequestedGamesdata.json();
      setLoading(false)
      if (response.success) {
        toast.success("Your Request Has been Submitted..Redirecting to HomePage", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setEmail("");
        setText("");

        setTimeout(() => {
          router.push('/')
        }, 2000);
      }
    } catch (err) {
      toast.error("Internal Server Error", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }finally{
      setLoading(false)
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

      {loading && (text !== "" || email !== "") && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-70">
          <Loader/>
        </div>
      )}
      <div className="relative w-full h-full">
      <picture className=" z-10">
        <source media="(min-width: 1024px)" srcSet="/images/re_door.webp" />
        <img
          src="/images/qwer.webp"
          alt="Signup Background"
          className="w-full h-[35.19rem] lg:h-[40rem] object-fit"
        />
      </picture>

<div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 w-full overflow-hidden">
        <h1 className="font-bold text-white text-3xl py-4 text-center">
          Request Games
        </h1>
        <form action="submit " onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col pt-8 lg:mx-96 items-center justify-center ">
            <input
              type="text"
              name="text"
              value={text}
              className="bg-rose-100 py-2 my-2 rounded-md w-[80vw]  lg:w-[40vw] placeholder:text-gray-600 px-3 "
              onChange={HandleChange}
              placeholder="Enter Game Name"
            />
            <input
              type="email"
              name="email"
              value={email}
              className="bg-rose-100 py-2 my-2 rounded-md  w-[80vw] lg:w-[40vw]  placeholder:text-gray-600 px-3 "
              onChange={HandleChange}
              placeholder="Enter Email ID"
            />
            <button
              type="submit"
              className="bg-red-600 rounded  py-2 mt-3 min-w-44 lg:mx-60 lg:w-32 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default RequestGames;
