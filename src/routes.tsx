import { createBrowserRouter } from "react-router-dom";
import { Layout } from './components/layout'
import { Home } from "./page/home";
import { Login } from "./page/login";
import { Register } from "./page/register";
import { AddProduct } from "./page/addProduct";
import { Product } from "./page/product";
import { Myproducts } from "./page/myproducts";
import { EditProduct } from "./page/editProduct";
import { Checkout } from "./page/checkout";
import { Myorders } from "./page/myOrders";
import { Report } from "./page/report";

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
            {
                path: "/checkout/:productid",
                element: <Checkout/>
            },
            {
                path: "/myorders",
                element: <Myorders/>
            },
            {
                path: "/report",
                element: <Report/>
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