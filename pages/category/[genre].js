import React from 'react'
import game from '../../models/game';
import useConnectDb from '../../hooks/useConnectDb';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PopularGames from '../../components/PopularGames';


const Genre = ({games}) => {
   
    
    
  return (
    <>
     <div className='lg:mb-0 -mb-12'>
            {games.length==0 && <div>No Games To Show</div>}
            {games.length > 0 && (
              <div className='flex flex-col justify-center items-start'>
                
          <div className="text-xs bg-black w-full text-white  px-6 py-4 font-bold font-sans  lg:-mt-44 lg:bg-transparent lg:pl-28">
            <strong className="text-slate-400 ">Home</strong> &rarr; <span>{games[0].category}</span>  
          </div>
              </div>
        )}
            {games && games.map((game,index)=>(
              <div key={index} className='bg-[#222] pb-6 lg:-mt-16'>
                <div className='topinfo h-10 text-white text-center lg:py-2'>

      </div>

            <Link href={`/games/${game.slug}`}>
            <div className="cardcontainer grid grid-cols-1 lg:mr-[34.4vw] lg:ml-24">
              <div className={`${index===0 ? 'lg:pt-10':'-mt-20 lg:-mt-4'} `}>

          <div className="cards rounded bg-white flex flex-col items-center justify-center mx-4 pb-12  my-3 ">
            <h1 className='text-black font-bold text-2xl text-center py-6 '>{game.title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h1>
            <img onError={(e)=>e.target.src=`/images/${game.img}.jpg`} src={`/images/${game.img}.webp`} alt={game.img} height={100} width={100}className="w-60 h-80 lg:h-80 lg:w-60 text-white"/>
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
export async function getStaticPaths(){
  await useConnectDb()
  const categories=await game.distinct('category')
  const paths=categories.map((cat)=>(
   {params:{genre:cat}}
  ))
  return{
    paths,fallback:'blocking'  //lets Next.js generate new genre pages on first request if they weren’t built
  }

  
}
export async function getStaticProps({params}){
  const {genre}=params
  await useConnectDb()
  const games=await game.find({category:genre})
  return{
    props:{
      games:JSON.parse(JSON.stringify(games)),
      genre

    }
  }
}

export default Genre
