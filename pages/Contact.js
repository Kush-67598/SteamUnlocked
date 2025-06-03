import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [text, setText] = useState('')
  const onSubmit = async(e) => {


    const data={text}
    if (text.trim() === "") {
    toast.error('Please fill in the required field.', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  }
    const contactData=await fetch(`${process.env.NEXT_PUBLIC_API}/api/contact`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      
    })
    toast.success('Your Response has been Submitted.', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setText('')

  }

  

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

      
      <div>
        </div>
<picture className=" z-10">
        <source media="(min-width: 1024px)" srcSet="/images/re_door.jpg" />
        <img
          src="/images/qwer.jpg"
          alt="Signup Background"
          className="w-full h-[50vh] lg:h-full object-fit"
        />
      </picture>  
        <div className='absolute font-mono top-[20svh] lg:top-[46vh]  w-full h-full'>
          <h1 className='py-6 text-center text-white text-xl font-bold font-custom lg:text-4xl'>Contact Us</h1>
          <div className=' h-[35vh] lg:h-[42vh] lg:pt-8  flex flex-col'>
            <textarea rows={20} type="text" className='min-h-20 my-4 mx-4 rounded-md text-white font-mono lg:mx-40 lg:min-h-96 bg-transparent border border-red-500 focus:outline-red-500' onChange={(e) => { setText(e.target.value) }} value={text} placeholder='Explain Your Concern' />
              

            <button type='submit' className='bg-red-600 py-4 mx-20 rounded lg:mx-[42vw]' onClick={onSubmit} >Submit</button>
          </div>

        </div>
      
    </>
  )
}

export default Contact
