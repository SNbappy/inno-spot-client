import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Products from "../pages/Products/Products";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/MyProfile/MyProfile";
import AddProduct from "../pages/AddProduct/AddProduct";
import MyProducts from "../pages/MyProducts/MyProducts";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'products',
                element: <Products />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
            {
                path: 'profile',
                element: <MyProfile />,
            },
            {
                path: 'add-product',
                element: <AddProduct />,
            },
            {
                path: 'my-products',
                element: <MyProducts />,
            },
            {
                path: 'update-product/:id',
                element: <UpdateProduct></UpdateProduct>
            }
        ],
    },
]);
