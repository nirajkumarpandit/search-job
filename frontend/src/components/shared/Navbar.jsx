import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover'

import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '../ui/avatar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, User2Icon, Menu, X, Briefcase, Loader2 } from 'lucide-react'
import axios from 'axios'
import { RESUME_ANALYZER_API_END_POINT, USER_API_END_POINT } from '@/utils/constant'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { clearJobState } from '@/redux/jobSlice'
import { clearApplicantState } from '@/redux/applicantSlice'
import { clearCompanyState } from '@/redux/companySlice'
import { setAnalysis } from '@/redux/resumeAnalyzerSlice'

const Navbar = () => {
    const { user, loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`, {},
                { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                dispatch(clearJobState())
                dispatch(clearApplicantState())
                dispatch(clearCompanyState())
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "logout failed ")
        }
    }

    const navLinks = user && user?.role === 'recruiter'
        ? [
            { to: '/companies', label: 'Companies' },
            { to: '/recruiterJob', label: 'Jobs' },
        ]
        : [
            { to: '/', label: 'Home' },
            { to: '/jobs', label: 'Jobs' },
            { to: '/browse', label: 'Browse' },
        ]

    const isActive = (path) => location.pathname === path
    const resumeAnalyzerHandler = async () => {
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${RESUME_ANALYZER_API_END_POINT}/analyze`, {}, { withCredentials: true })
            if (res?.data?.success) {
                dispatch(setAnalysis(res.data.analysis))
                toast.success(res.data.message)
                navigate("/resume-analyzer")
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
            <div className="flex items-center justify-between h-16 max-w-6xl mx-auto px-4 sm:px-6">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-violet-600 text-white shadow-sm shadow-violet-200">
                        <Briefcase className="h-4 w-4" />
                    </span>
                    <h2 className='font-extrabold text-xl sm:text-2xl tracking-tight text-gray-900'>Jobs<span className='text-violet-600'>Portal</span></h2>
                </Link>

                {/* Desktop nav */}
                <div className='hidden md:flex gap-8 items-center '>
                    <div className="">
                        <ul className='flex items-center gap-6 font-medium text-sm text-gray-600'>
                            {navLinks.map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className={`relative py-1 transition-colors hover:text-violet-600 ${isActive(link.to) ? 'text-violet-600' : ''}`}
                                    >
                                        {link.label}
                                        {isActive(link.to) && (
                                            <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-violet-600" />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="">
                            {
                                user ? (
                                    <div className="">
                                        <Button
                                            disabled={!user?.profile?.resume || loading}
                                            className=" bg-violet-600 hover:bg-violet-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={resumeAnalyzerHandler}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Analyzing Resume...
                                                </>
                                            ) : (
                                                <>✨ Analyze Resume</>
                                            )}
                                        </Button>
                                    </div>
                                ) : (<></>)
                            }
                        </div>
                        <div className="">
                            {
                                !user ? (
                                    <div className='flex gap-3'>
                                        <Link to="/login"><Button className={"cursor-pointer"} variant='outline'>Login</Button></Link>
                                        <Link to="/signup"><Button className="cursor-pointer bg-violet-600 hover:bg-violet-700 shadow-sm shadow-violet-200">Sign up</Button></Link>
                                    </div>
                                ) : (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-violet-200 transition-all">
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                                <AvatarFallback className="bg-violet-100 text-violet-700 font-semibold">
                                                    {user?.username?.[0]?.toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-72 p-0 overflow-hidden">
                                            <div className="flex gap-3 p-4 bg-gray-50/70 border-b border-gray-100">
                                                <Avatar>
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                    <AvatarFallback className="bg-violet-100 text-violet-700 font-semibold">
                                                        {user?.username?.[0]?.toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <h1 className='font-semibold text-sm truncate'>{user?.username}</h1>
                                                    <p className='text-xs text-gray-500 truncate'>{user?.profile?.bio || user?.email}</p>
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                {
                                                    user && user.role === 'student' && (
                                                        <Link
                                                            to="/profile"
                                                            className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors'
                                                        >
                                                            <User2Icon className="h-4 w-4" /> View Profile
                                                        </Link>
                                                    )
                                                }
                                                <button
                                                    onClick={logoutHandler}
                                                    className='w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer'
                                                >
                                                    <LogOut className="h-4 w-4" /> Logout
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile nav drawer */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-5 pt-2 animate-fade-in-up">
                    <ul className="flex flex-col gap-1 font-medium text-gray-700">
                        {navLinks.map(link => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block rounded-lg px-3 py-2.5 transition-colors ${isActive(link.to) ? 'bg-violet-50 text-violet-700' : 'hover:bg-gray-50'}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        {
                            user && user.role === 'student' && (
                                <li>
                                    <Link
                                        to="/profile"
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
                                    >
                                        View Profile
                                    </Link>
                                </li>
                            )
                        }
                    </ul>

                    {!user ? (
                        <div className="flex gap-3 mt-4">
                            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                                <Button variant='outline' className="w-full cursor-pointer">Login</Button>
                            </Link>
                            <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700">Sign up</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                            <Avatar>
                                <AvatarImage src={user?.profile?.profilePhoto} />
                                <AvatarFallback className="bg-violet-100 text-violet-700 font-semibold">
                                    {user?.username?.[0]?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{user?.username}</p>
                            </div>
                            <button
                                onClick={() => { setMobileOpen(false); logoutHandler() }}
                                className="flex items-center gap-1.5 text-sm font-medium text-red-600 cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar
