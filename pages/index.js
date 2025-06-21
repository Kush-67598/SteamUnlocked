import mongoose from "mongoose";
import game from "../models/game";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Router, useRouter } from "next/router";


export default function Home({ Action,FPS,Adventure,Horror,Story,Racing,RPG,OpenWorld}){

  const router=useRouter()
  const [text, setText] = useState("");
  const [games,setGames]=useState({
    Action:[...Action],Racing:[...Racing],Horror:[...Horror],Story:[...Story]
  })


  
  useEffect(()=>{

    const token=localStorage.getItem('TOKEN')
    if(!token){
      router.push('/login')
    }
  })
  


  
  // const loadMore=async(category)=>{
  //   const fetchAction_games=await fetch(`/api/mainfetchgames?page=${page}&category=${category}`,{
  //     headers:{
  //       "Content-Type":"Application/json"
  //     }
  //   })
  //   const response=await fetchAction_games.json()
  //   setGamesArray(item=>[...item,...response])    
  // }
  const [pages, setPages] = useState({
  Action: 2,
  Horror: 2,
  Racing: 2,
  Story:2,
});



  const loadMore = async (category) => {
  const currentPage = pages[category];

  const res = await fetch(`/api/mainfetchgames?page=${currentPage}&category=${category}`);
  const data = await res.json();

  setGames(prev => ({
    ...prev,[category]: [...(prev[category] || []), ...data],
  }));

  setPages(prev => ({
    ...prev,[category]: prev[category] + 1,
  }));
};

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="font-custom mx-4 absolute top-60  lg:mx-24 lg:top-72 lg:absolute z-40">
        <h1 className="text-2xl text-[#eb2d1c] lg:text-[40px] py-2 font-bold">
          GET FREE STEAM GAMES
        </h1>
        <h2 className=" text-[#ccc] text-xl lg:text-[52px] py-2">
          PRE-INSTALLED FOR PC
        </h2>
        <p className="text-sm leading-5 text-white lg: font-semibold lg:text-[16px] py-3">
          Steam Unlocked allows you to download your favorite games
          pre-installed on steam without the cost.
        </p>
        <Link href={"/AllGames"}>
          <button className="bg-[#eb2d1c] text-sm mt-5 font-bold text-white p-4 w-36 rounded-md">
            Browse
          </button>
        </Link>
      </div>
    

      <div className="bg-[#222] px-4 lg:py-[20vh] lg:px-20">
        <input
          type="search"
          onChange={handleChange}
          value={text}
          placeholder="Search a title"
          className=" focus:outline-none rounded-lg mt-12 mx-8 w-72 lg:w-[68vw] lg:mx-2 h-12 px-10 lg:-mt-1"
        />
        

        <h1 className=" text-white text-3xl py-8 px-1">Action </h1>

        <div className="card grid grid-cols-2 lg:flex lg:flex-wrap">
          {games.Action.map((item, index) => (
            <div key={index} className="cards px-2 py-2">
              <Link href={`/games/${item.slug}`}>
                <img
                  loading=""
                  src={`/images/${item.img}.webp`}
                  onError={(e)=>e.target.src=`/images/${item.img}.jpg`}
                  height={100}
                  width={100}
                  alt=""
                  className="w-44 h-60 cursor-pointer"
                />
              </Link>
            </div>
          ))}
          

        </div>
        <div className="flex justify-center items-center">

          <button onClick={()=>{loadMore('Action')}} className="bg-red-600 px-14 py-4 text-white font-custom font-bold text-sm hover:text-gray-400 shadow-lg  border-b-4 border-red-900  rounded-md my-4 ">Load More</button>
        </div>

        <h1 className=" text-white text-3xl py-8 px-1"> Horror</h1>

        <div className="cardcontainer grid grid-cols-2 lg:flex  lg:flex-wrap">
          
           
          {Horror &&
            games.Horror.map((item, index) => (
              <div key={index} className="cards px-2 py-2">
                <Link href={`/games/${item.slug}`}>
                  <img
                    loading="lazy"
                    src={`/images/${item.img}.webp`}
                    onError={(e)=>e.target.src=`/images/${item.img}.jpg`}
                    height={100}
                    width={100}
                    alt=""
                    className="w-44 h-60 cursor-pointer"
                  />
                </Link>
              </div>
            ))}
        </div>
            <div className="flex justify-center items-center">

          <button onClick={()=>loadMore('Horror')} className="bg-red-600 px-14 py-4 text-white font-custom font-bold text-sm hover:text-gray-400 shadow-lg  border-b-4 border-red-900  rounded-md my-4 ">Load More</button>
        </div>
        <h1 className=" text-white text-3xl py-8 px-1">Racing</h1>
        <div className="cardcontainer grid grid-cols-2 lg:flex lg:flex-wrap">
          
          {Racing &&
            games.Racing.map((item, index) => (
              <div key={index} className="cards px-2 py-2">
                <Link href={`/games/${item.slug}`}>
                  <img
                    loading="lazy"
                    src={`/images/${item.img}.webp`}
                    onError={(e)=>e.target.src=`/images/${item.img}.jpg`}
                    height={100}
                    width={100}
                    alt=""
                    className="w-44 h-60 cursor-pointer"
                  />
                </Link>
              </div>
            ))}
        </div>
            <div className="flex justify-center items-center">

          <button onClick={()=>loadMore('Racing')} className="bg-red-600 px-14 py-4 text-white font-custom font-bold text-sm hover:text-gray-400 shadow-lg  border-b-4 border-red-900  rounded-md my-4  ">Load More</button>
        </div>



      <h1 className=" text-white text-3xl py-8 px-1">Story</h1>
        <div className="cardcontainer grid grid-cols-2 lg:flex lg:flex-wrap">
          
          {Story &&
            games.Story.map((item, index) => (
              <div key={index} className="cards px-2 py-2">
                <Link href={`/games/${item.slug}`}>
                  <img
                    loading="lazy"
                    src={`/images/${item.img}.webp`}
                    onError={(e)=>e.target.src=`/images/${item.img}.jpg`}
                    height={100}
                    width={100}
                    alt=""
                    className="w-44 h-60 cursor-pointer"
                  />
                </Link>
              </div>
            ))}
        </div>
         <div className="flex justify-center items-center">

          <button onClick={()=>loadMore('Story')} className="bg-red-600 px-14 py-4 text-white font-custom font-bold text-sm hover:text-gray-400 shadow-lg  border-b-4 border-red-900  rounded-md my-4 ">Load More</button>
        </div>
              </div>

    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://Steam:s_unlocked1234@cluster0.ovfam.mongodb.net/"
    );
  }
  const Action = await game.find({ category: "Action" }).limit(6);
  const FPS = await game.find({ category: "FPS" }).limit(6);
  const Story = await game.find({ category: "Story" }).limit(6);
  const Adventure = await game.find({ category: "Adventure" }).limit(6);
  const Horror = await game.find({ category: "Horror" }).limit(6);
  const Racing = await game.find({ category: "Racing" }).limit(6);
  const RPG = await game.find({ category: "RPG" }).limit(6);
  const OpenWorld = await game.find({ category: "OpenWorld" }).limit(6);

  return {
    props: {
      Action: JSON.parse(JSON.stringify(Action)),
      FPS: JSON.parse(JSON.stringify(FPS)),
      Story: JSON.parse(JSON.stringify(Story)),
      Adventure: JSON.parse(JSON.stringify(Adventure)),
      Horror: JSON.parse(JSON.stringify(Horror)),
      Racing: JSON.parse(JSON.stringify(Racing)),
      RPG: JSON.parse(JSON.stringify(RPG)),
      OpenWorld: JSON.parse(JSON.stringify(OpenWorld)),
    },
  };
}
