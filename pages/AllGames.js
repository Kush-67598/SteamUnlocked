import React, { useState } from "react";
import game from "../models/game";
import Link from "next/link";
import Image from "next/image";

const AllGames = ({ AllGames }) => {
  const [searchtext, setSearchtext] = useState("");
  const HandleChange = (e) => {
    setSearchtext(e.target.value);
  };

  const filteredGames = AllGames.filter((item) =>
    item.title.toLowerCase().includes(searchtext.toLowerCase())
  );
  return (
    <>
      <div className="bg-slate-300 h-full py-6 font-custom">
        <h1 className="text-center py-2 text-xl font-bold">All Games</h1>

        <section className="flex flex-col ">
          <input
            type="search"
            placeholder="Search For Games"
            value={searchtext}
            onChange={HandleChange}
            className=" bg-gray-500 mx-[10vw] rounded-md py-2 my-4 placeholder:text-white text-center "
          />

          {filteredGames.length == 0 && <div>No Search found</div>}
          {filteredGames.map((item, index) => (
            <div key={index} className="flex items-center lg:mx-36">
              <img
                loading="lazy"
                src={`/images/${item.img}.webp`}
                onError={(e)=>e.target.src=`/images/${item.img}.jpg`}
                alt="img"
                width={100}
                height={100}
                className="py-2 max-w-[85px]  min-h-32 max-h-10 lg:min-w-40 lg:min-h-52 "
              />
              <Link href={`/games/${item.slug}`}>
                <div className="px-2">{item.title}</div>
                <div className="px-2 py-2">Size:{item.size}</div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  let AllGames = await game.find();
  return {
    props: { AllGames: JSON.parse(JSON.stringify(AllGames)) }, // will be passed to the page component as props
  };
}

export default AllGames;
