

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [text, setText] = useState("");
  const [token, setToken] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const HandleChange = (e) => {
    setText(e.target.value);
  };

  
  useEffect(()=>{
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("TOKEN");
      setToken(savedToken);
    }
  })

  useEffect(() => {
    if(token){
      fetchWishlist();
    }
    
  }, [token]);


  const deleteWishlist = async (id) => {
    const data=id;
    const fetchlist = await fetch("/api/Delete/deleteWishlist", {
      method: "DELETE",
      headers: {
        Authorization:`Bearer ${token}`,
        'Content-Type':"Application/json"
      },
      body:JSON.stringify(data)
    });
    let response = await fetchlist.json();

      if (response && response.wishlist) {
      setWishlist(response.wishlist);
      toast.success('Removed From the Wishlist', {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
    } 

  };

  const fetchWishlist = async () => {
    const fetchlist = await fetch("/api/Get/getWishlist", {
      method: "GET",
      headers: {
        Authorization:`Bearer ${token}`,
      },
    });
    let response = await fetchlist.json();

      if (response && response.wishlist) {
      setWishlist(response.wishlist);
      
    } 

  };

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
      <div className="bg-slate-300 min-h-[42.3vh] py-16 lg:py-4 font-custom">
        <h1 className="text-center py-2 text-2xl font-bold">Wishlist</h1>

        <section className="flex flex-col ">
          <input
            type="search"
            value={text}
            onChange={HandleChange}
            placeholder="Search For Games"
            className=" bg-gray-500 mx-[10vw] rounded-md py-2 my-4 placeholder:text-white text-center "
          />
          {wishlist.length == 0 && (
            <div className=" text-xl px-2 py-4 font-bold text-center lg:text-center lg:mx-32">
              <strong>Add Games To Your Wishlist To See Them Here!!</strong>
            </div>
          )}
          
            {wishlist.map((item,index)=>(

            <div key={index} className="flex items-center pt-4 px-1 lg:mx-36">
              <img
                loading="lazy"
                width={100}
                height={100}
                src={`/images/${item.img}.webp`}
                onError={(e) => (e.target.src = `/images/${item.img}.jpg`)}
                alt="img"
                className="py-2 max-w-[85px]  min-h-32 max-h-10 lg:min-w-40 lg:min-h-52 "
              />
              <Link href={`/games/${item.slug}`}>
                <div className="px-2">{item.title}</div>
                <div className="px-2 py-2">Size:{item.size}</div>
              </Link>
              <span
                className="cursor-pointer px-2 text-2xl -mt-[60px] lg:-mt-9 "
                onClick={()=>deleteWishlist(item._id)}
              >
                <MdDelete />
              </span>
            </div>
          
          ))}
          
        </section>
      </div>
    </>
  );
};

export default Wishlist;
