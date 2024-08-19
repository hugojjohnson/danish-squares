import React, { useContext } from "react";
import { UserContext } from "../../Context";
import { useNavigate } from "react-router-dom";


export default function Profile(): React.ReactElement {
    const [user, setUser] = useContext(UserContext) // useContext is necessary, because you sign the user out.
    const navigate = useNavigate()
    
    async function signOut() {
        setUser(null)
        navigate("/")
    }

    /** ========== JSX ========== **/
    return <div className="mt-28 mx-auto max-w-screen-2xl w-full h-full flex flex-col">
        <h1 className="text-4xl my-5 capitalize">{user?.username}'s profile</h1>
        <div className="bg-white p-5 flex flex-row gap-5 items-center rounded-lg shadow-sm max-w-screen-sm">
            <h4 className="text-2xl w-24">Password</h4>
            <img className="w-10 h-10" src={"/misc/password.jpg"} alt="password icon" />
            <div className="h-10 border-[1px] border-gray-300"></div>
            <button className="mx-auto text-slate-500">Unlink password</button>
            <button className="mx-auto">Change password</button>
        </div>

        <button className="rounded-md bg-white border-gray-200 border-[2px] shadow-sm w-[40%] py-3 self-center mt-10" onClick={() => signOut()}>Sign Out</button>
    </div>
}