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

    const handleSubmit = async (e) => {
        const data = { name, email, password }
        e.preventDefault()  //Prevents the form from submitting and reloading the page as for eg it redierects to name=?kush?password=?kush1234   we dont want this to happen so we use this...


        if (!name || !email || !password) {
            toast.info('Plz fill the reuired fields', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;  // Prevent further execution if fields are empty
        }

        let res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        })


        const response =await res.json()
        if (response.success) {
            toast.success('Your Account Has been Created', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            setName('');
            setEmail('');
            setPassword('');
        }

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

          <div className=' h-[55.3svh] font-mono lg:h-[80vh] '>
            <div>

            </div>
<picture className=" z-10">
        <source media="(min-width: 1024px)" srcSet="/images/re_door.jpg" />
        <img
          src="/images/qwer.jpg"
          alt="Signup Background"
          className="w-full h-full object-fit"
        />
      </picture>            
      
      <form onSubmit={handleSubmit}>
            <div className='flex flex-col absolute top-[15vh] left-[4vw] mx-12 lg:left-[35vw] lg:top-[25vh] '>
                <h1 className='font-bold text-3xl text-white py-4 text-center font-mono'>Signup</h1>
                <input onChange={handleChange} name='name' type="text" value={name} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Name' />
                <input onChange={handleChange} name='email' type="email" value={email} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Email' />
                <input onChange={handleChange} name='password' type="password" value={password} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Password' />
                <button className="bg-fuchsia-500 rounded mx-20 px-8 py-2 my-3 lg:mx-40" type='submit'>Signup</button>
                <p className='text-center py-2 text-white'>Already a member? <span className=' text-red-500 font-bold'><Link href={'/login'}>Login</Link></span></p>
            </div>
            </form>
        </div>
 






            {/* <div className='font-mono  py-12 h-[50svh] lg:h-[68vh] lg:py-16'>
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
            </div> */}
        </>
    )
}

export default Signup
