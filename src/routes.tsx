import { createBrowserRouter } from "react-router-dom";
import { Layout } from './components/layout'
import { Home } from "./page/home";
import { Login } from "./page/login";
import { Register } from "./page/register";
import { AddProduct } from "./page/addProduct";
import { Product } from "./page/product";
import { Myproducts } from "./page/myproducts";
import { EditProduct } from "./page/editProduct";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/addproduct",
                element: <AddProduct/>
            },
            {
                path: "/product/:productid",
                element: <Product/>
            },
            {
                path: "/myProducts",
                element: <Myproducts/>
            },
            {
                path: "/editProduct/:productid",
                element: <EditProduct/>
            },
        ],
                
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },

])

export {router}