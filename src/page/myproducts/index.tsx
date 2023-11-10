import { json, useParams } from 'react-router-dom'
import { useEffect, useState, FormEvent } from "react"
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import API from '../../api'
import Modal from 'react-modal';

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

export function Myproducts() {

    const [datac, setData] = useState<dataprops[]>([])
    let userid = localStorage.getItem("userid") ?? 0
    const [modalIsOpen, setIsopen] = useState(false);
    const [EditCommentId, setEditcommentId] = useState('')

    function openModal(id: string) {
        setEditcommentId(id)
        setIsopen(true)
    }

    function closeModal() {
        setIsopen(false)
    }

    useEffect(() => {
        function getData() {
            fetch('http://127.0.0.1:8000/api/getUserProduct/' + userid)
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

    const deleteProduct = async (id: string) => {
        if (await API.deleteProduct(id)) {
            location.reload()
        }
    }

    let show = ''
    if (datac.length === 0) {
        show = 'hidden'
    }

    return (

        <main className="">

            <h1 className='font-bold text-center text-2xl   mt-[10rem] '>Meus Produtos</h1>

            <div className={"container shadow-2xl rounded mx-auto max-w-6xl  gap-10 mt-[60px] p-10 flex flex-wrap mb-10 justify-center bg-white " + show}>
                {datac.map((item) => (

                    <div className="flex flex-wrap justify-evenly shadow-2xl w-[270px]">
                        <div className="flex flex-col  align-baseline w-[97%] rounded overflow-hidden justify-between mb-">
                            <img
                                className="rounded-t-lg w-52 mx-auto"
                                src={item.url}
                                alt=""
                            />
                            <div className="px-6 py-4 info">
                                <div className="font-bold text-xl max-w-xl mb-"><p className=" break-words name text-ellipsis">{item.ProductName}</p></div>
                                <div className="price flex justify-end  items-center h-[100%] ">
                                    <p className="text-gray-700 text-base w-[100%]">
                                        <span className="text-lg text-green-500 font-bold">R$ {item.Price}</span>
                                    </p>
                                    <div className='flex gap-2'>
                                    <Link to={'/editProduct/' + item.ProductID}><i className="items-end"><AiOutlineEdit size={26} /></i></Link>
                                    <BsTrash className='text-red-700 cursor-pointer  ' size={23} onClick={() => openModal(item.ProductID)} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                            id={item.ProductID}
                        >
                            <h2 className='mb-4' > <span className='text-red-700 font-bold'>ATENÇÂO:</span> Tem certeza que deseja deletar esse produto.</h2>

                            <div className='flex justify-end'>
                                <button onClick={() => closeModal()} className=" text-white right-2.5 bottom-2.5 bg-red-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Não</button>
                                <button onClick={() => deleteProduct(EditCommentId)} className=" ml-3 text-white  right-2.5 bottom-2.5 bg-green-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Sim</button>
                            </div>
                        </Modal>

                    </div>

                ))}

            </div>
        </main>
    )
}