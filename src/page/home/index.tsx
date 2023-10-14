
import { Slider } from "../../components/slider"
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react"

interface dataprops{
    userId: number
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    registrationDate: string,
}

export function Home() {

    const [datac, setData] = useState<dataprops[]>([])

    useEffect(()=>{

        function getData(){
            fetch('http://127.0.0.1:8000/api/teste')
            .then(Response => Response.json())
            .then((data: dataprops[])=>{
                
                console.log(data)
                setData(data)
                
            })
            .catch((err) => {
                console.log(err)
            })
        }

        getData()

    },[])

    return (

        <main className="">
            <Slider />
            <div className="container shadow-2xl rounded mx-auto max-w-6xl mt-[150px] p-10 flex flex-wrap mb-10 justify-evenly  bg-white">
            {datac.map((item) =>(

                    <div className="flex flex-wrap justify-evenly ">
                    <div className="w-90 flex-wrap  rounded overflow-hidden flex-row justify-between  shadow-lg mb-8">
                        <img
                            className="rounded-t-lg mx-auto min-w-full"
                            src="https://http2.mlstatic.com/D_Q_NP_672264-MLB69076296105_042023-AB.webp"
                            alt="" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl max-w-xl mb-2"><p className=" break-words w-[150px]">{item.firstName}</p></div>
                            <div className="flex justify-between items-center mt-10 ">
                                <p className="text-gray-700 text-base">
                                    <span className="text-lg text-green-500 font-bold ">R$ 600,00</span>
                                </p>
                                <i><FiShoppingCart/></i>
                            </div>
                        </div>

                    </div>
                    
                </div>
               
                    ))}
                
            </div>
        </main>
    )
} 