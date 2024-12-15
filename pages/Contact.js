import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [text, setText] = useState('')
  const onSubmit = () => {
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
        <div className='bg-gray-800'>
          <h1 className='py-6 text-center text-white font-bold font-custom'>Contact Us</h1>
          <div className='bg-green-300 h-[35vh] flex flex-col'>
            <textarea rows={8} type="text" className='my-4 mx-4 rounded-md lg:mx-40 lg:max-h-32 bg-green-100' onChange={(e) => { setText(e.target.value) }} value={text} placeholder='Explain Your Concern' />

            <button type='submit' className='bg-green-600 py-4 mx-20 rounded lg:mx-[42vw]' onClick={onSubmit} >Submit</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Contact
