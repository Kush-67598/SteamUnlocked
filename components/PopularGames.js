import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'


const PopularGames = () => {
  const router=useRouter()
  const GenrePage=router.pathname=='/category/[genre]'

    const SlugPage=router.pathname=='/games/[slug]'
  return (
    <div>
        {SlugPage && <div className='lg:absolute lg:overflow-hidden top-[40.5dvh] left-[70dvw]'>
      <div className='bg-[#222] px-2 py-20 lg:pt-0 '>
<div className=' m-2 -mt-12 lg:w-[21rem] lg:overflow-x-hidden lg:mr-2 lg:m-0'>
  <h1 className='bg-[#eb2d1c] h-16 px-2 py-5 text-white font-bold lg:text-xl '>Popular Games </h1>
  <div className='bg-white hover:text-white'>
    <Link href={`/games/resident-evil-village-free-download`}><div className='flex items-center cursor-pointer hover:bg-black hover:text-white '>
      <Image src={`/images/resident-evil-village-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white  text-gray-800'>Resident Evil Village</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
    <Link href={`/games/red-dead-redemption-2-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/red-dead-redemption-2-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Red Dead Redmption 2</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
    <Link href={`/games/silent-hill-2-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/silent-hill-2-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Silent Hill 2</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
   
    <Link href={`/games/the-evil-within-2-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/the-evil-within-2-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>The Evil Within 2</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
   
    <Link href={`/games/forza-horizon-5-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/forza-horizon-5-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Forza Horizon 5</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
   
    <Link href={`/games/doom-eternal-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/doom-eternal-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Doom Eternal</h3>
    </div></Link>
   
  
  </div>

</div>
</div>
    </div> }

    {GenrePage && <div className='pt-10 lg:absolute lg:top-[48.2dvh] lg:left-[65dvw] lg:pt-0'>
      <div className='bg-[#222] px-2 py-10 lg:pt-0 '>
<div className=' m-2 -mt-12 lg:w-96 lg:m-0'>
  <h1 className='bg-[#eb2d1c] h-16 px-2 py-5 text-white font-bold lg:text-xl '>Popular Games </h1>
          <div className='bg-black h-1'></div>

  <div className='bg-white hover:text-white'>
    <Link href={`/games/resident-evil-village-free-download`}><div className='flex items-center cursor-pointer hover:bg-black hover:text-white '>
      <Image src={`/images/resident-evil-village-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white  text-gray-800'>Resident Evil Village</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
    <Link href={`/games/red-dead-redemption-2-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/red-dead-redemption-2-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Red Dead Redmption 2</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
    <Link href={`/games/silent-hill-2-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/silent-hill-2-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Silent Hill 2</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
   
    <Link href={`/games/the-evil-within-2-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/the-evil-within-2-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>The Evil Within 2</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
   
   
    <Link href={`/games/forza-horizon-5-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/forza-horizon-5-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Forza Horizon 5</h3>
    </div></Link>
    <div className='bg-black h-[2px]'></div>
   
    <Link href={`/games/doom-eternal-free-download`}><div className='flex items-center cursor-pointer hover:bg-black '>
      <Image src={`/images/doom-eternal-free-download.webp`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 hover:text-white text-gray-800'>Doom Eternal</h3>
    </div></Link>
   
  
  </div>
</div>
</div>
    </div>}
    
    </div>
  )
}

export default PopularGames
