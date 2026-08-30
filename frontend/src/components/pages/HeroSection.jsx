import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Search, Sparkles, TrendingUp, Users, Building2 } from 'lucide-react'
import { setSearchQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchHandler = () => {
        dispatch(setSearchQuery(query))
        navigate('/browse')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchHandler()
    }

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""))
        }
    }, [dispatch])

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl animate-blob" />
                <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-14 sm:pb-20 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-medium text-violet-700 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    Over 10,000+ jobs waiting for you
                </span>

                <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Search, Apply &amp; Get Your{' '}
                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                        Dream Job
                    </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
                    Discover thousands of opportunities from top companies. Your next career move starts right here — free, fast, and built for you.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row w-full sm:w-[90%] md:w-[70%] items-stretch sm:items-center gap-2 sm:gap-0 mx-auto shadow-lg shadow-violet-100 rounded-2xl sm:rounded-full bg-white border border-gray-100 p-2 sm:pl-6">
                    <Search className="hidden sm:block h-5 w-5 text-gray-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Job title, keyword, or company"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="outline-none border-none w-full bg-transparent px-4 py-2.5 sm:py-3 text-sm sm:text-base placeholder:text-gray-400"
                    />
                    <Button
                        onClick={searchHandler}
                        className="rounded-xl sm:rounded-full w-full sm:w-auto px-6 h-11 cursor-pointer bg-violet-600 hover:bg-violet-700 shadow-sm shadow-violet-200 shrink-0"
                    >
                        <Search className="h-4 w-4 sm:hidden" />
                        <span>Search</span>
                    </Button>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto text-center">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-violet-600">
                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-xl sm:text-2xl font-extrabold text-gray-900">10K+</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">Live jobs</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-violet-600">
                            <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-xl sm:text-2xl font-extrabold text-gray-900">2K+</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">Companies</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-violet-600">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-xl sm:text-2xl font-extrabold text-gray-900">50K+</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">Candidates hired</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
