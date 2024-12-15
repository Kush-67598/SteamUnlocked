import Link from 'next/link';
import {useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const router=useRouter()
    const [user,setUser]=useState(false)


    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if (token && router.pathname !== '/') {
            router.push('/'); // Redirect to the home page
            setUser(true);
        }

        // Redirect to login page if not logged in and not already on login page
        if (!token && router.pathname !== '/login') {
            router.push('/login'); 
        }
    }, [router.pathname]);

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        if (e.target.name == "password") {
            setPassword(e.target.value)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()  //Prevents the form from submitting and reloading the page as for eg it redierects to name=?kush?password=?kush1234   we dont want this to happen so we use this...
        const data={email,password}
            let res=await fetch(`${process.env.NEXT_PUBLIC_API}/api/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            let response = await res.json();
            
            if (response.success) {
                toast.success('Successfully Logged In', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });

                localStorage.setItem("TOKEN", response.token);
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }

            if (!response.success) {
                toast.error('Wrong Credentials', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
        
        setEmail('')
        setPassword('')

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
        
        <div className='font-custom h-[83.3svh] py-24 bg-gray-400 lg:h-[63vh] lg:py-16'>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col mx-12 item lg:px-96'>
                <h1 className='font-bold text-3xl py-4 text-center'>Login</h1>
                <input onChange={handleChange} name='email' type="email" value={email} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Email' />
                <input onChange={handleChange} name='password' type="password" value={password} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Password' />
                <button className="bg-fuchsia-500 rounded mx-20 py-2 my-3 lg:mx-40" type='submit'>Login</button>
                <p className='text-center py-2'>Not a member? <span className='font-bold text-black'><Link href={'/Signup'}>Signup</Link></span></p>
            </div>
            </form>
        </div>
        </>
    )
}

export default Login
