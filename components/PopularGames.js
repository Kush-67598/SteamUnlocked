import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'


const PopularGames = () => {

    const router=useRouter()
    const SlugPage=router.pathname=='/games/[slug]'
  return (
    <div>
        {!SlugPage && <div className='lg:absolute top-[41.3vh] left-[65vw]'>
      <div className='bg-[#222] px-2 py-10 lg:pt-0 '>
<div className=' m-2 -mt-12 lg:w-96 lg:mr-20 lg:m-0'>
  <h1 className='bg-[#eb2d1c] h-16 px-2 py-5 text-white font-bold lg:text-xl '>Popular Games </h1>
  <div className='bg-white'>
    <Link href={`/games/Resident Evil 8 Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/resident-evil-8.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5  text-gray-800'>Red Dead Redemption</h3>
    </div></Link>
    <Link href={`/games/Horizon Forbidden West Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/horizon-forbidden-west.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Horizon Forbidden West</h3>
    </div></Link>
    <Link href={`/games/Resident Evil 8 Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/resident-evil-8.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Resident evil 8</h3>
    </div></Link>
    
    <Link href={`/games/Alien Shooter Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/alien-shooter.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Alien Shooter</h3>
    </div></Link>
    
    <Link href={`/games/Forza Horizon 5 Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/forza-horizon-5`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Forza Horizon 5</h3>
    </div></Link>
  
  </div>

</div>
</div>
    </div> }

    {SlugPage && <div className=' pt-10 lg:absolute top-[50.7vh] left-[70vw] lg:pt-0'>
      <div className='bg-[#222] px-2 py-10 lg:pt-0 '>
<div className=' m-2 -mt-12 lg:w-96 lg:m-0'>
  <h1 className='bg-[#eb2d1c] h-16 px-2 py-5 text-white font-bold lg:text-xl '>Popular Games </h1>
          <div className='bg-black h-1'></div>

  <div className='bg-white'>
    <Link href={`/games/Red Dead Redemption`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/red-dead-redemption.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5  text-gray-800'>Read Dead Redemption</h3>
    </div></Link>
        <div className='bg-black h-1'></div>

    
    <Link href={`/games/Horizon Forbidden West Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/horizon-forbidden-west.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Horizon Forbidden West</h3>
    </div></Link>
    <div className='bg-black h-1'></div>
    <Link href={`/games/Resident Evil 8 Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/resident-evil-8.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Resident evil 8</h3>
    </div></Link>
        <div className='bg-black h-1'></div>

    <Link href={`/games/Alien Shooter Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/alien-shooter.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Alien Shooter</h3>
    </div></Link>
        <div className='bg-black h-1'></div>

    <Link href={`/games/Forza Horizon 5 Free Download`}><div className='flex items-center cursor-pointer hover:bg-black text-white'>
      <Image src={`/images/forza-horizon-5.jpg`} alt="" width={100} height={100} />
      <h3 className='py-6 font-bold px-5 text-gray-800'>Forza Horizon 5</h3>
    </div></Link>
        <div className='bg-black h-1'></div>


    
  
  </div>

</div>
</div>
    </div>}
    
    </div>
  )
}

export default PopularGames
