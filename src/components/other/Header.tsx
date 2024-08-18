import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Context";
// import Footer from "./Footer";

// TODO: Make the logo white for sign up and log in pages.

export default function Header(): React.ReactElement {
    const location = useLocation()
    const [user] = useContext(UserContext)


    /** ========== JSX ========== **/
    const extraPart = () => {
        switch (location.pathname) {
            case "/":
                return <Link to={"/add-booklet"} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2 w-fit block">Add booklets</Link>
            default:
                return <p>oh no</p>
        }
    }
    return (<>
        <div className={`${(!user && location.pathname === "/") ? "hidden" : ""} flex flex-row justify-between items-center p-3 w-full absolute z-10`}>
            <Link to="/">Home</Link>
            {
                user ? (<div className="flex flex-row gap-5 items-center justify-center">
                    { extraPart() }
                    <Link to="/profile" className="flex flex-row items-center gap-3">
                        {/* <p>{user.books[0].name}</p> */}
                        {/* <img className="h-14 w-14 p-2 rounded-full" src={user.pfp ? `/profiles/${user.pfp}.png` : "/profiles/default.png"} alt="profile pic" /> */}
                    </Link>
                </div>) : (<>
                    <div className="flex flex-row gap-3">
                        {/* <Link to="/sign-in" className="">
                            <p className="p-3 bg-black text-white rounded-md shadow-inner">Sign in</p>
                        </Link>
                        <Link to="/sign-up">
                            <p className="p-3 bg-slate-100 shadow-sm rounded-md">Sign up</p>
                        </Link> */}
                    </div>
                </>)
            }
        </div>
        <div className={`absolute w-full bg-slate-50 min-h-screen`}>
            <div className="mt-32 ml-32">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    </>);
}