import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { React, useState } from 'react'
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false)
  const [dropdownmobile, setDropdownmobile] = useState(false)

  const router = useRouter()
  const HomePage = router.pathname == '/'
  const loginPage = router.pathname == '/login'
  const signupPage = router.pathname == '/Signup'
  const reqgamesPage = router.pathname == '/RequestGames'
  if (loginPage || signupPage) return(
              <Image width={250} height={100}  className='absolute left-2 top-6 lg:left-20 cursor-pointer' src="/images/steam-unlocked-logo.webp" onClick={() => { router.push('/') }} alt="" />

  );

  return (

    <div className="relative font-custom">
      
      {HomePage &&
        <div>
          
          <Image width={250} height={100}  className='absolute left-2 top-6 lg:left-20 cursor-pointer' src="/images/steam-unlocked-logo.webp" onClick={() => { router.push('/') }} alt="" />

         <div
  className="absolute flex items-center gap-1 top-[51px] left-[65vw] lg:left-[85vw] cursor-pointer"
  onClick={() => { router.push('/Wishlist') }}
>
  <span className="text-white font-bold text-lg mx-2">Wishlist</span>
  <FaHeart className="text-red-500 text-xl" />
</div>

          {/* <span className='absolute text-white text-2xl left-[90vw] top-[53px]' onClick={() => { router.push('/Account') }}><MdAccountCircle /></span> */}
          <Image width={1000} height={1}  src="/images/steamunlocked-bg.jpg" alt="" className="h-[65svh] w-full lg:h-[85vh] " />
        </div>
      }
      {!HomePage && <div className='font-custom'>
        <Image width={250} height={1}  className='absolute lg:left-20 top-6 cursor-pointer' src="/images/steam-unlocked-logo.webp" alt="" onClick={() => { router.push('/') }} />
        <Image width={1000} height={1}  src="/images/steamunlocked-bg.jpg" alt="" className="h-[19svh] w-full lg:h-[37vh] object-cover object-top " />
       <div
  className="absolute flex items-center gap-1 top-[51px] left-[65vw] lg:left-[85vw] cursor-pointer"
  onClick={() => { router.push('/Wishlist') }}
>
  <span className="text-white font-bold text-lg mx-2">Wishlist</span>
  <FaHeart className="text-red-500 text-xl" />
</div>


      </div>}
      




      {signupPage && loginPage && <div className='font-custom'>
        <Image width={100} height={100}  className='absolute left-20 top-6 cursor-pointer' src="/images/steam-unlocked-logo.webp" alt="" onClick={() => { router.push('/') }} />
        <Image width={100} height={100}  src="/images/steamunlocked-bg.jpg" alt="" className=" w-full lg:h-[37vh] " />
      </div>}
      

      {reqgamesPage && HomePage && signupPage && loginPage &&<div className='font-custom'>
        <Image width={100} height={100}  className='absolute left-20 top-6 cursor-pointer' src="/images/steam-unlocked-logo.webp" alt="" onClick={() => { router.push('/') }} />
        <Image width={100} height={100}  src="/images/steamunlocked-bg.jpg" alt="" className=" w-full lg:h-[37vh] " />
      </div>}







      <nav className=" font-custom w-[100vw] absolute top-28 lg:absolute lg:top-28 lg:left-20 bg-[#eb2d1c] rounded-sm h-16 lg:flex justify-center items-center text-white z-50 lg:w-[90%]">
        <ul className=" hidden lg:flex gap-3">
          <Link href={'/'} ><li className=" text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer">Home</li></Link>
          <Link href={'/AllGames'} ><li className=" text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer">All Games(A-Z)</li></Link>
          <li onMouseEnter={() => setDropdown(!dropdown)} className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Categories</li>
          <Link href={'/Contact'}><li className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Contact Us</li></Link>
          <Link href={'/'}><li className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>FAQ</li></Link>
          <Link href={'/'}><li className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Help</li></Link>
          <Link href={'/'}><li className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Invalid Games List</li></Link>
          <Link href={'/'}><li className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Latest News</li></Link>
          <Link href={'/RequestGames'}><li className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Request Games</li></Link>
          <Link href={'/'}><li className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Request Updates</li></Link>

        </ul>





        {/* DROPDOWN MENU FOR CATEGORIES */}
        {dropdown && <div onMouseLeave={() => { setDropdown(false) }} onClick={() => { setDropdown(false) }} className='absolute rounded-md bg-slate-700 top-16 right-[59.5vw] w-32 list-none'>
          <Link href={'/Action'} ><li className="  px-6 py-3 hover:text-red-500 rounded-md uppercase text-sm cursor-pointer hover:bg-slate-800">Action</li></Link>
          <hr />
          <Link href={'/Adventure'} ><li className=" px-6 py-3 hover:text-red-500 uppercase text-sm cursor-pointer hover:bg-slate-800">Adventure</li></Link>
          <hr />
          <Link href={'/RPG'} ><li className=" px-6 py-3 hover:text-red-500 uppercase text-sm cursor-pointer hover:bg-slate-800">RPG</li></Link>
          <hr />
          <Link href={'/FPS'} ><li className=" px-6 py-3 hover:text-red-500 uppercase text-sm cursor-pointer hover:bg-slate-800">FPS</li></Link>
          <hr />
          <Link href={'/Horror'} ><li className=" px-6 py-3 hover:text-red-500 uppercase text-sm cursor-pointer hover:bg-slate-800">Horror</li></Link>
          <hr />
          <Link href={'/OpenWorld'} ><li className=" px-6 py-3 hover:text-red-500 uppercase text-sm cursor-pointer hover:bg-slate-800">Open World</li></Link>
          <hr />
          <Link href={'/Racing'} ><li className=" px-6 py-3 hover:text-red-500 uppercase text-sm cursor-pointer hover:bg-slate-800">Racing</li></Link>
          <hr />
          <Link href={'/Story'} ><li className=" px-6 py-3 hover:text-red-500 rounded-md uppercase text-sm cursor-pointer hover:bg-slate-800">Story</li></Link>
        </div>}



        {dropdownmobile && <div className='absolute bg-slate-700 top-16 w-[100vw] list-none'>
          
            <Link href={'/'} ><li  onClick={() => setDropdownmobile(false)}className=" text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer" >Home</li></Link>
            <Link href={'/AllGames'} ><li  onClick={() => setDropdownmobile(false)}className=" text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer">All Games(A-Z)</li></Link>
            <Link href={'/Contact'}><li  onClick={() => setDropdownmobile(false)}className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Contact Us</li></Link>
            <Link href={'/help'}><li  onClick={() => setDropdownmobile(false)}className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Help</li></Link>
            <Link href={'/invaidgames'}><li onClick={() => setDropdownmobile(false)} className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Invalid Games List</li></Link>
            <Link href={'/latestnews'}><li  onClick={() => setDropdownmobile(false)}className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Latest News</li></Link>
            <Link href={'/RequestGames'}><li  onClick={() => setDropdownmobile(false)}className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Request Games</li></Link>
            
            <Link href={'/requpdates'}><li onClick={() => setDropdownmobile(false)} className='text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer'>Request Updates</li></Link>



        </div>

        }

        <div className='flex flex-col justify-center items-center lg:hidden py-5' onClick={() => { setDropdownmobile(!dropdownmobile) }} >
          <span className='bg-white w-6 h-1 my-[1px]'></span>
          <span className='bg-white w-6 h-1 my-[1px]'></span>
          <span className='bg-white w-6 h-1 my-[1px]'></span>
        </div>
      </nav>

    </div>

  );
};

export default Navbar;
