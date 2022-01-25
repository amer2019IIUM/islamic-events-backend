import moment from 'moment'
import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { parseCookies } from '../../../helpers/index'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import Modal from '../../../components/Modal'
import ImageUpload from '../../../components/ImageUpload'
import { API_URL } from '../../../config/index'
export default function EditEventPage({ evt, token }) {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        slug: evt.slug,
        date: evt.date,
        time: evt.time,
        description: evt.description,
    })

    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)
    const router = useRouter();
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const basicValidation = Object.values(values).some((element) => element === "")

        if (basicValidation) {
            toast.error('Please fill all fields. Thank you!')
            return
        }


        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('Unauthorized')
                return
            }
            toast.error('Something Went Wrong')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const imageUploaded = async () => {
        const res = await fetch(`${API_URL}/events/${evt.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }
    return (
        <Layout title="Edit New Event">
            <div>
                <Link href="/"><a className="text-blue-700 font-bold text-2xl block my-10">Go Back</a></Link>
                <h1 className="font-extrabold text-3xl block my-10">Edit Event</h1>
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
                            <input id="date" name="date" value={moment(values.date).format('yyyy-MM-DD')} type="date" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="time" className="font-bold">Time</label>
                            <input id="time" name="time" value={values.time} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* description*/}
                    <div v className="flex justify-between gap-1 mb-8">
                        <div className="flex flex-col  flex-1 ">
                            <label htmlFor="description" className="font-bold">Description</label>
                            <textarea id="description" name="description" value={values.description} type="text" className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* description*/}
                    <div v className="flex justify-between gap-1 mb-8">
                        <div className="flex flex-col  flex-1 ">
                            <input type="submit" value="Update Event" className="flex-1  p-1 border-2 hover:bg-cyan-900 bg-cyan-600 rounded-md text-white cursor-pointer " />
                        </div>
                    </div>
                </form>
                <h2>Event Image</h2>
                {imagePreview ? (
                    <Image src={imagePreview} height={100} width={170} alt="Event Image" />
                ) : <div>No image uploaded</div>}
                <button onClick={() => setShowModal(true)} className="flex justify-center items-center bg-black text-white p-2 rounded hover:bg-cyan-900"><FaImage /><span className="pl-2"> Set image</span></button>
                <Modal show={showModal} onClose={() => setShowModal(false)}><ImageUpload evtId={evt.id} token={token} imageUploaded={imageUploaded} /></Modal>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params: { id }, req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json()

    return {
        props: {
            evt,
            token,
        },
    }
}