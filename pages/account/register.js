import Layout from "../../components/Layout"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../config";
import AuthContext from "../../context/AuthContext";

export default function Register() {
    const { error, register } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const router = useRouter();

    useEffect(() => error && toast.error(error))

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordConfirm) {
            toast.error('Passwords do not match!')
            return
        }

        register({ username, email, password })
    }

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center mt-9">
                <div className="shadow-2xl rounded px-9 min-h-full md:w-[500px] w-auto ">
                    <div>
                        <h1 className="font-extrabold text-3xl block my-10">Register</h1>
                        <ToastContainer />

                        <form onSubmit={handleSubmit}>
                            {/* User Name*/}
                            <div v className="flex justify-between gap-1 mb-8">
                                <div className="flex flex-col flex-1 ">
                                    <label className="font-bold">User Name</label>
                                    <input type='text'
                                        id='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " required />
                                </div>
                            </div>
                            {/* email*/}
                            <div v className="flex justify-between gap-1 mb-8">
                                <div className="flex flex-col flex-1 ">
                                    <label htmlFor="date" className="font-bold">Email Address</label>
                                    <input type='email'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " />
                                </div>
                            </div>
                            {/* password*/}
                            <div v className="flex justify-between gap-1 mb-8">
                                <div className="flex flex-col flex-1 ">
                                    <label htmlFor="date" className="font-bold">Password</label>
                                    <input type='password'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} className="flex-1  p-1 border-2 border-cyan-600 rounded-md " />
                                </div>
                            </div>
                            {/* password*/}
                            <div v className="flex justify-between gap-1 mb-8">
                                <div className="flex flex-col flex-1 ">
                                    <label className="font-bold">Confirm Password</label>
                                    <input type='password'
                                        id='passwordConfirm'
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)} className="flex-1  p-1 border-2 border-cyan-600 rounded-md  " />
                                </div>
                            </div>
                            {/* Button*/}
                            <div v className="flex justify-between gap-1 mb-8">
                                <div className="flex flex-col  flex-1 ">
                                    <input type="submit" value="Register" className="flex-1  p-1 border-2 hover:bg-cyan-900 bg-cyan-600 rounded-md text-white cursor-pointer " />
                                </div>
                            </div>
                            <div v className="flex justify-between gap-1 mb-8">
                                <div className="flex flex-col  flex-1 ">
                                    <p>Login here <Link href="login"><a className="text-blue-600">Login</a></Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
