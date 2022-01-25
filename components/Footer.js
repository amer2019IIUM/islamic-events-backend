import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center mt-60 font-mono">
            <p>Copyright &copy; Islamic Events 2022</p>
            <Link href="/about"><a className="text-blue-600 text-center">About This Project</a></Link>
        </footer>
    );
}
