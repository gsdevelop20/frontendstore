
import { Slider } from "../../components/slider"
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react"
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

    useEffect(() => {

        function getData() {
            fetch('http://127.0.0.1:8000/api/allProducts')
                .then(Response => Response.json())
                .then((data: dataprops[]) => {

                    console.log(data)
                    setData(data)

                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getData()

    }, [])

    return (

        <main className="">
            <Slider />
            <div className="container shadow-2xl rounded mx-auto max-w-6xl mt-[150px] p-10 flex flex-wrap mb-10 justify-evenly  bg-white">
                {datac.map((item) => (

                    <div className="flex flex-wrap justify-evenly shadow-2xl w-[25%]">
                        <div className="flex flex-col  align-baseline   w-[97%] rounded overflow-hidden flex-row justify-between mb-">
                            <Link to={'/product/' + item.ProductID}>
                                <img
                                    className="rounded-t-lg w-52 mx-auto"
                                    src={item.url}
                                    alt=""
                                />
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
        </main>
    )
} 