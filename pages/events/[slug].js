
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { API_URL } from '../../config/index'
import { useRouter } from 'next/router'

export default function Event({ evt }) {
    const router = useRouter()
    const deleteEvent = async (e) => {
        if (confirm('Are you Sure?')) {
            const res = await fetch(`${API_URL}/events/${evt.id}`, {
                method: 'DELETE'
            })
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message)
            }
            else {
                router.push('/events')
            }
        }
    }

    return (
        <Layout>
            <div className="mt-5 sm:mt-10" flex flex-col>
                <div className="flex justify-end">
                    <div className="flex">
                        <Link href={`edit/${evt.id}`}><a className="pr-4 text-blue-500 flex items-center"><FaPencilAlt></FaPencilAlt> Edit</a></Link>
                    </div>
                </div>
                <div className="mt-5">
                    <p className="font-normal ">{new Date(evt.date).toLocaleDateString('en-US')}</p>
                    <h1 className="font-bold text-3xl">{evt.name}</h1>
                    <ToastContainer />
                </div>
                {evt.image && (
                    <div className="mt-5">
                        <Image alt="event image"
                            src={evt.image.formats.thumbnail.url}
                            width={960}
                            height={600}
                        />
                    </div>
                )}

                <div className="flex flex-col mt-4 justify-start leading-8">
                    <h2 className="font-bold text-xl">Performers</h2>
                    <p className="font-normal ">{evt.performers}</p>
                    <h2 className="font-bold text-xl">Description</h2>
                    <p className="font-normal">{evt.description}</p>
                </div>
                <Link href="/"><a className="text-cyan-600 mt-8 font-bold">Go Back</a></Link>
            </div>
        </Layout>
    );
}


export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`)
    const events = await res.json()

    return {
        props: {
            evt: events[0],
        },
    }
}