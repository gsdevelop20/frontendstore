import { json, useParams, Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import API from '../../api'
import { useEffect, useState, FormEvent } from "react"
import Modal from 'react-modal';


Modal.setAppElement('#root')

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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define a cor de fundo transparente
    },
};



export function Product() {

    const { productid } = useParams()
    const [product, setProduct] = useState<dataprops[]>([])
    const [allcomment, setallcomment] = useState<commentprops[]>([])
    const [comment, setcomment] = useState('')
    const [EditComment, setEditcomment] = useState('')
    const [EditCommentId, setEditcommentId] = useState('')
    const [modalIsOpen, setIsopen] = useState(false);
    const [modalIsOpen2, setIsopen2] = useState(false);
    let userid = localStorage.getItem("userid") ?? ''
    console.log(userid);

    function openModal(id: string, comment: string) {

        setEditcomment(comment)
        setEditcommentId(id)

        setIsopen(true)
    }

    function openModal2(id: string,) {

        setEditcommentId(id)

        setIsopen2(true)
    }

    function closeModal() {
        setIsopen(false)
    }

    function closeModal2() {
        setIsopen2(false)
    }

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
            fetch('http://127.0.0.1:8000/api/getAllComment/' + productid)
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

    function login() {
        if (userid == '') {
            document.getElementById("default-search")?.setAttribute('disabled', '')
            document.getElementById("send")?.setAttribute('disabled', '')
            return false
        }

        return true
    }

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

    const editCommentt = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('commentid', EditCommentId ?? '0')
        formData.append('newcomment', EditComment ?? '')

        if (await API.editComment(formData)) {
            location.reload()
        }
    }

    const deletComment = async (id: string) => {
        if (await API.deleteComment(id)) {
            location.reload()
        }
    }

    login()

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
                                    <Link to={'/checkout/'+item.ProductID}><button type="button" className=" w-[100%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Comprar</button></Link>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>
                <div className='bg-white shadow-2xl mx-auto w-[84%] rounded mb-5'>
                    <h2 className='p-8 ml-4' >
                        Comentários
                    </h2>

                    <div className='w-[84%] mx-auto rounded p-5'>

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
                                <button id='send' type="submit" className=" text-white absolute right-2.5 bottom-2.5 bg-green-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Enviar</button>
                            </div>
                        </form>

                        {allcomment.map((item) => (
                            <div className='p-7 flex justify-between border-b-4 mb-5'>
                                <div className='flex'>
                                    <FaUserCircle size={30} />
                                    <div>
                                        <h1 className='ml-5' id={item.ReviewID}>{item.username}</h1>
                                        <p className='ml-5 mt-2'>{item.Comment}</p>
                                    </div>
                                </div>
                                {
                                    item.UserID == userid ? (
                                        <div>
                                            <div className='cursor-pointer' id={item.ReviewID} onClick={() => openModal2(item.ReviewID)}>
                                                <BsTrash size={16} className='text-red-700 ' />
                                            </div>
                                            <div className='mt-3 cursor-pointer'>
                                                <AiOutlineEdit className={item.Comment} onClick={() => openModal(item.ReviewID, item.Comment)} />
                                            </div>
                                        </div>

                                    ) : ('')
                                }


                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    id={item.ReviewID}
                                >
                                    <h2 className='mb-4' >Editar comentário</h2>


                                    <form onSubmit={editCommentt}>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            </div>

                                            <input
                                                type="search"
                                                id="default-search"
                                                className="block w-full p-4 pl-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 outline-none  "
                                                placeholder="Digite seu comentário" value={EditComment}
                                                onChange={(e) => setEditcomment(e.target.value)}
                                            />
                                            <button id='send' type="submit" className=" text-white absolute right-2.5 bottom-2.5 bg-green-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Editar</button>
                                        </div>

                                    </form>
                                </Modal>

                                <Modal
                                    isOpen={modalIsOpen2}
                                    onRequestClose={closeModal2}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    id={item.ReviewID}
                                >
                                    <h2 className='mb-4' > <span className='text-red-700 font-bold'>ATENÇÂO:</span> Tem certeza que deseja deletar seu comentário.</h2>

                                    <div className='flex justify-end'>
                                        <button onClick={() => closeModal2()} className=" text-white right-2.5 bottom-2.5 bg-red-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Não</button>
                                        <button onClick={() => deletComment(EditCommentId)} className=" ml-3 text-white  right-2.5 bottom-2.5 bg-green-700 focus :ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">Sim</button>
                                    </div>
                                </Modal>


                            </div>
                        ))}

                    </div>

                </div>
            </main>

        </>

    )
}
