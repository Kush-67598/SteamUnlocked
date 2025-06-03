import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const Wishlist = ({ wishlist,deletewishlistitem }) => {

  const [text,setText]=useState('')
  const HandleChange=(e)=>{
    setText(e.target.value)
  }
  const filteredWishlist = Object.values(wishlist).filter((item)=>(
    item.title.toLowerCase().includes(text.toLowerCase())
  ))
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
       <div className='bg-slate-300 min-h-[43.3vh] py-2 font-custom'>
      <h1 className='text-center py-2 text-2xl font-bold'>Wishlist</h1>

      <section className='flex flex-col '>

        <input type="search" value={text} onChange={HandleChange} placeholder='Search For Games' className=' bg-gray-500 mx-[10vw] rounded-md py-2 my-4 placeholder:text-white text-center ' />
           {filteredWishlist.length==0 && <div className=" text-xl px-2 py-4 font-bold text-center lg:text-center lg:mx-32"><strong>Add Games To Your Wishlist To See Them Here!!</strong></div>}   
{filteredWishlist.map((item,index)=>(

            <div key={index} className='flex items-center pt-4 px-1 lg:mx-36'>

            <Image width={100} height={100} src={`/images/${item.img}.jpg`} alt="img" className='py-2 max-w-[85px]  min-h-32 max-h-10 lg:min-w-40 lg:min-h-52 '/>
                      <Link href={`/games/${item.slug}`}><div className='px-2'>{item.title}</div><div className='px-2 py-2'>Size:{item.size}</div></Link>
                      <span className="cursor-pointer px-2 text-xl -mt-[60px] lg:-mt-9 "onClick={()=>{deletewishlistitem(item.slug)}}>

                      <MdDelete   />
                      </span>
            </div>
            ))}
      </section>
      </div>
      
    </>
    );
  };
  
  export default Wishlist;
  