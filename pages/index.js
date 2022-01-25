/* eslint-disable react/jsx-key */
import Event from "../components/Event";
import Layout from "../components/Layout";
import { API_URL } from "../config"
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1 className="text-2xl font-black mt-12 border-y-4 bord py-3">Latest Events</h1>
      {events.length === 0 && <h3>No Events</h3>}

      <div className="flex flex-col"></div>
      {events.map(event => <Event key={event.id} event={event} />
      )}

    </Layout>
  )
}


export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1

  }
}