import { useState, FormEvent, useEffect } from 'react'
import { Link, json, useNavigate, useParams } from 'react-router-dom'
import API from '../../api'


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

interface userprop {
    address: string,
    birthdate: string
    email: string,
    firstName: string,
    fone: string,
    infoId: string,
    lastName: string,
    password: string,
    registrationDate: string,
    userId: string,
}

interface paymentprops {
    paymentid: string,
    qrcode_img: string,
    qrcode_link: string,
}

export function Checkout() {

    const { productid } = useParams()
    let userid = localStorage.getItem("userid") ?? ''
    const [product, setProduct] = useState<dataprops[]>([])
    const [user, setUser] = useState<userprop[]>([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setaddress] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [subTotal, setsubtotal] = useState('')
    const [payment, setpayment] = useState<paymentprops[]>([])
    const [qrcode_img, setqrcode_img] = useState('')
    const [pimg, setpimg] = useState('')
    const [pname, setpname] = useState('')
    const [stock, setStock] = useState('')

    useEffect(() => {

        async function getData() {
            await fetch('http://127.0.0.1:8000/api/product/' + productid)
                .then(Response => Response.json())
                .then((data: dataprops[]) => {
                    setProduct(data)
                    setsubtotal(data[0].Price)
                    setpimg(data[0].url)
                    setpname(data[0].ProductName)
                    setStock(data[0].StockQuantity)
                })

                .catch((err) => {
                    console.log(err)
                })
        }

        async function getUser() {
            await fetch('http://127.0.0.1:8000/api/getUser/' + userid)
                .then(Response => Response.json())
                .then((data: userprop[]) => {
                    setUser(data)
                    setFirstName(data[0].firstName)
                    setlastName(data[0].lastName)
                    setaddress(data[0].address)
                    setEmail(data[0].email)
                })

                .catch((err) => {
                    console.log(err)
                })
        }

        getData()
        getUser()

    }, [])

    const createOrder = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('userid', userid ?? '0')
        formData.append('email', email)
        formData.append('productid', productid ?? '0')
        formData.append('quantity', quantity)
        formData.append('subtotal', subTotal)
        formData.append('stock', stock)

        await fetch("http://127.0.0.1:8000/api/createOrder", {
            method: 'POST',
            body: formData
        })
            .then(Response => Response.json())
            .then((data: paymentprops[]) => {
                setpayment(data)
                setqrcode_img(data[0].qrcode_img)
                console.log(data)
            })

            .catch((err) => {
                console.log(err)
            })

    }

    function subtotal() {
        const total: number = Number(product[0].Price) * Number(quantity);
        const formattedTotal: string = total.toFixed(2);
        setsubtotal(formattedTotal);
    }

    var q = document.getElementById('grid-q')
    q?.addEventListener('change', subtotal)


    return (
        <>
            <main className='p-5'>
                <h1 className={payment.length !== 0 ? 'hidden' :'text-center mt-36 font-bold'}>Informe os dados para a finalização da compra</h1>

                <div className='container mx-auto mt-20  bg-white p-10 rounded-2xl flex flex-wrap justify-around  mt-7 gap-7 items-center'>
                    <div className={payment.length !== 0 ? 'hidden' : 'w-[100%] flex flex-wrap justify-around items-center'}  >
                        <div className='mx-auto mb-10 '>
                            <img src={pimg} width={250} alt="" />
                            <h1 className='text-center text-2xl font-bold'>Preço Total:<br /><span className='font-bold text-green-600  '>R$: {subTotal}</span></h1>
                        </div>
                        <form className="w-full max-w-lg " onSubmit={createOrder}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Primeiro Nome
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Jane"
                                    />

                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Segundo Nome
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-last-name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setlastName(e.target.value)}
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Endereço de entrega
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-password"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        placeholder="Rua 911, Bloco B"
                                    />

                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Email
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-password"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="usuario@email.com"
                                    />

                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Quantidade
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-q"
                                        type="number"
                                        value={quantity}
                                        min={1}
                                        max={stock}
                                        placeholder="Quantidade"
                                        onChange={(e) => setQuantity(e.target.value)}

                                    />
                                </div>

                            </div>
                            <div className='w-[100%]'>
                                <button type="submit" className=" w-[100%]  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Finalizar Compra</button>
                            </div>
                        </form>

                    </div>

                    <div className={payment.length !== 0 ? '' : 'hidden'}>
                        <h1 className='font-extrabold text-center text-3xl text-blue-500  '>QRCODE <br /> PARA PAGAMENTO</h1>
                    </div>
                    <div className={payment.length !== 0 ? '' : 'hidden'}>
                        <img src={qrcode_img} width={400} alt="" />
                    </div>
                </div>
            </main >
        </>
    )
}