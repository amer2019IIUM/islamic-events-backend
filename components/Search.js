import { useRouter } from "next/router";
import { useState } from "react";

export default function Search() {
    const [term, setTerm] = useState('')
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/events/search?term=' + term)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" className="w-[250px] h-[35px] p-1 border rounded-md" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search Events" />
            </form>
        </div>
    );
}
