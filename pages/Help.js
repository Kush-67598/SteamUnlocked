import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { useRouter } from "next/router";

const Help = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter()

  const onSubmit = async (e) => {
    const data = { text };
    try {
      setLoading(true)
      const contactData = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/help`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let response=await contactData.json()

      if(response.success){
        toast.success("Your Response has been Submitted...Redirecting To HomePage", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
      });

      setText("");
      setTimeout(() => {
        router.push('/')
      }, 1500);


      }
      if (text.trim() === "") {
        toast.error("Please Fill The Required Fields.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      
    } catch (err) {
       toast.error("Internal Server Error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading && (text!="") && (
              <Loader/>
                  )}

<div className="  relative  w-full h-full ">

      <picture className=" z-10 ">
        <source media="(min-width: 1024px)" srcSet="/images/lifeisstrange.jpg" />
        <img
          src="/images/ghost.jpeg"
          alt="Signup Background"
          className="w-full h-[35.19rem] lg:h-[40.5rem] object-fit"
          />
      </picture>
      <div className="  absolute inset-0 flex flex-col items-center justify-center lg:flex lg:inset-0 lg:absolute">
        <h1 className="py-6 text-center text-white text-3xl font-bold font-custom lg:text-4xl">
          Help
        </h1>
        <div className=" max-h-[40vh] min-w-80 flex flex-col">
          <textarea
            rows={20}
            type="text"
            className="min-h-20 placeholder:text-black  my-4 rounded-md text-  lg:mx-40  bg-transparent border border-red-500 focus:outline-red-500"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            placeholder="Explain Your Concern"
          />

          <button
            type="submit"
            className="bg-red-600 py-4 mx-20 lg:px-12 rounded lg:mx-[42vw]"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
          </div>
      
    </>
  );
};

export default Help;
