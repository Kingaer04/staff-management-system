import { ChevronLeft, ChevronRight } from 'react-feather'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const messages = ["Welcome Back", "Things don't do themselves, people do...", "Just do it...", "Time is money, yet money can't buy time. Be smart..."];

export default function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) {
    const {currentUser} = useSelector((state) => state.user)
    const [ current, setCurrent ] = useState(0)
    const prev = () => setCurrent((current) => current === 0 ? slides.length-1 : current -1)
    const next = () => setCurrent((current) => current === slides.length-1 ? 0: current +1)

    useEffect(() => {
        if(!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, []) 
  return (
    <div className='overflow-hidden relative'>
        <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                    {slide}
                </div>
            ))}
        </div>
        <div className='absolute inset-0 flex  items-center justify-between p-4'>
            <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                <ChevronLeft size={40}/>
            </button>
            <div className='flex flex-col items-center justify-center text-3xl font-bold text-white lg:text-4xl'>
                <h1 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{messages[current]}</h1>
                <h5 className="text-white font-['Parisienne', 'cursive'] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {currentUser.userName.charAt(0).toUpperCase() + currentUser.userName.slice(1)}
                </h5>
            </div>
            <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                <ChevronRight size={40}/>
            </button>
        </div>
        <div className='absolute bottom-4 right-0 left-0'>
            <div className='flex items-center justify-center gap-2'>
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`
                            transition-all w-3 h-3 bg-white rounded-full ${current === i ? "p-2": "bg-opacity-50" }
                            `}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}