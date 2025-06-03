import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const RequestGames = () => {
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const HandleChange = (e) => {
    if (e.target.name == "text") {
      setText(e.target.value)
    }
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }


  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = [{ text, email }]
    const RequestedGamesdata = await fetch(`${process.env.NEXT_PUBLIC_API}/api/reqgames`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    )
    toast.success('Your Request Has been Submitted', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setEmail('')
    setText('')

  }

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
      <picture className=" z-10">
        <source media="(min-width: 1024px)" srcSet="/images/re_door.jpg" />
        <img
          src="/images/qwer.jpg"
          alt="Signup Background"
          className="w-full h-[42.4vh] lg:h-[70vh] object-fit"
        />
      </picture> 

      <div className='absolute top-[25svh] w-full bg-transparent lg:top-[45vh]  bg-gray-400 pt-12 h-[44vh] lg:h-[60vh]'>

        <h1 className='font-bold text-white text-3xl py-4 text-center'>Request Games</h1>
        <form action="submit " onSubmit={handleSubmit} method='POST'>

          <div className='flex flex-col pt-8 lg:mx-96 items-center justify-center'>
            <input type="text" name='text' value={text} className='bg-rose-100 py-2 my-2 rounded-md mx-12 min-w-[90vw]  lg:min-w-[50vw] placeholder:text-gray-600 px-3 ' onChange={HandleChange} placeholder='Enter Game Name' />
            <input type="text" name='email' value={email} className='bg-rose-100 py-2 my-2 rounded-md mx-12 min-w-[90vw] lg:min-w-[50vw]  placeholder:text-gray-600 px-3 ' onChange={HandleChange} placeholder='Enter Email ID' />
            <button type='submit' className='bg-red-600 rounded  py-2 mt-3 min-w-44 lg:mx-60 lg:w-32 '>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RequestGames
