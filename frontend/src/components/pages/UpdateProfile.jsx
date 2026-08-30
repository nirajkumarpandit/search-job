import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


const UpdateProfile = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        username: user?.username,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        skills: user?.profile?.skills?.map(skill => skill),
        bio: user?.profile?.bio,
        file: user?.profile?.resume
    })
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("username", input.username)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/update`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setUser(res?.data?.user))
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        finally {
            setLoading(false)
        }
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const fields = [
        { id: 'username', name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
        { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
        { id: 'phoneNumber', name: 'phoneNumber', label: 'Phone number', type: 'text', placeholder: 'Enter your phone number' },
        { id: 'skills', name: 'skills', label: 'Skills', type: 'text', placeholder: 'e.g. React, Node.js, Figma' },
        { id: 'bio', name: 'bio', label: 'Bio', type: 'text', placeholder: 'Tell us a bit about yourself' },
    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update profile details</DialogTitle>
                    <DialogDescription>Keep your information up to date to stand out to recruiters.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4 mt-2">
                    {fields.map(field => (
                        <div key={field.id} className="space-y-1.5">
                            <Label htmlFor={field.id}>{field.label}</Label>
                            <Input
                                placeholder={field.placeholder}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                value={input[field.name] ?? ''}
                                onChange={changeEventHandler}
                            />
                        </div>
                    ))}
                    <div className="space-y-1.5">
                        <Label htmlFor='file'>Resume (PDF)</Label>
                        <Input
                            id="file"
                            name="file"
                            type='file'
                            accept="application/pdf"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>
                    <DialogFooter className="pt-2">
                        {
                            loading
                                ? <Button disabled className="w-full bg-violet-600 hover:bg-violet-700"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                                : <Button className='w-full bg-violet-600 hover:bg-violet-700 cursor-pointer' type="submit">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfile
