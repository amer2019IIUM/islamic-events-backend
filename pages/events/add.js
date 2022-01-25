import { parseCookies } from '../../helpers/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { API_URL } from '../../config/index'
export default function AddEventPage({ token }) {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    })
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const basicValidation = Object.values(values).some((element) => element === "")

        if (basicValidation) {
            toast.error('Please fill all fields. Thank you!')
            return
        }

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something Went Wrong')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    return (
        <Layout title="Add New Event">
            <div>
                <Link href="/"><a className="text-blue-700 font-bold text-2xl block my-10">Go Back</a></Link>
                <h1 className="font-extrabold text-3xl block my-10">Add Event</h1>
                <ToastContainer />

                <form onSubmit={handleSubmit}>
                    {/* Name event and PErfomers */}
                    <div className="flex justify-between gap-1 mb-8">
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="name" className="font-bold">Event Name</label>
                            <input id="name" name="name" value={values.name} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="performers" className="font-bold">Performers</label>
                            <input name="performers" id="performers" value={values.performers} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* Venue & address*/}
                    <div v className="flex justify-between gap-1 mb-8">
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="venue" className="font-bold">Venue</label>
                            <input id="venue" name="venue" value={values.venue} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="address" className="font-bold">Address</label>
                            <input id="address" name="address" value={values.address} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                    </div>


                    {/* Date & Time*/}
                    <div v className="flex justify-between gap-1 mb-8">
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="date" className="font-bold">Date</label>
                            <input id="date" name="date" value={values.date} type="date" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="time" className="font-bold">Time</label>
                            <input id="time" name="time" value={values.time} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* description*/}
                    <div v className="flex justify-between gap-1 mb-8">
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="date" className="font-bold">Description</label>
                            <textarea id="description" name="description" value={values.description} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* description*/}
                    <div v className="flex justify-between gap-1 mb-8">
                        <div className="flex flex-col  flex-1 ">
                            <input type="submit" value="Add Event" className="flex-1  p-1 border-2 hover:bg-cyan-900 bg-cyan-600 rounded-md text-white cursor-pointer " onChange={handleInputChange} />
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}


export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    return {
        props: {
            token,
        },
    }
}