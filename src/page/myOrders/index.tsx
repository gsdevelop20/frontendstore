import { useState, FormEvent, useEffect } from 'react'
import { Link, json, useNavigate, useParams } from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import Modal from 'react-modal';
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

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '60%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgraund: 'transparent'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Define a cor de fundo transparente
    },
};


export function Myorders() {

    const [orders, setOrder] = useState<orderProps[]>([])
    const [modalIsOpen, setIsopen] = useState(false);
    const [orderid, setOrderid] = useState('')
    const [ordemitemid, setordemitemid] = useState('')
    
    let userid = localStorage.getItem("userid") ?? ''

    function openModal(id: string, id2: string) {
        setOrderid(id)
        setordemitemid(id2)
        setIsopen(true)
    }
    
    function closeModal() {
        setIsopen(false)
    }

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

    const deleteOrder = async (id: string, id2:string) => {
        if (await API.deleteOrder(id, id2)) {
            location.reload()
        }
    }
    return (
        <>
            <main className='mt-36  '>
                <h1 className='font-extrabold text-center text-2xl '>Meus pedidos</h1>
            <main className='mx-auto container flex justify-center p-10 gap-6 flex-wrap '>
            
                {orders.map((item) => (
                    
                    <div  className="flex p-10 flex-col shadow-2xl  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border dark:bg-white ">
                    <div>
                    <BsTrash className='relative bottom-36 right-5 text-red-600 cursor-pointer   ' onClick={() => openModal(item.OrderID, item.OrderItemID)}/>
                    </div>
                        <img className=" md:rounded-none md:rounded-s-lg" src={item.productimg} alt="" width={150}/>
                        
                        <div className="flex flex-col justify-between p-4 leading-normal">
                        
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black ">{item.productname}</h5>
                            <tr>_________________________________________________</tr>
                            <span className='font-extrabold'>TOTAL: R$: {item.Subtotal}</span>
                            <span className='font-extrabold'>QUANTIDADE: {item.Quantity}</span>
                            <span className='font-extrabold'>STATUS: {item.Status} </span>
                        </div>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                            id={item.ProductID}
                        >
                            <h2 className='mb-4' > <span className='text-red-700 font-bold'>ATENÇÂO:</span> Tem certeza que deseja deletar esse Pedido.</h2>

                            <div className='flex justify-end'>
                                <button onClick={() => closeModal()} className=" text-white right-2.5 bottom-2.5 bg-red-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Não</button>
                                <button onClick={() => deleteOrder(orderid, ordemitemid)} className=" ml-3 text-white  right-2.5 bottom-2.5 bg-green-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Sim</button>
                            </div>
                        </Modal>
                    </div>
                    
                ))}
                
            </main>
            </main>

        </>
    )
}