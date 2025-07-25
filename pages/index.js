import mongoose from "mongoose";
import game from "../models/game";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCheckView from "../hooks/useCheckView";
import Loader from "../components/Loader";
import useConnectDb from "../hooks/useConnectDb";

export default function Home({
  Action,
  FPS,
  Adventure,
  Horror,
  Story,
  Racing,
  RPG,
  OpenWorld,
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState({
    Action: [...Action],
    Racing: [...Racing],
    Horror: [...Horror],
    Story: [...Story],
    FPS: [...FPS],
    RPG: [...RPG],
  });

  const isMobile = useCheckView();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [pages, setPages] = useState({
    Action: 2,

    Horror: 2,
    Racing: 2,
    Story: 2,
    FPS: 2,
    RPG: 2,
  });

  const loadMore = async (category) => {
    const currentPage = pages[category];
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/Get/mainfetchgames?page=${currentPage}&category=${category}`
      );
      const data = await res.json();
      setLoading(false);

      setGames((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), ...data],
      }));

      setPages((prev) => ({
        ...prev,
        [category]: prev[category] + 1,
      }));
    } catch {
      toast.error("Error While Fetching Games!!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const renderCategorySection = (categoryName, categoryGames) => {
    const filtered = categoryGames.filter((item) => {
      const title = item.title.toLowerCase();
      const search = text.toLowerCase().trim();
      return search.split(" ").every((word) => title.includes(word));
    });

    if (text && filtered.length === 0) return null;
    return (
      <>
        <h1 className="text-white text-3xl py-8 px-1">{categoryName}</h1>
        <div className="cardcontainer grid grid-cols-2 place-items-center lg:flex lg:flex-wrap">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="cards px-2 py-2 hover:-translate-y-2 transition-all ease-in"
            >
              <Link href={`/games/${item.slug}`}>
                <img
                  onClick={() => setLoading(true)}
                  loading="lazy"
                  src={`/images/${item.img}.webp`}
                  onError={(e) => (e.target.src = `/images/${item.img}.jpg`)}
                  height={100}
                  width={100}
                  alt={item.title || "game image"}
                  className="w-44 h-60 cursor-pointer rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>

        {text === "" && (
          <div className="flex justify-center items-center">
            <button
              onClick={() => loadMore(categoryName)}
              className="bg-red-600 px-14 py-4 text-white font-bold text-sm hover:text-gray-400 shadow-lg border-b-4 border-red-900 rounded-md my-4"
            >
              Load More
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {loading && <Loader />}
      {isMobile ? (
        <div className="flex flex-col bg-black w-full items-start justify-center font-custom py-20 top-8">
          <div className="mx-4">
            <h1 className="text-2xl text-[#eb2d1c] lg:text-[40px] py-2 font-bold">
              GET FREE STEAM GAMES
            </h1>
            <h2 className="text-[#ccc] text-xl lg:text-[52px] py-2">
              PRE-INSTALLED FOR PC
            </h2>
            <p className="text-sm leading-5 text-white font-semibold lg:text-[16px] py-3">
              Steam Unlocked allows you to download your favorite games
              pre-installed on steam without the cost.
            </p>
            <Link href="/AllGames">
              <button
                onClick={() => setLoading(true)}
                className="bg-[#eb2d1c] text-sm mt-5 font-bold text-white p-4 w-36 rounded-md"
              >
                Browse
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-4 flex flex-col absolute top-72 px-16">
          <h1 className="text-2xl text-[#eb2d1c] lg:text-[40px] py-2 font-bold">
            GET FREE STEAM GAMES
          </h1>
          <h2 className="text-[#ccc] text-xl lg:text-[52px] py-2">
            PRE-INSTALLED FOR PC
          </h2>
          <p className="text-sm leading-5 text-white font-semibold lg:text-[16px] py-3">
            Steam Unlocked allows you to download your favorite games
            pre-installed on steam without the cost.
          </p>
          <Link href="/AllGames">
            <button className="bg-[#eb2d1c] text-sm mt-5 font-bold text-white p-4 w-36 rounded-md">
              Browse
            </button>
          </Link>
        </div>
      )}

      <div className="bg-[#222] px-4 lg:py-[20vh] lg:px-20">
        <input
          type="search"
          onChange={handleChange}
          value={text}
          placeholder="Search a title"
          className="focus:outline-none rounded-lg mt-12 mx-8 w-72 lg:w-[68vw] lg:mx-2 h-12 px-10 lg:-mt-1"
        />

        {/* Render categories */}
        {renderCategorySection("Action", games.Action)}
        {renderCategorySection("Horror", games.Horror)}
        {renderCategorySection("Racing", games.Racing)}
        {renderCategorySection("Story", games.Story)}
        {renderCategorySection("FPS", games.FPS)}
        {renderCategorySection("RPG", games.RPG)}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  await useConnectDb()

  const [Action, FPS, Story, Horror, Racing, RPG] = await Promise.all([
    game.find({ category: "Action" }).limit(6),
    game.find({ category: "FPS" }).limit(6),
    game.find({ category: "Story" }).limit(6),
    game.find({ category: "Horror" }).limit(6),
    game.find({ category: "Racing" }).limit(6),
    game.find({ category: "RPG" }).limit(6),
  ]);

  return {
    props: {
      Action: JSON.parse(JSON.stringify(Action)),
      FPS: JSON.parse(JSON.stringify(FPS)),
      Story: JSON.parse(JSON.stringify(Story)),
      Horror: JSON.parse(JSON.stringify(Horror)),
      Racing: JSON.parse(JSON.stringify(Racing)),
      RPG: JSON.parse(JSON.stringify(RPG)),
    },
    revalidate: 60,
  };
}
