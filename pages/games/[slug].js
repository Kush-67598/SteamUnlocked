import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mongoose from "mongoose";
import game from "../../models/game";
import { FaHeart } from "react-icons/fa";
import PopularGames from "../../components/PopularGames";

const Slug = ({ games, wishlistonclick }) => {
  
  const new_title=games.title.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")    
  const chartRef = useRef(null); // canvas element
  const chartInstanceRef = useRef(null); // Chart instance

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return; // Prevent running if canvas not ready

    let monthlyData = {};

    games.priceHistory.forEach((item) => {
      const date = new Date(item.date);
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`; // e.g., "2024-0" for Jan 2024
      monthlyData[monthKey] = item; // overwrites with the last entry of that month
    });

    const chart = Object.values(monthlyData).map((item) => item.value);

    const labels = Object.values(monthlyData).map((item) => {
      const date = new Date(item.date);
      return date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }); // "Jan 2024"
    });

    const colors = labels.map(() => {
      const r = Math.floor(Math.random() * 155 + 100);
      const g = Math.floor(Math.random() * 155 + 100);
      const b = Math.floor(Math.random() * 155 + 100);
      return `rgba(${r},${g},${b},0.8)`;
    });
    console.log(games.priceHistory);

    // Destroy old chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: `Game Price Variation For ${new_title}`,
            data: chart,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "white", // Change legend text color
            },
          },
          title: {
            color: "white", // If you use title plugin
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white", // X-axis label color
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)", // optional: change x-axis grid line color
            },
          },
          y: {
            ticks: {
              color: "white", // Y-axis label color
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)", // optional: change y-axis grid line color
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

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

      <div className="topinfo bg-black h-16 text-white text-center py-4 lg:py-4 font-custom">
        {games.length == 0 && <div>no games</div>}
        {games && (
          <div className="text-xs py-3 lg:py-2 ">
            <strong className="text-slate-400">Home</strong>&rarr;{new_title}
          </div>
        )}
      </div>

      <div className="bg-[#222] lg:py-6 lg:pl-20 font-custom ">
        <div className=" bg-white mx-4 lg:w-2/3">
          <div className=" flex flex-col justify-center lg:items-center lg:flex">
            {games.length == 0 && <div>No Games to Show</div>}
            {games && (
              <>
                <h1 className="font-bold text-2xl text-center py-4 px-4">
                  {new_title}
                </h1>
                <h2 className="font-bold text-2xl pt-3 text-center font-sans">
                  Game Overview
                </h2>
                <p className="text-sm text-[#333] py-8 px-4">{games.desc}</p>
                <div className="flex flex-col justify-center items-center">
                  <img
                    width={100}
                    height={100}
                    className="px-2 max-w-96 min-w-[302px]  "
                    src={`/images/${games.img}.webp`}
                    onError={(e) => {
                      e.target.src = `/images/${games.img}.jpg`;
                    }}
                    alt=""
                  />
                  <button
                    className="flex items-center justify-center rounded-lg min-w-72 bg-red-600 mt-4 p-4 hover:bg-black text-white lg:rounded lg:w-72 lg:ml-0"
                    onClick={() => {
                      wishlistonclick(
                        games.slug,
                        new_title,
                        games.img,
                        games.size
                      );
                    }}
                  >
                    Add to Wishlist
                    <FaHeart className="ml-2 text-lg" />{" "}
                  </button>
                </div>
                <h1 className="font-bold text-2xl text-center py-6 ">
                  Installation Instructions
                </h1>

                <ol className="list-decimal text-sm px-11 text-[#333] ">
                  <li>
                    Click the green button below to be redirected to
                    UploadHaven.com.
                  </li>
                  <li>
                    Wait 15 seconds, then click on the “free download” button.
                    Allow the file transfer to complete (note that speeds may be
                    slower with the free plan; upgrading to UploadHaven Pro will
                    increase speeds).
                  </li>
                  <li>
                    Once the transfer is complete, right-click the .zip file and
                    select “Extract to {new_title}” (To do this you must have
                    7-Zip, which you can get here).
                  </li>
                  <li>
                    Open the folder that you just extracted and run the game as
                    administrator.
                  </li>
                  <li>
                    Enjoy the game! Ensure you run it as an administrator to
                    avoid any issues. If you encounter any missing DLL errors,
                    check the Redist or _CommonRedist folder and install all
                    necessary programs.
                  </li>
                </ol>
                <h2 className="font-bold text-2xl text-center py-4">
                  Download Links
                </h2>
                <p className="px-4 text-sm text-[#333]">
                  You can get the full version of this game from the links
                  provided below. Running the game as an administrator is
                  recommended for optimal performance and to avoid save issues.
                </p>

                <div className="lg:flex items-center justify-center">
                  <div className="flex flex-col ">
                    <a href={`/api/Downloads/${games.slug}`}>
                      <button className="lg:w-48  hover:bg-green-600 hover:text-white hover:border-black  border-green-600 border rounded-md mx-16 py-12 px-4 my-4 font-semibold text-[#333] lg:mx-4 lg:my-7">
                        {new_title}
                        <br />
                        <span>Size:{games.size}</span>
                      </button>
                    </a>
                  </div>

                  <div className="flex flex-col ">
                    <a
                      href="https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/"
                      target="_blank"
                    >
                      <button className="lg:w-48  hover:bg-green-600 hover:text-white hover:border-black  border-green-600 border rounded-md mx-16 py-12 px-4 my-4 font-semibold text-[#333] lg:mx-4 lg:my-7">
                        {new_title}
                        <br></br>Steam
                        <span>Price:${games.price}</span>
                      </button>
                    </a>
                  </div>

                  <div className="flex flex-col text-center w-full lg:flex items-center ">
                    <div className="lg:w-48  hover:bg-green-600 hover:text-white hover:border-black  border-green-600 border rounded-md mx-16 py-12 px-4 my-4 font-semibold text-[#333] lg:mx-4 lg:my-7">
                      Min Price:$
                      {games.priceHistory.length == 0
                        ? games.price
                        : Math.min(
                            ...games.priceHistory.map((item) => item.value)
                          )}
                      <div className="font-bold cursor-none">
                        Max Price:$
                        {games.priceHistory.length == 0
                          ? games.price
                          : Math.max(
                              ...games.priceHistory.map((item) => item.value)
                            )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 text-sm text-[#333] ">
                  <p>
                    <strong>Easy Setup:</strong> Unless GOG specified, no
                    installation is needed. If you encounter missing DLL errors,
                    check for a _Redist or _CommonRedist folder. Install
                    DirectX, Vcredist, and all other necessary programs from
                    that folder to ensure the game runs smoothly.
                  </p>

                  <ol className="text-sm py-4 text-[#333]">
                    <li>
                      <strong>Helpful Tips:</strong>For more detailed
                      instructions, refer to the HOW TO RUN GAME!!.txt file
                      included.
                    </li>
                    <li>
                      Right-click the game’s executable file and choose “Run as
                      administrator” if you experience issues saving your game.
                    </li>
                    <li>
                      Disable your antivirus before extracting the game to
                      prevent it from deleting essential crack files.
                    </li>
                    <li>
                      {" "}
                      Ensure your graphics card runs smoothly by updating your
                      GPU drivers to the latest version. This can significantly
                      enhance game performance and compatibility.
                    </li>
                  </ol>

                  <p>
                    Need More Help? Visit our FAQ page for solutions to
                    frequently asked questions and common issues.
                  </p>
                </div>

                <div className="lg:w-full px-4">
                  <h1 className="font-bold text-2xl text-center py-4">
                    System Requirements
                  </h1>

                  <ol className="px-6 text-xs list-disc text-[#333] lg:text-md lg:">
                    <li className="py-[1px]">
                      <strong>OS:</strong> {games.os}
                    </li>
                    <li className="py-[1px]">
                      <strong>Processor:</strong> {games.processor}
                    </li>
                    <li className="py-[1px]">
                      <strong>Memory:</strong> {games.memory}
                    </li>
                    <li className="py-[1px]">
                      <strong>Graphics:</strong> {games.graphics}
                    </li>
                    <li className="py-[1px]">
                      <strong>Storage:</strong> {games.storage}
                    </li>
                  </ol>
                </div>

                <div className="py-6">
                  <h1 className="font-bold text-2xl text-center pb-6 ">
                    Screenshots
                  </h1>
                  <img
                    src={`/images/${games.ss1}.webp`}
                    onError={(e) => {
                      e.target.src = `/images/${games.ss1}.jpg`;
                    }}
                    alt="Game"
                    className="py-3"
                  />
                  <img
                    src={`/images/${games.ss2}.webp`}
                    onError={(e) => {
                      e.target.src = `/images/${games.ss2}.jpg`;
                    }}
                    alt="Game"
                    className="..."
                  />
                  {/* <Image className='py-1 px-3 h-40 lg:h-96 ' src={`/images/${games.ss1}.webp`} width={650} height={0} alt="" />
                  <Image className='py-1 px-3 h-40 lg:h-96 ' src={`/images/${games.ss2}.webp`} width={650} height={0} alt="" /> */}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="">
          <canvas
            className="lg:relative lg:left-4 lg:top-4 py-2 px-4 bg-black "
            ref={chartRef}
            style={{
              height: "300px",
              width: "100%",
              maxHeight: "400px",
              maxWidth: "1080px",
            }}
          />
        </div>
        <PopularGames />
      </div>
    </>
  );
};
export async function getServerSideProps({ params }) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://Steam:s_unlocked1234@cluster0.ovfam.mongodb.net/"
    );
  }
  const { slug } = params;
  const games = await game.findOne({ slug });
  console.log(games);

  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
}

export default Slug;
