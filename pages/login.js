import Image from 'next/image';
import Link from 'next/link';
import {useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const router=useRouter()
    const [user,setUser]=useState(false)
    const name=router.pathname=="/ReqGames" || router.pathname=="/[slug]" || router.pathname=="/" || router.pathname=="/Action" || router.pathname=="/Racing"|| router.pathname=="/AllGames"|| router.pathname=="/Story"|| router.pathname=="/Horror"|| router.pathname=="/FPS" || router.pathname=="/RPG" || router.pathname=="/Adventure" || router.pathname=="/Contact" || router.pathname=="/Wishlist"


    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if (token && (router.pathname === "/login" || router.pathname === "/signup")) {
            router.push('/');
          }

        // Redirect to login page if not logged imongomn and not already on login page
        if (!token && name && router.pathname !== '/login' && router.pathname !== '/signup') {
            router.push('/login');
          }
          if (token) {
            setUser(true);
          }
    }, []);

    
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
            if (email.trim()=="" || password.trim() == "") {
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
        
        <div className='h-[61.4svh] font-mono lg:h-[80vh] '>
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
            <div className='flex flex-col  absolute top-[22vh] left-[7vw] mx-12 lg:left-[35vw] lg:top-[25vh] '>
                <h1 className='font-bold text-3xl text-white py-4 text-center font-mono'>Login</h1>
                <input onChange={handleChange} name='email' type="email" value={email} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Email' />
                <input onChange={handleChange} name='password' type="password" value={password} className='bg-fuchsia-200 py-2 my-2 rounded-md placeholder:text-gray-600 px-3 ' placeholder='Enter Password' />
                <button className="bg-fuchsia-500 rounded mx-20 px-8 py-2 my-3 lg:mx-40" type='submit'>Login</button>
                <p className='text-center py-2 text-white'>Not a member? <span className=' text-red-500 font-bold'><Link href={'/Signup'}>Signup</Link></span></p>
            </div>
            </form>
        </div>
        </>
    )
}

export default Login
