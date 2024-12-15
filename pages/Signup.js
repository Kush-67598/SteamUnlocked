import Link from 'next/link'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()  //Prevents the form from submitting and reloading the page as for eg it redierects to name=?kush?password=?kush1234   we dont want this to happen so we use this...
        const data={name,email,password}
        let res=await fetch('http://localhost:3000/api/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)

        })
toast.success('Your Account Has been Created', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });       

        
        setName('')
        setEmail('')
        setPassword('')

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

        <div className='font-custom bg-gray-400 py-12 h-[50svh] lg:h-[68vh] lg:py-16'>
            <form action="submit" onSubmit={handleSubmit}>
            <h1 className='font-bold text-3xl pt-2 mb-5 text-center text-black drop-shadow-xl'>SignUp</h1>

                <div className=' flex flex-col px-12 lg:px-96'>

                <input className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3' type="text" onChange={handleChange} name='name' value={name} placeholder='Enter your Name' />
                <input className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3' type="text" onChange={handleChange} name='email' value={email} placeholder='Enter your Email' />
                <input className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3' type="text" onChange={handleChange} name='password' value={password} placeholder='Enter your Password' />
                <button className='bg-fuchsia-500 rounded mx-20 py-2 my-3 lg:mx-40'>Signup</button>
                <p className='text-center py-2'>Already a member? <span className='font-bold underline text-black'><Link href={'/login'}>Login</Link></span></p>
                </div>
            </form>
        </div>
    </>
    )
}

export default Signup
