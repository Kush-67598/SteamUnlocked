import React from 'react'
import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image'
import mongoose from 'mongoose'
import game from '../../models/game'
import { FaHeart } from "react-icons/fa";
import PopularGames from '../../components/PopularGames'


const Slug = ({ games, wishlistonclick }) => {
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

      <div className='topinfo bg-black h-16 text-white text-center py-4 lg:py-4 font-custom'>
        {games.length == 0 && <div>no games</div>}
        {games && (
          <div className='text-xs py-3 lg:py-2 '>
            <strong className='text-slate-400' >Home</strong>&rarr;{games.title}
          </div>
        )}
      </div>


      <div className='bg-[#222] lg:py-6 lg:pl-20 font-custom lg:flex'>
        <div className=' bg-white mx-4 lg:w-2/3'>

          <div className=' flex flex-col justify-center lg:items-center lg:flex'>
            {games.length == 0 && <div>No Games to Show</div>}
            {games && (
              <>

                <h1 className='font-bold text-2xl text-center py-4 px-4'>{games.title}</h1>
                <h2 className='font-bold text-2xl pt-3 text-center font-sans'>Game Overview</h2>
                <p className='text-sm text-[#333] py-8 px-4'>{games.desc}

                </p>
                <div className='flex flex-col justify-center items-center'>


                <Image width={100} height={100}  className='px-2 max-w-96 min-w-[302px]  ' src={`/images/${games.img}.jpg`} alt="" />
                <button className='flex items-center justify-center rounded-lg min-w-72 bg-red-600 mt-4 p-4 hover:bg-black text-white lg:rounded lg:w-72 lg:ml-0' onClick={() => { wishlistonclick(games.slug, games.title, games.img, games.size) }}>Add to Wishlist<FaHeart className='ml-2 text-lg' /> </button>
                </div>
                <h1 className='font-bold text-2xl text-center py-6 '>Installation Instructions</h1>

                <ol className='list-decimal text-sm px-11 text-[#333] '>
                  <li>Click the green button below to be redirected to UploadHaven.com.</li>
                  <li>Wait 15 seconds, then click on the “free download” button. Allow the file transfer to complete (note that speeds may be slower with the free plan; upgrading to UploadHaven Pro will increase speeds).</li>
                  <li>Once the transfer is complete, right-click the .zip file and select “Extract to {games.title}” (To do this you must have 7-Zip, which you can get here).</li>
                  <li>Open the folder that you just extracted and run the game as administrator.</li>
                  <li>Enjoy the game! Ensure you run it as an administrator to avoid any issues. If you encounter any missing DLL errors, check the Redist or _CommonRedist folder and install all necessary programs.</li>
                </ol>
                <h2 className='font-bold text-2xl text-center py-4'>Download Links</h2>
                <p className='px-4 text-sm text-[#333]'>You can get the full version of this game from the links provided below. Running the game as an administrator is recommended for optimal performance and to avoid save issues.</p>
                <a href={`/api/Downloads/${games.slug}`} download>
                <div className='flex items-center justify-center'>

                <button className='hover:bg-green-600 hover:text-white hover:border-black  border-green-600 border rounded-md mx-16 py-12 px-4 my-4 font-semibold text-[#333] lg:mx-72 lg:my-7'>{games.title}<div className='text-gray-600 '>Size:{games.size}</div></button>
                </div>


                </a>

                <div className='px-4 text-sm text-[#333] '>
                  <p><strong>Easy Setup:</strong> Unless GOG specified, no installation is needed. If you encounter missing DLL errors, check for a _Redist or _CommonRedist folder. Install DirectX, Vcredist, and all other necessary programs from that folder to ensure the game runs smoothly.</p>


                  <ol className='text-sm py-4 text-[#333]'>
                    <li><strong>Helpful Tips:</strong>For more detailed instructions, refer to the HOW TO RUN GAME!!.txt file included.
                    </li>
                    <li>Right-click the game’s executable file and choose “Run as administrator” if you experience issues saving your game.
                    </li>
                    <li>Disable your antivirus before extracting the game to prevent it from deleting essential crack files.
                    </li>
                    <li>    Ensure your graphics card runs smoothly by updating your GPU drivers to the latest version. This can significantly enhance game performance and compatibility.</li>
                  </ol>


                  <p>Need More Help? Visit our FAQ page for solutions to frequently asked questions and common issues.</p>
                </div>
                <div className='lg:w-full px-4'>

                  <h1 className='font-bold text-2xl text-center py-4'>System Requirements</h1>

                  <ol className='px-6 text-xs list-disc text-[#333] lg:text-md lg:'>
                    <li className='py-[1px]'><strong>OS:</strong> {games.OS}
                    </li>
                    <li className='py-[1px]'><strong>Processor:</strong> {games.Processor}
                    </li>
                    <li className='py-[1px]'><strong>Memory:</strong> {games.Memory}</li>
                    <li className='py-[1px]'><strong>Graphics:</strong> {games.Graphics}
                    </li>
                    <li className='py-[1px]'><strong>Storage:</strong> {games.Storage}</li>
                  </ol>
                </div>

                <div className='py-6'>

                  <h1 className='font-bold text-2xl text-center pb-6 '>Screenshots</h1>

                  <Image className='py-1 px-3 h-40 lg:h-96 ' src={`/images/${games.ss1}.jpg`} width={650} height={0} alt="" />
                  <Image className='py-1 px-3 h-40 lg:h-96 ' src={`/images/${games.ss2}.jpg`} width={650} height={0} alt="" />
                </div>


              </>
            )}

          </div>
          

        </div>
        
        <PopularGames />
        
      </div>
    </>

    
  )

}
export async function getServerSideProps({ params }) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb+srv://Steam:s_unlocked1234@cluster0.ovfam.mongodb.net/");
  }
  const { slug } = params;
  const games = await game.findOne({ slug });
  console.log(games)
  return {
    props: {
      games: JSON.parse(JSON.stringify(games))
    },
  };
}

export default Slug
