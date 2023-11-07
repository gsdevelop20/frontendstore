import { json, useParams } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import API from '../../api'
import { useEffect, useState, FormEvent } from "react"


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

interface commentprops {
    Comment: string,
    ReviewID: string,
    UserID: string,
    ProductID: string,
    Rating: string,
    ReviewDate: string,
    username: string
}

export function Product() {

    const { productid } = useParams()
    const [product, setProduct] = useState<dataprops[]>([])
    const [allcomment, setallcomment] = useState<commentprops[]>([])
    const [comment, setcomment] = useState('')

    useEffect(() => {

        function getData() {
            fetch('http://127.0.0.1:8000/api/product/' + productid)
                .then(Response => Response.json())
                .then((data: dataprops[]) => {
                    setProduct(data)
                })

                .catch((err) => {
                    console.log(err)
                })
        }
        async function getAllComment() {
            fetch('http://127.0.0.1:8000/api/getAllComment/'+ productid)
                .then(Response => Response.json())
                .then((data: commentprops[]) => {
                    setallcomment(data)
                })

                .catch((err) => {
                    console.log(err)
                })
            
        }

        getData()
        getAllComment()

    }, [])

    const saveComment = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        var userid = localStorage.getItem("userid")

        formData.append('userid', userid ?? '0')
        formData.append('productid', productid ?? '0')
        formData.append('comment', comment)

        if (await API.saveComment(formData)) {
            location.reload()
        }
    }

    return (
        <>
            <main className=''>
                <div className="w-100 flex justify-center">
                    {product.map((item) => (
                        <div className="container gap-3  xl:mx-auo h-100 max-w-[90%] mt-[150px] flex max-xl:flex-wrap p-10 mb-10">
                            <div className='rounded justify-center h-auto flex gap-2 flex-wrap w-[100%] mx-auto shadow-2xl bg-white'>
                                <div>
                                    <img className='object-contain aspect-square  max-w-sm w-80  ' src={item.url} alt="" />
                                </div>
                                <div className='flex flex-col gap-8 mt-10 p-10 mb-10'>
                                    <h1 className='relativ top-10 text-1xl font-bold'>
                                        {item.ProductName}
                                    </h1>
                                    <p className='sm:relativ top-20 '>
                                        {item.Description}
                                    </p>
                                </div>
                            </div>
                            <div className='rounded container gap-7 max-xl:w-[100%] w-[60%] h-100 justify-between flex-col  items-center flex  mx-auto shadow-2xl bg-white'>
                                <div className='text-4xl font-bold max-2xl:mt-10'>
                                    <h1>R$ {item.Price} </h1>

                                </div>
                                <div className='w-[70%]'>
                                    <button type="button" className=" w-[100%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Comprar</button>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>
                <div className='bg-white shadow-2xl mx-auto w-[84%] rounded mb-5'>
                    <h2 className='p-10' >
                        Comentários
                    </h2>

                    <div className='w-[84%] mx-auto rounded'>

                        <form className='mb-4' onSubmit={saveComment}>
                            <label className="mb-2 text-sm font-medium  sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 pl-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 outline-none  "
                                    placeholder="Digite seu comentário" value={comment}
                                    onChange={(e) => setcomment(e.target.value)}
                                />
                                <button type="submit" className=" text-white absolute right-2.5 bottom-2.5 bg-green-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Enviar</button>
                            </div>
                        </form>

                        {allcomment.map((item) => (
                        <div className='p-7 flex border-b-4 mb-5'>
                            <FaUserCircle size={30} />
                            <div>
                                <h1 className='ml-5'>{item.username}</h1>
                                <p className='ml-5 mt-2'>{item.Comment}</p>
                            </div>

                        </div>
                        ))}

                    </div>

                </div>
            </main>

        </>

    )
}