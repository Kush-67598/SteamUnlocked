  import Image from "next/image";
  import Link from "next/link";
  import { FaHeart } from "react-icons/fa";
  import { TbLogout } from "react-icons/tb";
  import useCheckView from "../hooks/useCheckView";
  import { useEffect, useState } from "react";
  import { Router, useRouter } from "next/router";
  import 'react-toastify/dist/ReactToastify.css';
  import { toast, ToastContainer } from "react-toastify";




  const Navbar = () => {

    const logout = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("TOKEN")
        toast.success('Successfully Logged Out', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          router.push('/login')
        }, 1000)

      }


    }


    const router = useRouter()
    const categoryPaths = ["/Action", "/RPG", "/FPS", "/Horror", "/Racing", "/Story"];
    const isCategoryPage = categoryPaths.includes(router.pathname);

    const loginPage = router.pathname == '/login'
    const HomePage = router.pathname == '/'
    const SlugPage = router.pathname == '/games/[slug]'
    const AllGamesPage = router.pathname == '/AllGames'
    const WishlistPage = router.pathname == '/Wishlist'
    const RequestGames = router.pathname == '/RequestGames'

    const signUpPage = router.pathname == '/Signup'


    const navLinks = [
      { label: "Home", href: "/" },
      { label: "All Games(A-Z)", href: "/AllGames" },
      { label: "Categories", href: "#", isDropdown: true },
      { label: "Contact Us", href: "/Contact" },
      { label: "FAQ", href: "/" },
      { label: "Help", href: "/Help" },
      { label: "Invalid Games List", href: "/" },
      { label: "Latest News", href: "/" },
      { label: "Request Games", href: "/RequestGames" },
      { label: "Request Updates", href: "/" },
    ];
    const dropdownLinks = [
      { label: "Action", href: "/Action" },
      { label: "RPG", href: "/RPG", },
      { label: "FPS", href: "/FPS" },
      { label: "HORROR", href: "/Horror" },
      { label: "RACING", href: "/Racing" },
      { label: "STORY", href: "/Story" },

    ];



    const [dropdownmobile, setDropdownmobile] = useState(false)

    const [dropdown, setDropdown] = useState(false)

    const isMobile = useCheckView();
    return (

      <>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {isMobile && (HomePage || SlugPage || AllGamesPage || WishlistPage || isCategoryPage || RequestGames) && !(loginPage || signUpPage) ? (
          <div className={`relative  ${isCategoryPage ? 'py-[0.1rem]' : "h-[10vh]"}  bg-black w-full`}>

            <div className="h-full w-full flex items-center justify-between px-6  text-white">
              {/* Logo */}
              <Image
                src="/images/steam-unlocked-logo.webp"
                alt="Logo"
                width={200}
                height={80}
                className="h-auto -ml-3 -mt-1"
                priority
                onClick={() => router.push('/')}

              />

              {/* Nav Actions */}
              <div className="flex gap-6 items-center text-lg">
                <Link href="/Wishlist">
                  <div className="cursor-pointer hover:text-red-400 transition">Wishlist</div>
                </Link>
                <FaHeart className="text-red-500 text-xl" />
                <button className="hover:text-gray-300 transition">
                  <TbLogout size={24} onClick={() => { logout() }} />
                </button>
              </div>


            </div>
            {(HomePage || SlugPage || AllGamesPage || WishlistPage || isCategoryPage) && !(loginPage || signUpPage) && (

              <div className="text-white bg-red-600 py-2  flex  items-center justify-center " >
                <div className="flex flex-col justify-center items-center min-w-16  bg-gray-800 py-3 rounded-md mx-36" onClick={() => { setDropdownmobile(!dropdownmobile) }}>
                  <div className="bg-white h-1 w-6 my-[0.10rem] "></div>
                  <div className="bg-white h-1 w-6 my-[0.10rem] "></div>
                  <div className="bg-white h-1 w-6 my-[0.10rem] "></div>
                </div>

              </div>
            )}
            {dropdownmobile && <div className=' border-black border-[1px] rounded-md bg-gray-900 text-white top-16 w-[100vw] list-none z-[9999]'>
              {navLinks.map((links, index) => (
                <Link href={links.href} ><li key={index} onClick={() => setDropdownmobile(false)} className=" text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer">{links.label}</li></Link>
              ))}



            </div>
            }
          </div>

        ) : ((HomePage || SlugPage || AllGamesPage || WishlistPage || isCategoryPage) && <div className={`relative ${HomePage ? "h-[85vh]" : SlugPage ? 'h-[27vh]' : AllGamesPage || WishlistPage ? 'h-[40vh]' : isCategoryPage ? 'h-[44vh]' : ""} w-full`}>
          {/* Background image */}
          <Image
            src="/steamunlocked-bg.jpg"
            alt="Background"
            fill
            className="object-cover object-center -z-10"
            priority
          />
          {/* Content over image */}


          <div className="h-full w-full flex items-baseline justify-between text-white">
            <Image
              src="/images/steam-unlocked-logo.webp"
              alt="Logo"
              width={230}
              height={120}
              className="ml-20 "
              priority
            />

            {/* Nav Actions */}
            <div className="flex gap-6 items-center text-lg mx-4">
              <Link href="/Wishlist">
                <div className="cursor-pointer hover:text-red-400 transition">Wishlist</div>
              </Link>
              <FaHeart className="text-red-500 text-xl" />
              <button className="hover:text-gray-300 transition">
                <TbLogout size={24} onClick={() => { logout() }} />
              </button>
            </div>
          </div>




          {/* DROPDOWN MENU FOR CATEGORIES */}
          {dropdown && <div onMouseLeave={() => { setDropdown(false) }} onClick={() => { setDropdown(false) }} className='absolute font-extralight rounded-md z-10  bg-[#1c1c1c] text-white border-black border-2 top-44 left-[27.5%] w-28 list-none'>

            {dropdownLinks.map((links, index) => (
              <Link href={links.href} ><li key={index} className=" px-6 py-3 hover:text-red-500 hover:transition-all hover:duration-300  rounded-md uppercase text-sm cursor-pointer hover:bg-slate-800">{links.label}</li><div className="bg-black h-[0.03rem]"></div></Link>))}

          </div>}

          {/* Actual Navbar */}


          <nav className=" shadow-xl  absolute top-28 left-20 bg-[#eb2d1c] rounded-sm h-16 flex justify-center items-center text-white z-50 opacity-85 w-[88%] mx-4">

            <ul className=" hidden lg:flex gap-3">
              {navLinks.map((link, index) => (
                link.isDropdown ? (<li
                  key={index}
                  onMouseEnter={() => setDropdown(!dropdown)}
                  className="text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer"
                >
                  {link.label}
                </li>) : (
                  <Link key={index} href={link.href}>
                    <li className="text-md px-3 py-3 hover:bg-[#eb2d1c] rounded-xl cursor-pointer">
                      {link.label}
                    </li>
                  </Link>
                )
              ))}
            </ul>

          </nav>
        </div>)}




      </>
    );
  };

  export default Navbar;
