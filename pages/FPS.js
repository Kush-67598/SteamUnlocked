import React from 'react'
import game from '../models/game'
import Link from 'next/link'
import PopularGames from '../components/PopularGames'
import Image from 'next/image'


const FPS = ({FPS}) => {
  return (
    <>
          <div>
            {FPS.length==0 && <div>No Games To Show</div>}
            {FPS && FPS.map((game,index)=>(
              <div key={index} className='bg-[#222] pb-6 lg:-mt-16'>
                <div className='topinfo h-10 text-white text-center lg:py-2'>
{game && (
  <div className='text-xs py-3 absolute left-0 top-44 px-4 lg:absolute lg:top-48 lg:left-20 font-bold font-sans '>
          <strong className='text-slate-400' >Home</strong>&rarr;{game.category}
       </div>
)}
      </div>

            <Link href={`/games/${game.slug}`}>
            <div className="cardcontainer grid grid-cols-1 lg:mr-[34.4vw] lg:ml-24">
              <div className={`${index===0 ? 'lg:pt-10':'-mt-20 lg:-mt-4'} `}>

          <div className="cards bg-white flex flex-col items-center justify-center mx-4 pb-12  my-3 ">
            <h1 className='text-black font-bold text-2xl text-center py-6 '>{game.title}</h1>
            <Image width={100} height={100} src={`/images/${game.img}.jpg`} alt={game.img} className="w-60 h-80 lg:h-80 lg:w-60 text-white"/>
          </div>
              </div>
              </div></Link>
              </div>
            ))}
          </div>
          <PopularGames/>
    </>
  )
}
export async function getServerSideProps(context) {
  let FPS = await game.find({ category: "FPS" })
  return {
    props: { FPS: JSON.parse(JSON.stringify(FPS)) }, // will be passed to the page component as props
  }
}


export default FPS
