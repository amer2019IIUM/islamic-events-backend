import { parseCookies } from '../../helpers/index'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import DashboardEvent from '../../components/DashboardEvent'
import { API_URL } from '../../config/index'

export default function DashboardPage({ events, token }) {
    const router = useRouter()

    const deleteEvent = async (id) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.reload()
            }
        }
    }

    return (
        <Layout title='User Dashboard'>
            <div className="dash">
                <h1 className='text-3xl font-extrabold my-5'>Dashboard</h1>
                <h4 className='text-lg font-extrabold my-5'>My Events</h4>

                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const events = await res.json()

    return {
        props: {
            events,
            token,
        },
    }
}