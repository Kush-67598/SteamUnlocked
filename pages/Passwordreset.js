import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Passwordreset = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [starttimer, setStarttimer] = useState(false)
  const [email, setEmail] = useState('')
  const [seconds, setSeconds] = useState(120)
  const [loading, setLoading] = useState(false)
  const [Otp, setOtp] = useState('')
  const [last, setLast] = useState(false)
  const [active, setActive] = useState(true)
  const [initialPass, setIntialPass] = useState('')
  const [finalPass, setFinalPass] = useState('')
  const router = useRouter()

  useEffect(() => {

    const timer = setInterval(() => {
      if (!starttimer) return
      setSeconds(time => {
        if (time <= 1) {
          clearInterval(timer)
          return 0;
        }
        return time - 1

      })
    }, 1000)

  }, [starttimer])




  const handleSubmit = async (e) => {

    e.preventDefault()
    if (!email) {
      toast.error("Email field is required", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseonHover: false,
        draggable: true,
        theme: "dark",
      })
    }
    else {
      setLoading(true)
      const handleReset = await fetch(`${process.env.NEXT_PUBLIC_API}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({ email })
      })

      let response = await handleReset.json()
      setLoading(false)
      if (response.success) {
        setStarttimer(true)
        setActive(false)
      } else if (response.found == false) {
        toast.error("Email Address Not found")

      }
    }
  }

  const handle_verify_otp = async (e) => {
    e.preventDefault()
    if (Otp.length == 0) {
      toast.error("Otp Cant be Empty", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseonHover: false,
        draggable: true,
        theme: "dark",
      })
    }
    else {
      setLoading(true)
      const verify = await fetch(`${process.env.NEXT_PUBLIC_API}/api/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({ Otp, email })
      })

      const response = await verify.json()

      setLoading(false)
      if (response.success) {
        setActive(active)
        toast.success("OTP verified Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseonHover: false,
          draggable: true,
          theme: "dark",
        })
        setLast(true)
        setOtp('')
      } else {
        toast.error("Entered Wrong OTP")
      }
    }

  }




  const password_Change = async (e) => {
    e.preventDefault()
    if (!initialPass || !finalPass) {
      toast.info("Password Field is Required")
      return
    }
     else if (initialPass != finalPass) {
      toast.error("Passwords Dont match", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      })
      return
    }
    else {
      setLoading(true)
      const pass_change = await fetch(`${process.env.NEXT_PUBLIC_API}/api/changePassotp`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({ email, finalPass })
      })
      const response = await pass_change.json()
      setLoading(false)

      if (response.success) {
        toast.success("Password Changed Successfully... Now You Can Login..Redirecting to Login page", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        })
        setIntialPass('')
        setFinalPass('')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else if (!response.success) {
        toast.error("Internal Server Error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        })
      }
    }



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
      {loading && <Loader />}
      <main className=''>

        <div className='h-[65.8svh] relative lg:h-[100vh]  '>
          <picture className="z-10">
            <source media="(min-width: 1024px)" srcSet="/images/lifeisstrange.jpg" />
            <img
              src="/images/ghost.jpeg"
              alt="Signup Background"
              className="w-full h-full object-fit"
            />
          </picture>

          <div className='absolute inset-0 flex justify-center items-center'>
            <form onSubmit={handleSubmit}>
              {active &&
                <div className='flex flex-col rounded-lg p-12 '>
                  <h1 className='font-bold text-3xl text-white py-4 text-center '>Reset Password</h1>

                  <input type="email" className='bg-white py-2 my-2 rounded-md placeholder:text-gray-600 px-3' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your Email Address' />

                  <button type='submit' className={`bg-fuchsia-500 rounded w-72 placeholder:text-center px-6 py-2 `}>Submit</button>
                </div>}
            </form>

            {
              (!active && !last) &&
              <form onSubmit={handle_verify_otp}>
                <div className='flex flex-col justify-center max-w-80'>
                  <h1 className='font-bold text-3xl text-white py-4 text-center '>Enter Otp</h1>



                  <input type="text" className='bg-white py-2 my-2 rounded-md placeholder:text-gray-600 px-3' placeholder='Enter the OTP' value={Otp} onChange={(e) => { setOtp(e.target.value) }} />

                  <span className='text-sm py-1 text-white'>Otp Successfully Sent to:</span><br /><span className='text-white'>Email:<i className='text-red-600'>{email}</i></span><br />

                  <span className='text-sm py-1 text-white'>Otp Valid Till: <b className='text-red-600'>{seconds} seconds </b></span>
                  {seconds == 0 && <span className='text-sm my-1'><b>OTP has been Expired..</b></span>

                  }


                  <button disabled={seconds == 0} className={`bg-lime-500 rounded lg:px-6 py-2 ${seconds == 0 ? 'cursor-not-allowed bg-green-300' : 'cursor-pointer '}`}>Submit</button>
                </div>

              </form>
            }

            {
              last &&
              <form onSubmit={password_Change}>
                <div className='flex flex-col'>
                  <h1 className='font-bold text-3xl text-white py-4 text-center '>Change Password</h1>

                  <input
                     type={showPassword ? "text" : "password"}
                    name='password'
                    className="flex px-3 py-2 my-2  rounded-md outline-none bg-white placeholder:text-gray-600"
                    placeholder="Enter New Password"
                    value={initialPass}
                    onChange={(e) => { setIntialPass(e.target.value) }}
                  />
                  <div className='flex bg-white rounded-md  items-center justify-center'>

                    <input
                      type={showPassword ? "text" : "password"}
                      name='password'
                      className="flex py-2 px-3 rounded-md outline-none bg-white placeholder:text-gray-600"
                      placeholder="Confirm New Password"
                      value={finalPass}
                      onChange={(e) => { setFinalPass(e.target.value) }}
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer px-3 text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                  </div>
                  <button className={`bg-lime-500 rounded py-2 my-2 `}>Submit</button>
                </div>

              </form>
            }





          </div>
        </div>
      </main>66


    </>

  )
}

export default Passwordreset
