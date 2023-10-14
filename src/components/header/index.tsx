import './style.css'
import { AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState }from 'react'
import { Link, useActionData, useNavigate } from 'react-router-dom'

export function Header() {
    const [name, setname] = useState({
        userName: '',
        isLogin: false
    })


    useEffect(()=>{
        if(localStorage.getItem('userName')){
            setname({
              userName: String(localStorage.getItem('userName')),
              isLogin: true
            })
            
        }
    },[])

    function exit(){
        localStorage.clear()
        setname({
            userName: '',
            isLogin: false
          })
    }

    return (
        <header>
            <nav className="bg-white  light:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Store</span>
                    </a>
                    <div className="flex md:order-2">
                        <div className="">

                            <div className="dropdown inline-block relative p-1">
                                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                    <AiOutlineUser/>
                                </button>
                                    {name.isLogin ? (
                                        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-40 right-0">
                                            <li className=""><Link to={''} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >{name.userName}</Link></li>
                                            <li className=""><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
                                            <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={exit} href="#">Sair</a></li>
                                        </ul>
                                    ):(
                                        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-40 right-0">
                                            <li className=""><Link to={'/login'} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Login</Link></li>
                                            <li className=""><Link to={'/register'} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Register</Link></li>
                                        </ul>

                                    )}
                                    
                            </div>

                        </div>
        
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                        
                            <li>
                                <a className="block py-2 pl-3 pr-4  text-blue-700 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-blue-700 rounded  md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-blue-700 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500   dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-blue-700 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 e  dark:hover:text-white md:dark:hover:bg-transparent">teste</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}