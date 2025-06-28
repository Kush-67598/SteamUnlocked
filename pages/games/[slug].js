import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mongoose from "mongoose";
import game from "../../models/game";
import { FaHeart } from "react-icons/fa";
import PopularGames from "../../components/PopularGames";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "../../components/Loader";

const Slug = ({ games }) => {
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState(false);
  const [chart_1, setChart_1] = useState(false);
  const router = useRouter();
  const [category, setCategory] = useState("General");
  const { slug } = router.query;
  const [token, setToken] = useState(null);
  const [comment, setComment] = useState("");
  const [All_com, setAll_com] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("TOKEN");
      setToken(savedToken);
    }
    getComment_api();
  }, []);

  const getComment_api = async (req, res) => {
    const getComments = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/Get/getComments?slug=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    const response = await getComments.json();
    setAll_com(response);
  };

  const HandleCommentSubmit = async (req, res) => {
    if (!comment) {
      toast.info("Plz Fill The Required Fields", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const data = { slug, content: comment, category };
        setLoading(true);
        const commentsData = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/Add/addComments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );
        let response = await commentsData.json();
        setLoading(false);

        if (response) {
          toast.success("Comment Posted", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setComment("");
        }
        getComment_api();
      } catch (err) {
        toast.error("Comment not posted", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getMonthDifference = (item) => {
    const now = new Date(); //this is current date means Todays Date
    const past = new Date(item); ///This is the Date from Database for comparison
    let years = now.getFullYear() - past.getFullYear();
    let months = now.getMonth() - past.getMonth();
    let days = now.getDate() - past.getDate();

    if (months < 0) {
      years--;
      months = months + 12;
    }

    if (days < 0) {
      months--;

      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate(); // ← dynamic & always accurate
    }
    if (months == 0 && years == 0) {
      return ` ${days} Days Ago`;
    } else if (months == 0) {
      return `${years} Years ${days}Days Ago`;
    } else if (years == 0) {
      return `${months} Months ${days}Days Ago`;
    }

    return `${years}Years ${months}Months ${days}Days Ago`;
  };
  const addtowishlist = async (slug, title, img, size) => {
    try {
      const data = { slug, title, img, size };
      setLoading(true);
      const wishlist = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/Add/addwishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token} `,
          },
          body: JSON.stringify(data),
        }
      );
      setLoading(false);
      let wishlistRes = await wishlist.json();
      if (wishlistRes) {
        toast.success("Successfully Added To Wishlist", {
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
    } catch {
      toast.error("Failed to Add it to Wishlist");
    } finally {
      setLoading(false);
    }
  };
  const new_title = games.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const chartRef = useRef(null); // canvas element
  const chartInstanceRef = useRef(null); // Chart instance
  const secondchartRef = useRef(null); // canvas element
  const secondchartInstanceRef = useRef(null); // Chart instance

  // First Chart Data for processor ram etc
  const valueMap = [
    {
      Processor: {
        dualcore: 1,
        i3: 3,
        i5: 5,
        ryzen5: 4,
        i7: 7,
        ryzen7: 10,
        i9: 10,
      },
      Ram: {
        "2gb": 3,
        "4gb": 5,
        "6gb": 7,
        "8gb": 9,
        "16gb": 10,
      },

      Storage: {
        "10gb": 1,
        "12.45gb": 2,
        "20gb": 3,
        "30gb": 5,
        "40gb": 7,
        "50gb": 9,
        "60gb": 10,
      },
      OS: {
        "windows xp": 1,
        "windows vista": 2,
        "windows 7": 3,
        "windows 8": 4,
        "windows 8.1": 5,
        "windows 10": 6,
        "windows 11": 7,
      },
      Graphics: {
        "intel hd graphics": 2,
        "intel uhd graphics": 3,
        "intel iris xe": 5,
        "nvidia gt 710": 4,
        "nvidia gt 1030": 6,
        "nvidia gtx 1050": 7,
        "nvidia gtx 1650": 8,
        "nvidia rtx 3060": 10,
        "amd radeon vega 8": 5,
        "amd rx 580": 7,
        "amd rx 6600": 9,
      },
    },
  ];

  // FIRST CHART REF
  useEffect(() => {
    if (!chart) return; // Don't render chart unless chart is active

    const size_Data = () => valueMap[0].Storage[games.size] || 7;

    const RamData = () => {
      const str = games.memory.toLowerCase(); //windowsxp:1gbram/windowsvista:2gbram
      const ramkeys = Object.keys(valueMap[0]["Ram"]); //["2gb","4gb","8gb","16gb"]
      const found = ramkeys.find((key) => str.includes(key.toLowerCase()));
      const Ram = found ? valueMap[0].Ram[found] : 5;
      return Ram;
    };

    const Processor_Data = () => {
      const str = games.processor.toLowerCase();
      const processorkeys = Object.keys(valueMap[0]["Processor"]);
      const found = processorkeys.find((key) =>
        str.includes(key.toLowerCase())
      );
      const processor = found ? valueMap[0].Processor[found] : 4;
      return processor;
    };

    const OS_Data = () => {
      const str = games.os.toLowerCase();
      const OSkeys = Object.keys(valueMap[0]["OS"]);
      const found = OSkeys.find((key) => str.includes(key.toLowerCase()));
      const OS = found ? valueMap[0].OS[found] : 4;
      return OS;
    };
    const Graphics_Data = () => {
      const str = games.graphics.toLowerCase();
      const Graphicskeys = Object.keys(valueMap[0]["Graphics"]);
      const found = Graphicskeys.find((key) => str.includes(key.toLowerCase()));
      const Graphics = found ? valueMap[0].Graphics[found] : 4;
      return Graphics;
    };

    const canvas = chartRef.current;
    if (!canvas) return; // Prevent running if canvas not ready

    // Destroy old chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const data = {
      labels: ["PROCESSOR", "SIZE", "MEMORY", "OS", "GRAPHICS"],
      datasets: [
        {
          label: "SCORE BASED ON SYSTEM REQUIREMENTS",
          data: [
            Processor_Data(),
            size_Data(),
            RamData(),
            OS_Data(),
            Graphics_Data(),
          ],
          backgroundColor: "transparent",
          borderColor: "fuchsia",
        },
      ],
    };

    chartInstanceRef.current = new Chart(canvas, {
      type: "line",
      data,
      options: {
        responsive: true,
        interaction: {
          mode: "nearest",
          intersect: false,
        },
        elements: {
          line: {
            borderWidth: 3,
          },
          point: {
            radius: 5,
            hoverRadius: 7,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
          title: {
            display: true,
            color: "white",
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)",
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
  }, [chart, games]);

  // SECOND CHART REF
  useEffect(() => {
    if (!chart_1) return; // Don't render chart unless chart is active

    const canvas = secondchartRef.current;
    if (!canvas) return; // Prevent running if canvas not ready

    let monthlyDataMap = {};

    games.priceHistory.forEach((item) => {
      const date = new Date(item.date);
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
      monthlyDataMap[monthKey] = item; // Store latest value per month
    });

    // Sort by date (key: "YYYY-M")
    const sortedMonthlyData = Object.entries(monthlyDataMap)
      .sort(([a], [b]) => new Date(a + "-01") - new Date(b + "-01")) // Sort by YYYY-MM-01
      .map(([_, value]) => value);

    // Then build chart data
    const chart = sortedMonthlyData.map((item) => item.value);
    const labels = sortedMonthlyData.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
    });

    const colors = labels.map(() => {
      const r = Math.floor(Math.random() * 155 + 100);
      const g = Math.floor(Math.random() * 155 + 100);
      const b = Math.floor(Math.random() * 155 + 100);
      return `rgba(${r},${g},${b},0.8)`;
    });

    // Destroy old chart instance if it exists
    if (secondchartInstanceRef.current) {
      secondchartInstanceRef.current.destroy();
    }

    secondchartInstanceRef.current = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: `Game Price Variation For ${new_title}`,
            data: chart,
            backgroundColor: colors,
            fill: false,
            tension: 0.3,
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
      if (secondchartInstanceRef.current) {
        secondchartInstanceRef.current.destroy();
      }
    };
  }, [chart_1, games]);

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

      <div className="topinfo bg-black h-16 text-white text-center py-16 lg:py-4 ">
        {games.length == 0 && <div>no games</div>}
        {games && (
          <div className="text-xs py-5 lg:py-2 ">
            <Link href={"/"}>
              <strong className="text-slate-400">Home</strong>&rarr;
            </Link>
            {new_title}
          </div>
        )}
      </div>
      {loading && <Loader />}

      <div className="bg-[#222] lg:py-6 lg:pl-20  flex flex-col ">
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
                <p className="text-sm text-[#333] py-6 px-4">{games.desc}</p>
                <div className="flex flex-col justify-center items-center">
                  <img
                    width={220}
                    height={200}
                    className="rounded-md"
                    src={`/images/${games.img}.webp`}
                    onError={(e) => {
                      e.target.src = `/images/${games.img}.jpg`;
                    }}
                    alt=""
                  />
                  <button
                    onClick={() => {
                      if (!token) {
                        toast.error("Token missing — please log in again");
                        return;
                      }
                      addtowishlist(
                        games.slug,
                        new_title,
                        games.img,
                        games.size
                      );
                    }}
                    className="flex items-center justify-center rounded-md min-w-56 bg-red-600 mt-4 p-4 hover:bg-black text-white lg:rounded lg:w-56 lg:ml-0"
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
                  <div className="flex flex-col items-center justify-center ">
                    <a href={`/api/Downloads/${games.slug}`}>
                      <button className="lg:w-48  hover:bg-green-600 hover:text-white hover:border-black  border-green-600 border rounded-md mx-16 py-10 px-4 my-4 font-semibold text-[#333] lg:mx-4 lg:my-7">
                        {new_title}
                        <br />
                        <span>Size:{games.size}</span>
                      </button>
                    </a>
                  </div>

                  <div className="flex flex-col items-center justify-center ">
                    <a
                      href="https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/"
                      target="_blank"
                    >
                      <button className="lg:w-48  hover:bg-green-600 hover:text-white hover:border-black  border-green-600 border rounded-md mx-16 py-10 px-4 my-4 font-semibold text-[#333] lg:mx-4 lg:my-7">
                        {new_title}
                        <br></br>Steam
                        <span>Price:${games.price}</span>
                      </button>
                    </a>
                  </div>

                  <div className="lg:w-48 hover:bg-green-600 hover:text-white hover:border-black  border-green-600 border rounded-md mx-[6.4rem] py-[4.5dvh] lg:py-[6.1dvh] text-center my-4 font-semibold text-[#333] lg:mx-4">
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
                </div>

                <select
                  className="bg-gray-800 text-white py-3 -my-1 w-full px-12 "
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "chart1") {
                      setChart(true);
                      setChart_1(false);
                    } else {
                      setChart(false);
                      setChart_1(true);
                    }
                  }}
                >
                  <option value="">Show Charts</option>
                  <option value="chart1">1.{' '}System Requirements</option>
                  <option value="chart2">2.{' '}Price Variation</option>
                </select>
                {chart && (
                  <canvas
                    ref={chartRef}
                    className="bg-black min-h-[15rem] lg:max-h-96 "
                  ></canvas>
                )}
                {chart_1 && (
                  <canvas
                    ref={secondchartRef}
                    className="bg-black max-h-[15rem] lg:max-h-96"
                  ></canvas>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mx-4">
          <div className="my-8 text-white  text-center text-lg lg:w-[87vw] lg:mr-20">
            Comments Section
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full  mb-4 px-3 py-2 rounded-md bg-gray-800 text-white"
            >
              <option value="General">💬 General</option>
              <option value="Bug">🐞 Bug</option>
              <option value="Suggestion">💡 Suggestion</option>
              <option value="Fix Needed">🔧 Fix Needed</option>
            </select>
            <textarea
              name=""
              id=""
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              rows={6}
              className="min-h-16 rounded-md w-full text-black"
              placeholder="Write Your Comments"
            ></textarea>
            <button
              type="submit"
              onClick={HandleCommentSubmit}
              className="bg-green-500 px-7 py-2 my-4 rounded-md "
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="text-center bg-zinc-500  text-white font-bold  text-2xl py-3">
        Comments
      </div>
      <div className=" bg-zinc-500 py-2">
        {All_com.length == 0 ? (
          <div className="text-center text-xl font-bold">
            No Comments to Show
          </div>
        ) : (
          All_com.map((item) => {
            const categoryColors = {
              Bug: "text-red-500",
              General: "text-blue-500",
              Suggestion: "text-green-500",
              "Fix Needed": "text-yellow-400",
            };
            const color = categoryColors[item.category];
            return (
              <div
                key={item._id}
                className=" flex flex-col bg-black text-white rounded-lg py-4 mb-4 px-4 mx-4"
              >
                <div className="flex">
                  <div className="h-16 w-16">
                    <div
                      className={`h-16 w-16 rounded-xl bg-lime-300 flex items-center justify-center text-3xl font-bold `}
                    >
                      {item.userId.name[0].toUpperCase()}
                    </div>
                  </div>

                  <div className="flex-col flex px-6">
                    <span className="text-fuchsia-500 font-semibold">
                      @{item.userId.name}
                    </span>
                    <span className={`${color} font-semibold`}>
                      {item.category}
                    </span>

                    <span>{item.content}</span>
                    <p className="text-gray-600">
                      {getMonthDifference(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div className="lg:w-1/4">
          <PopularGames />
        </div>
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

  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
}

export default Slug;
