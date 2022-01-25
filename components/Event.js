import Image from "next/image";
import Link from "next/link";
export default function Event({ event }) {
    console.log(event);

    return (
        <div className="flex md:flex-row   flex-col shadow-sm items-center justify-between p-5">
            <div>
                <Image src={event.image == null ? "/../public/images/sample/event1.jpg" : event.image.formats.thumbnail.url} alt="event image" width={150} height={100} className="rounded-xl" />
            </div>
            <div className="flex flex-col justify-start items-start md:text-left text-center">
                <p>{new Date(event.date).toLocaleDateString('en-US')}</p>
                <h3 className="font-extrabold">{event.name}</h3>
            </div>
            <div>
                <Link href={`/events/${event.slug}`}><a className="py-1 rounded-md md:m-t-0 mt-3  block px-5 text-white font-medium bg-cyan-900 hover:bg-cyan-500" >Details</a></Link>
            </div>
        </div>
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