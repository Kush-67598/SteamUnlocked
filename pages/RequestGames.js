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
    const RequestedGamesdata = await fetch("http://localhost:3000/api/reqgames", {
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
      <div className='bg-gray-400 pt-12 h-[44vh] lg:h-[60vh]'>

        <h1 className='font-bold text-3xl py-4 text-center'>Request Games</h1>
        <form action="submit " onSubmit={handleSubmit} method='POST'>

          <div className='flex flex-col pt-8 lg:mx-96'>
            <input type="text" name='text' value={text} className='bg-fuchsia-200 py-2 my-2 rounded-md mx-12  placeholder:text-gray-600 px-3 ' onChange={HandleChange} placeholder='Enter Game Name' />
            <input type="text" name='email' value={email} className='bg-fuchsia-200 py-2 my-2 rounded-md mx-12  placeholder:text-gray-600 px-3 ' onChange={HandleChange} placeholder='Enter Email ID' />
            <button type='submit' className='bg-fuchsia-500 rounded mx-32 py-2 mt-3 lg:mx-60'>Submit</button>
          </div>
        </form>
      </div>


      {/* <div className='font-custom h-[83.3svh] py-24 bg-gray-400 lg:h-[63vh] lg:py-16'>
            <div className='flex flex-col mx-12 item lg:px-96'>
                <h1 className='font-bold text-3xl py-4 text-center'>Login</h1>
                <input onChange={handleChange} name='email' type="email" value={email} className='' placeholder='Enter Email' />
                <input onChange={handleChange} name='password' type="password" value={password} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Password' />
                <button className="bg-fuchsia-500 rounded mx-20 py-2 my-3 lg:mx-40" type='submit'>Login</button>
                <p className='text-center py-2'>Not a member? <span className='font-bold text-black'><Link href={'/Signup'}>Signup</Link></span></p>
            </div>
        </div> */}
    </>
  )
}

export default RequestGames
