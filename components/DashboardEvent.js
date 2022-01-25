import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

export default function DashboardEvent({ evt, handleDelete }) {
    return (
        <div className="event">
            <h4>
                <Link href={`/events/${evt.slug}`}>
                    <a className='text-blue-600'>{evt.name}</a>
                </Link>
            </h4>
            <Link href={`/events/edit/${evt.id}`}>
                <a className="edit">
                    <FaPencilAlt /> <span>Edit Event</span>
                </a>
            </Link>
            <a
                href='#'
                className="delete"
                onClick={() => handleDelete(evt.id)}
            >
                <FaTimes /> <span>Delete</span>
            </a>
        </div>
    )
}