import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../pages/MyProfile/MyProfile";
import AddProduct from "../pages/AddProduct/AddProduct";
import MyProducts from "../pages/MyProducts/MyProducts";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import ProductReviewQueuePage from "../pages/ProductReviewQueuePage/ProductReviewQueuePage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ReportedContentsPage from "../pages/ReportedContentsPage/ReportedContentsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ManageUsersPage from "../pages/ManageUsersPage/ManageUsersPage";
import PrivateRoute from "./PrivateRoute";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFoundPage/>,
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
                element: <ProductsPage />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
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
                element: <UpdateProduct/>
            },
            {
                path: 'product-review-queue',
                element: <ProductReviewQueuePage/>
            },
            {
                path: 'product-details/:id',
                element: <ProductDetailsPage/>
            },
            {
                path: 'reported-contents',
                element: <ReportedContentsPage/>
            },
            {
                path: 'manage-users',
                element: <ManageUsersPage/>
            },
        ],
    },
]);
