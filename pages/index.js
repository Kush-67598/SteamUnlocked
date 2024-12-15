import mongoose from "mongoose";
import game from "../models/game";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";



export default function Home({Action,FPS,Adventure,Horror,Story,Racing,RPG,OpenWorld}) {
const [text,setText]=useState('')
  const handleChange=(e)=>{
    setText(e.target.value)

  }
 const Filtered_array=(games)=>{
  return games.filter((game)=>{
    return game.title.toLowerCase().includes(text.toLowerCase())
  })

 }

  return (
    <>
      <div className="font-custom mx-4 absolute top-60  lg:mx-24 lg:top-72 lg:absolute z-40">
        <h1 className="text-2xl text-[#eb2d1c] lg:text-[40px] py-2 font-bold">GET FREE STEAM GAMES</h1>
        <h2 className=" text-[#ccc] text-xl lg:text-[52px] py-2">PRE-INSTALLED FOR PC</h2>
        <p className="text-sm leading-5 text-white lg: font-semibold lg:text-[16px] py-3">Steam Unlocked allows you to download your favorite games pre-installed on steam without the cost.</p>
        <button className="bg-[#eb2d1c] text-sm mt-5 font-bold text-white p-4 w-36 rounded-md">Browse</button>
      </div>
      <div className="bg-[#222] px-4 lg:py-[20vh] lg:px-20">
        <input type="search" onChange={handleChange} value={text} placeholder="Search a title" className=" focus:outline-none mt-12 mx-8 w-72 lg:w-[68vw] lg:mx-2 h-12 px-10 lg:-mt-1" />
        <h1 className=" text-white text-3xl py-8 px-1">Recently Added</h1>
      

        <div className="cardcontainer grid grid-cols-2 lg:flex lg:flex-nowrap">
        {Filtered_array(Story).map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
            <Link href={`games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100}  alt="" className="w-64 h-64" /></Link>

          </div>
        ))}
        { Filtered_array(OpenWorld).map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
            <Link href={`games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100} alt="" className="w-64 h-64" /></Link>

          </div>
        ))}

        </div>
        {/* <button className=" ml-[30vw] bg-[#eb2d1c] rounded text-sm text-white lg:ml-[40vw] my-7 py-3 px-8" >Load More</button> */}

        <h1 className=" text-white text-3xl py-8 px-1">Action & Adventure</h1>

        <div className="cardcontainer grid grid-cols-2 lg:flex lg:flex-nowrap">
        {Filtered_array(Action).map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
           <Link href={`/games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100} alt="" className="w-64 h-64 cursor-pointer" /></Link>

          </div>
        ))}
        {Filtered_array(Adventure).map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
           <Link href={`/games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100} alt="" className="w-64 h-64 cursor-pointer" /></Link>

          </div>
        ))}

       
        <div>


          
        </div>
        

</div>

        
{/* <button className=" ml-[30vw] bg-[#eb2d1c] rounded text-sm text-white lg:ml-[40vw] my-7 py-3 px-8" >Load More</button> */}
<h1 className=" text-white text-3xl py-8 px-1">FPS & Horror</h1>

        <div className="cardcontainer grid grid-cols-2 lg:flex lg:flex-nowrap">
        {FPS && FPS.map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
           <Link href={`/games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100} alt="" className="w-64 h-64 cursor-pointer" /></Link>

          </div>
        ))}
        {Horror && Horror.map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
           <Link href={`/games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100} alt="" className="w-64 h-64 cursor-pointer" /></Link>

          </div>
        ))}
        <div>
</div>



        </div>
        <h1 className=" text-white text-3xl py-8 px-1">RPG & Racing</h1>
        <div className="cardcontainer grid grid-cols-2 lg:flex lg:flex-nowrap">
        {RPG && RPG.map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
           <Link href={`/games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100} alt="" className="w-64 h-64 cursor-pointer" /></Link>

          </div>
        ))}
        {Racing && Racing.map((item,index)=>(
          
          <div key={index} className="cards px-2 py-2">
           <Link href={`/games/${item.slug}`}><Image src={`/images/${item.img}.jpg`} height={100} width={100} alt="" className="w-64 h-64 cursor-pointer" /></Link>

          </div>
        ))}

</div>
        
{/* <button className=" ml-[30vw] bg-[#eb2d1c] rounded text-sm text-white lg:ml-[40vw] my-7 py-3 px-8" >Load More</button> */}

      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb+srv://kushsingh2666:74U4JlWzeQnlBjTm@cluster0.ovfam.mongodb.net/");
  }
  const Action = await game.find({category:"Action"});
  const FPS = await game.find({category:"FPS"});
  const Story = await game.find({category:"Story"});
  const Adventure = await game.find({category:"Adventure"});
  const Horror = await game.find({category:"Horror"});
  const Racing = await game.find({category:"Racing"});
  const RPG = await game.find({category:"RPG"});
  const OpenWorld = await game.find({category:"OpenWorld"});
  const games=await game.find()

  return {
    props: {
      games:JSON.parse(JSON.stringify(games)),
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