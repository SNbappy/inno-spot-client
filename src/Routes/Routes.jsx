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
import StatisticsPage from "../pages/StatisticsPage/StatisticsPage";
import ManageCoupons from "../pages/ManageCoupons/ManageCoupons";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import AboutPage from "../pages/AboutPage/AboutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFoundPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "products", element: <ProductsPage /> },
            { path: "about", element: <AboutPage /> },
            { path: "product-details/:id", element: <PrivateRoute><ProductDetailsPage /></PrivateRoute> },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                path: "profile",
                element: (
                    <PrivateRoute allowedRoles={["user", "admin", "moderator"]}>
                        <MyProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "add-product",
                element: (
                    <PrivateRoute allowedRoles={["user"]}>
                        <AddProduct />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-products",
                element: (
                    <PrivateRoute allowedRoles={["user"]}>
                        <MyProducts />
                    </PrivateRoute>
                ),
            },
            {
                path: "update-product/:id",
                element: (
                    <PrivateRoute allowedRoles={["user"]}>
                        <UpdateProduct />
                    </PrivateRoute>
                ),
            },
            {
                path: "product-review-queue",
                element: (
                    <PrivateRoute allowedRoles={["moderator"]}>
                        <ProductReviewQueuePage />
                    </PrivateRoute>
                ),
            },
            {
                path: "reported-contents",
                element: (
                    <PrivateRoute allowedRoles={["moderator"]}>
                        <ReportedContentsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "manage-users",
                element: (
                    <PrivateRoute allowedRoles={["admin"]}>
                        <ManageUsersPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "statistics",
                element: (
                    <PrivateRoute allowedRoles={["admin"]}>
                        <StatisticsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "manage-coupons",
                element: (
                    <PrivateRoute allowedRoles={["admin"]}>
                        <ManageCoupons />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />, // Create a simple Unauthorized component
    },
]);