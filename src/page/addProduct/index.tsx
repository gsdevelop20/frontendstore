import { useState, FormEvent } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import API from '../../api'

export function AddProduct() {
    
    const [productimg, setProductImg] = useState<File>()
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    
    const saveProduct =  async(e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        var userid = localStorage.getItem("userid")

        formData.append('sellerid', userid ?? '0')
        formData.append('productname', productName)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('stockquantity', stock)
        formData.append('productimg', productimg ?? '')

        if(await API.addProduct(formData)){
            navigate('/')
        }
    }

    return (
        <>
            <section className=" dark:bg-gray-900 mt-60 mb-40">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Adicionar Produto
                    </h1>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Informações do Produto
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={saveProduct} action="#">

                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagem do produto</label>
                                    <input 
                                        type="file" 
                                        name="productImg" 
                                        id="productImg" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-600 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gabriel" 
                                        required
                                        onChange={(e) => setProductImg(e.target.files?.[0])}
                                    />
                                </div>

                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do produto</label>
                                    <input 
                                        type="text" 
                                        name="productname" 
                                        id="productname" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-600 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gabriel" 
                                        required
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                    <textarea 
                                        name="description" 
                                        id="description" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-600 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sousa" 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}

                                    >    
                                    </textarea>
                                </div>

                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço</label>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        id="Price"
                                        min="0"
                                        max="99999.999" 
                                        step="0.10" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-600 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" 
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria do produto</label>
                                    <select 
                                        name="category" 
                                        id="category" 
                                        className="bg-gray-50 border border-gray-300 text-blue-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="eletronicos">eletronico</option>
                                    </select>
                                </div>
                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade em Estoque</label>
                                    <input 
                                        type="number" 
                                        name="quantstock" 
                                        id="quantstock"
                                        placeholder="0" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                
                                <button type="submit" className="w-full text-white bg-cyan-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Adicionar Produto</button>
                        
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}