import { useParams } from 'react-router-dom'
import API from '../../api'
import { useEffect, useState } from "react"


interface dataprops{
    ProductID: string,
    SellerID: string,
    ProductName: string ,
    Description: string,
    Price: string,
    StockQuantity: string,
    Category: string,
    url: string
}

export function Product() {

    const { productid } = useParams()
    const [product, setProduct] = useState<dataprops[]>([])

    useEffect(()=>{

        function getData(){
            fetch('http://127.0.0.1:8000/api/product/'+productid)
            .then(Response => Response.json())
            .then((data:dataprops[])=>{
                  setProduct(data)
            })
                
            .catch((err) => {
                console.log(err)
            })
        }

        getData()

    },[])

    return (
        <>
            
            <main className="w-100 flex justify-center">
                {product.map((item) =>(
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
            </main>
            
        </>

    )
}