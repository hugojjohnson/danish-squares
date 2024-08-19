import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Context";
// import Footer from "./Footer";

// TODO: Make the logo white for sign up and log in pages.

export default function Header(): React.ReactElement {
    const location = useLocation()
    const [user] = useContext(UserContext)


    /** ========== JSX ========== **/
    // const extraPart = () => {
    //     switch (location.pathname) {
    //         case "/":
    //             return <Link to={"/add-booklet"} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2 w-fit block">Add booklets</Link>
    //         default:
    //             return <p></p>
    //     }
    // }
    return (<>
        <div className={`${(!user && location.pathname === "/") ? "hidden" : ""} flex flex-row justify-around items-center p-3 w-full absolute z-10`}>
            <Link to="/">Home</Link>
            {location.pathname === "/" && <Link to={"/add-booklet"} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2 w-fit block">Add booklets</Link>}
        </div>
        <div className={`absolute w-full bg-slate-50 min-h-screen`}>
            <div className="mt-20 ml-5 lg:mt-32 lg:ml-32">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    </>);
}