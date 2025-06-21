import { MdDelete } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
import useCheckAdmin from "../../hooks/useCheckAdmin";
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const [price, setPrice] = useState("");
  const [page,setPage]=useState(1);
  
  const [id, setId] = useState("");
  const loading = useCheckAdmin();
  const [games, setGames] = useState([]);
  const [search,setSearch]=useState('')
  const [formdata, setformData] = useState({
    slug: "",
    title: "",
    img: "",
    size: "",
    category: "",
    desc: "",
    os: "",
    processor: "",
    memory: "",
    graphics: "",
    storage: "",
    ss1: "",
    ss2: "",
    ss3: "",
    price: "",
  });
  
  useEffect(() => {
  fetchGames();
}, [page]);

const nextPage=()=>{
  if(games.length==20){

    setPage(page+1)
  }else{
    setPage(1)
  }
}
const prevPage=()=>{
  if(page!=1)
  setPage(page-1)
}
    const fetchGames = async () => {
      const getgames = await fetch(`http://localhost:3000/api/getgames?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res_get = await getgames.json();
      setGames(res_get)  
    };
    
  if (loading) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "price") {
      setPrice(value);
    } else if (name === "id") {
      setId(value);
    }else if(name=='search'){
      setSearch(value)
    }
  };

 


  const handleUpdate = async (e) => {
    e.preventDefault();
    let data = { id, price };
    let update = await fetch("http://localhost:3000/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let res = await update.json();
    console.log(res);
    setId('')
    setPrice('')
    fetchGames()
    toast.success('Price Successfuy Updated', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  };
const filtered_arr=games.filter((item)=>(
  item.title.toLowerCase().includes(search.toLowerCase())
))

  const handledelete=async(gameId)=>{
    const data={id:gameId}
    const deleteGames=await fetch("http://localhost:3000/api/deletegames",{
      method:"DELETE",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify(data)
      
    })
    const delres=await deleteGames.json()
      console.log(delres)
      setId('')
      await fetchGames()
     
      // setGames(games.filter((game) => game._id !== gameId)); //Deletes the game which you dont want to delete.
    toast.warning('Item Successfuy Deleted', {
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

  if (loading) return <Loader />;

  const HandleChange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.stringify([
      {
        ...formdata,
        price: Number(formdata.price),
      },
      
    ]);
    
try {
  const addgames = await fetch("http://localhost:3000/api/addgames", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  const res = await addgames.json();
await fetchGames()  
}
     catch (err) {
       console.log("error man error");
    }

    

    setformData({
      slug: "",
      title: "",
      img: "",
      size: "",
      category: "",
      desc: "",
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
      ss1: "",
      ss2: "",
      ss3: "",
      price: "",
    });
    toast.success('Game Succesfully Added', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
  };
  

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

      <div className="text-center font-bold text-3xl py-4">Admin Panel</div>

      {/* ADD GAMES FORM */}
      <div className="flex bg-gray-50  shadow-lg mr-3">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="  w-2/3 overflow-x-hidden"
        >
          <div className="border border-blak rounded-lg  border-black mx-4 ">
            <div className="text-center font-bold text-2xl  lg:py-4">
              Add Games
            </div>

            <div className="lg:flex gap-5 lg:my-4 lg:mx-3  ">
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.slug}
                name="slug"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden "
                placeholder="Slug"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.title}
                name="title"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Title"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.price}
                name="price"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Price"
              />
            </div>

            <div className="lg:flex gap-5 lg:my-4 lg:mx-3">
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.img}
                name="img"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Image"
              />

              <input
                type="text"
                onChange={HandleChange}
                value={formdata.size}
                name="size"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Size"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.category}
                name="category"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Category"
              />
            </div>
            <textarea
              name="desc"
              id=""
              rows={4}
              onChange={HandleChange}
              className=" bg-rose-50 lg:w-[61vw] mx-3 rounded-md placeholder:text-gray-500"
              placeholder="Description"
              value={formdata.desc}
            ></textarea>
            <div className="lg:flex gap-5 lg:my-4 lg:mx-3">
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.os}
                name="os"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="OS"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.processor}
                name="processor"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Processor"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.memory}
                name="memory"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 py-2 overflow-x-hidden"
                placeholder="Memory"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.graphics}
                name="graphics"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Graphics"
              />
            </div>
            <div className="lg:flex lg:gap-5 lg:my-4 lg:mx-3">
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.storage}
                name="storage"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="Storage"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.ss1}
                name="ss1"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="ss1"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.ss2}
                name="ss2"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="ss2"
              />
              <input
                type="text"
                onChange={HandleChange}
                value={formdata.ss3}
                name="ss3"
                className="bg-rose-50 rounded-lg  placeholder:text-gray-500 lg:w-full py-2 overflow-x-hidden"
                placeholder="ss3"
              />
            </div>
<div className="flex justify-center items-center mx-[26vw] my-4 ">

            <button className="bg-red-400 rounded-lg w-full p-2" type="submit">
              Submit
            </button>
</div>
          </div>
        </form>







        {/* UPDATE PRICE FORM */}

        <div className="border bg-gray-50  border-black border-r-black  rounded-lg">
          <form onSubmit={handleUpdate}>
            <div className="text-center font-bold text-2xl lg:my-2 lg:py-3">
              Update Price
            </div>

            <div className="flex flex-col  items-center  justify-center placeholder:text-white w-[35vw] h-80 rounded-md">
              <input
                name="id"
                type="text"
                placeholder="ID"
                className="bg-rose-50 py-2 rounded-md my-2 mx-2  w-3/4"
                onChange={handleChange}
                value={id}
              />
              <input
                name="price"
                type="text"
                placeholder="Price"
                className="bg-rose-50 py-2 rounded-md my-2 mx-2 w-3/4  "
                onChange={handleChange}
                value={price}
              />
              <button
                className="bg-rose-400 rounded-md p-2 m-2 w-40"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>









    
      <input type="text" placeholder="SEARCH" name="search" className="w-full bg-red-200" value={search} onChange={handleChange} />



      <div className="">
         <div className="flex justify-between items-center">

            <button className="  bg-red-400 w-32" onClick={()=>prevPage()}>PRev</button>
<span>Page No:{page}</span>
            <button className=" bg-red-400 w-32" onClick={()=>nextPage()}>NExt</button>
            </div>

        <table className="w-full text-left table-auto border border-black ">
          <thead className="bg-rose-200">
            
           
            <tr>
              <th className="border py-2">S.No</th>
              <th className="border py-2">ID</th>
              <th className="border py-2">Game Name</th>
              <th className="border py-2">Category</th>
              <th className="border py-2">Size</th>
              <th className="border py-2">Price</th>
              <th className="border py-2"></th>
            </tr>
          </thead>

          <tbody className="bg-rose-50">
            {filtered_arr.map((item,i) => (
              <tr key={item._id}>

                
                <td className="py-2">{i+1}</td>
                <td className="py-2">{item._id}</td>
                <td className="py-2">{item.title}</td>
                <td className="py-2">{item.category}</td>
                <td className="py-2">${item.price}</td>
                <td className="py-2">{item.size}</td>

                <button  className="text-xl pt-3" onClick={()=>handledelete(item._id)}><MdDelete /></button>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
