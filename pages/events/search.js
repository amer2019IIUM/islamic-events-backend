import { useRouter } from "next/router";
import qs from "qs";
import Event from "../../components/Event";
import Layout from "../../components/Layout";
import { API_URL } from "../../config"
export default function HomePage({ events }) {
    const router = useRouter();
    return (
        <Layout title="Search Result">
            <h1 className="text-2xl font-black mt-12 border-y-4 bord py-3">Search Result for <span className="text-cyan-700">{router.query.term}</span></h1>
            {events.length === 0 && <h3>No Events</h3>}

            <div className="flex flex-col"></div>
            {events.map(event => <Event key={event.id} event={event} />
            )}

        </Layout>
    )
}


export async function getServerSideProps({ query: { term } }) {
    const queryResult = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers_contains: term },
                { description_contains: term },
                { venue_contains: term },

            ]
        }
    })
    const res = await fetch(`${API_URL}/events?${queryResult}`);
    const events = await res.json()

    return {
        props: { events },

    }
}