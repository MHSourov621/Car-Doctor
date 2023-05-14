import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CheckOut from "../pages/CheckOut/CheckOut";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRouts from "./PrivateRouts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/checkout/:id",
                element: <PrivateRouts><CheckOut></CheckOut></PrivateRouts>,
                loader: ({params}) => fetch(`https://car-doctor-server-mhsourov621.vercel.app/services/${params.id}`)
            },
            {
                path: "/bookings",
                element: <PrivateRouts><Bookings></Bookings></PrivateRouts>
            }
        ]
    },
]);

export default router