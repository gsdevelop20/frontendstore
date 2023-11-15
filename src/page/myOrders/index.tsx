import { useState, FormEvent, useEffect } from 'react'
import { Link, json, useNavigate, useParams } from 'react-router-dom'
import API from '../../api'

interface orderProps {
    OrderID: string,
    UserID: string,
    Status: string,
    OrderItemID: string,
    ProductID: string,
    Quantity: string,
    OrderDate: string,
    Subtotal: string,
    productname: string,
    productimg: string,
}

export function Myorders() {

    const [orders, setOrder] = useState<orderProps[]>([])
    let userid = localStorage.getItem("userid") ?? ''

    useEffect(() => {

        function getData() {
            fetch('http://127.0.0.1:8000/api/getOrder/' + userid)
                .then(Response => Response.json())
                .then((data: orderProps[]) => {
                    setOrder(data)
                    console.log(data)
                })

                .catch((err) => {
                    console.log(err)
                })
        }

        getData()

    }, [])
    return (
        <>
            <main className='mt-36  '>
                <h1 className='font-extrabold text-center text-2xl '>Meus pedidos</h1>
            <main className='mx-auto container flex justify-center p-10 gap-6 flex-wrap '>
                
                {orders.map((item) => (
                    <div  className="flex p-10 flex-col shadow-2xl  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border dark:bg-white ">
                        <img className=" md:rounded-none md:rounded-s-lg" src={item.productimg} alt="" width={150}/>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black ">{item.productname}</h5>
                            <tr>_________________________________________________</tr>
                            <span className='font-extrabold'>TOTAL: R$: {item.Subtotal}</span>
                            <span className='font-extrabold'>QUANTIDADE: {item.Quantity}</span>
                            <span className='font-extrabold'>STATUS: {item.Status} </span>
                        </div>
                    </div>
                ))}
                
            </main>
            </main>

        </>
    )
}