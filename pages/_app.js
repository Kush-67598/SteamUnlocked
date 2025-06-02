import { useState ,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify';
import '../styles/globals.css'
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
      const [user,setUser]=useState(false)
  
  const router=useRouter()
      useEffect(()=>{
          if(localStorage.getItem('TOKEN')){
              router.push('/')
              setUser(true)
              
            }
            else{
              router.push('/login')
              setUser(!user)
          }
      },[])

  const[wishlist,setWishlist]=useState([])


  // THIS USE EFFECT IS USED SO YOUR DATA FROM THE LOCAL STORAGE IS EXTRACTED ON THE INTIAL RENDER OF THE PAGE.
  useEffect(()=>{
    if(localStorage.getItem('WISHLIST')){  
     setWishlist(JSON.parse(localStorage.getItem('WISHLIST')))
      saveWishlist(JSON.parse(localStorage.getItem('WISHLIST')))
    }
  },[])

  const wishlistonclick=(slug,title,img,size)=>{
    let newWishlist={...wishlist}  //Deep copy of wishlist 
    if(!(slug in newWishlist)){
      newWishlist[slug]={slug,title,img,size}
    }
    setWishlist(newWishlist)
    saveWishlist(newWishlist)

    toast.success('Added To Wishlist', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  }

  //****EITHER DOING UPDATING CREATION OR DELETION ALWAYS UPDATE THE STATE AND ALSO SAVE IT TO LOCAL STORAGE IF THE DATA IS BEING TAKEN FROM IT.

  const saveWishlist=(newWishlist)=>{
    localStorage.setItem('WISHLIST',JSON.stringify(newWishlist))  
  }

  const deletewishlistitem=(slug)=>{
    const wishlistupdated={...wishlist}
    delete wishlistupdated[slug] 
    setWishlist(wishlistupdated)
    saveWishlist(wishlistupdated)

    toast.info('Removed From Wishlist', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  }


  return (
    <>
     
<Navbar />
<Component {...pageProps} wishlistonclick={wishlistonclick} wishlist={wishlist} deletewishlistitem={deletewishlistitem} />
<Footer/>
    </>
  )
}
export default MyApp
