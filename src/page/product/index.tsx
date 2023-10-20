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
            
            <main className="">
                {product.map((item) =>(
                <div className="container gap-3  mx-auto h-96 max-w-[90%] mt-[150px] p-10 grid grid-flow-row-dense grid-cols-2 gap-4 mb-10  ">

                    <div className='rounded col-span-1  flex gap-5 w-[120%] mx-auto shadow-2xl bg-white'>
                        <div>
                            <img className='object-contain aspect-square  max-w-xs  ' src={item.url} alt="" />
                        </div>
                        <div>
                            <h1 className='relative top-10 text-1xl font-bold'>
                                {item.ProductName}
                            </h1>
                            <p className='relative top-20 '>
                            {item.Description}
                            </p>
                        </div>
                    </div>
                    <div className='rounded container w-[60%] justify-between   items-center flex flex-col col-span-1  mx-auto shadow-2xl bg-white'>
                        <div className='text-4xl font-bold  relative top-32   '> 
                            <h1>R$ {item.Price} </h1>
                            
                        </div>
                        <div>
                            <button type="button" className=" w-80 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Comprar</button>
                        </div>
                    
                    </div>

                </div>
                ))}
            </main>
            
        </>

    )
}