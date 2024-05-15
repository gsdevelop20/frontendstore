import { Slider } from "../../components/slider"
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react"
import API from "../../api";
import './style.css'
import { Link } from "react-router-dom";

interface dataprops {
    ProductID: string,
    SellerID: string,
    ProductName: string,
    Description: string,
    Price: string,
    StockQuantity: string,
    Category: string,
    url: string
}

export function Home() {
    const [datac, setData] = useState<dataprops[]>([])
    const [search, setsearch] = useState('')

    function getData() {
        fetch('http://127.0.0.1:8000/api/allProducts')
            .then(Response => Response.json())
            .then((data: dataprops[]) => {
                setData(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (search !== '') {
            API.searchProduct(search)
                .then(Response => Response.json())
                .then((data: dataprops[]) => {
                    setData(data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            getData()
        }
    }, [search])

    return (
        <main className="">
            <Slider />
            <div className="w-full flex justify-center">
                <div className="container shadow-2xlrounded w-full max-w-6xl gap-5 mt-[150px] p-10 flex flex-wrap mb-10 justify-evenly bg-white">
                    <div className="relative">
                        <input
                            id=""
                            name="search" type="text"
                            className={`peer placeholder-transparent h-10 w-full border-b-2 ${localStorage.getItem('error') ? "border-red-400" : "border-gray-400"} border-gray-400 text-gray-900 focus:outline-none focus:borer-rose-600`}
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder="Pesquisar" />
                        <label className={`absolute left-0 -top-3.5 ${localStorage.getItem('error') ? "text-red-600" : "text-gray-600"} text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm`}>Pesquisar</label>
                    </div>
                    <div className="container shadow-2xlrounded w-full max-w-6xl gap-5 mt-[150px] p-10 flex flex-wrap mb-10 justify-evenly bg-white">
                        {datac.map((item) => (
                            <div className="flex flex-wrap justify-evenly shadow-2xl w-[270px]">
                                <div className="flex flex-col  align-baseline h-[370px]  w-[97%] rounded overflow-hidden justify-between mb-">
                                    <Link to={'/product/' + item.ProductID}>
                                        <div className=" ">
                                            <img
                                                className="rounded-t-lg w-44  h-64 mx-auto"
                                                src={item.url}
                                                width={150}
                                                height={150}
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                    <div className="px-6 py-4 info">
                                        <div className="font-bold text-xl max-w-xl mb-"><p className=" break-words name text-ellipsis">{item.ProductName}</p></div>
                                        <div className="price flex justify-end  items-center h-[100%] ">
                                            <p className="text-gray-700 text-base w-[100%]">
                                                <span className="text-lg text-green-500 font-bold">R$ {item.Price}</span>
                                            </p>

                                            <i className="items-end "><FiShoppingCart /></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
} 