import './style.css'
import { AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState } from 'react'
import { Link, useActionData, useNavigate } from 'react-router-dom'

export function Header() {
    const navigate = useNavigate()
    const [name, setname] = useState({
        userName: '',
        isLogin: false
    })


    useEffect(() => {
        if (localStorage.getItem('userName')) {
            setname({
                userName: String(localStorage.getItem('userName')),
                isLogin: true
            })

        }
    }, [])

    function exit() {
        localStorage.clear()
        setname({
            userName: '',
            isLogin: false
        })
        navigate('/')
    }

    return (
        <header>
            <nav className="bg-white  light:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b-4  border-indigo-200 border-b-indigo-500 border-gray-200 border- ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={'/'} className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Store</span>
                    </Link>
                    <div className="flex md:order-2">
                        <div className="">

                            <div className="dropdown inline-block relative p-1">
                                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                    <AiOutlineUser />
                                </button>
                                {name.isLogin ? (
                                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-40 right-0">
                                        <li className=""><Link to={''} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >{name.userName}</Link></li>
                                        <li className=""><Link to={'/myProducts'} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Meus Produtos</Link></li>
                                        <li className=""><Link to={'/addproduct'} className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Vender</Link></li>
                                        <li className=""><Link to={'/myorders'} className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Meus pedidos</Link></li>
                                        <li className=""><Link to={'/report'} className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Relatório de vendas</Link></li>
                                        <li className=""><Link to={'/order_report'} className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Relatório de pedidos</Link></li>
                                        <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={exit} href="#">Sair</a></li>
                                    </ul>
                                ) : (
                                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-40 right-0">
                                        <li className=""><Link to={'/login'} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Login</Link></li>
                                        <li className=""><Link to={'/register'} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Register</Link></li>
                                    </ul>
                                )}

                            </div>

                        </div>

                    </div>
               
                </div>
            </nav>
        </header>
    )
}