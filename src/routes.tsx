import { createBrowserRouter } from "react-router-dom";
import { Layout } from './components/layout'
import { Home } from "./page/home";
import { Login } from "./page/login";
import { Register } from "./page/register";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path: "/",
                element: <Home/>
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