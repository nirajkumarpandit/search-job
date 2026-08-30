import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Code2, Palette, Database, LayoutTemplate, Server } from 'lucide-react'

const CategoryCarousel = () => {
    const category = [
        { label: "Backend Developer", icon: Server },
        { label: "Frontend Developer", icon: LayoutTemplate },
        { label: "Data Science", icon: Database },
        { label: "Graphic Designer", icon: Palette },
        { label: "Fullstack Developer", icon: Code2 },
    ]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchHandler = (query) => {
        dispatch(setSearchQuery(query))
        navigate('/browse')
    }
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="text-center mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Explore by category</h2>
                <p className="text-sm text-gray-500 mt-1">Popular roles hiring right now</p>
            </div>
            <Carousel className="w-full max-w-3xl mx-auto" opts={{ align: 'start' }}>
                <CarouselContent>
                    {
                        category.map((cat, index) => {
                            const Icon = cat.icon
                            return (
                                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/3">
                                    <button
                                        onClick={() => searchHandler(cat.label)}
                                        className="w-full flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-6 text-sm font-medium text-gray-700 shadow-sm hover:shadow-lg hover:border-violet-200 hover:text-violet-700 transition-all cursor-pointer"
                                    >
                                        <span className="flex items-center justify-center h-11 w-11 rounded-xl bg-violet-50 text-violet-600">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <span className="text-center leading-tight">{cat.label}</span>
                                    </button>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-4" />
                <CarouselNext className="hidden sm:flex -right-4" />
            </Carousel>
        </section>
    )
}

export default CategoryCarousel
