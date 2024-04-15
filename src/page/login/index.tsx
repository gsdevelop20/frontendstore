import Styles from './styles.css'
import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const verifyData = async(e: FormEvent) => {
        e.preventDefault()
        await API.verifylogin(email,password)

        if(localStorage.getItem("userid")){
            navigate('/')
            return
        }
        
        navigate('/login')
    }

    return (
        <>
            <main>
                <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                            <div className="max-w-md mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Faça seu login na Store</h1>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    <form onSubmit={verifyData}>
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                                            <div className="relative">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="text"
                                                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${localStorage.getItem('error')?"border-red-400": "border-gray-400"} border-gray-400 text-gray-900 focus:outline-none focus:borer-rose-600`}
                                                    placeholder="Email address"
                                                />
                                                <label className={`absolute left-0 -top-3.5 ${localStorage.getItem('error')?"text-red-600": "text-gray-600"} text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm`}>Email</label>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    id="Senha"
                                                    name="password" type="password"
                                                    className={`peer placeholder-transparent h-10 w-full border-b-2 ${localStorage.getItem('error')?"border-red-400": "border-gray-400"} border-gray-400 text-gray-900 focus:outline-none focus:borer-rose-600`}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Password" />
                                                <label className={`absolute left-0 -top-3.5 ${localStorage.getItem('error')?"text-red-600": "text-gray-600"} text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm`}>Senha</label>
                                            </div>
                                            <div className="relative">
                                                <button className="bg-blue-500 text-white rounded-md px-2 py-1" type="submit">Entrar</button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}