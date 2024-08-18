import React, { useContext } from "react";
import { UserContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { post } from "../../Network";


export default function Profile(): React.ReactElement {
    const [user, setUser] = useContext(UserContext) // useContext is necessary, because you sign the user out.
    const navigate = useNavigate()
    // You're gonna have to link this up with the back end... sorry!
    const profiles = ["default", "astronaut", "cactus", "cameleon", "cow", "demon", "dragon", "lollipop", "polar"]

    /** ========== Functions ========== **/
    async function changePFP(new_pfp_value: string) {
        interface requestType {
            quote: string
        }
        try {
            post<requestType>("users/change-pfp", { token: user?.token }, { new_pfp: new_pfp_value })
            if (user) {
                setUser({ ...user, pfp: new_pfp_value });
            }
        } catch (err) {
            console.error(err)
            // setErrorMessage(err.message || err)
        }
    }
    async function signOut() {
        googleLogout();
        // TODO: Mark token as inactive in database
        setUser(null)
        navigate("/")
    }

    /** ========== JSX ========== **/
    return <div className="mt-28 mx-auto max-w-screen-2xl w-full h-full flex flex-col">
        <h1 className="text-4xl my-5 capitalize">{user?.username}'s profile</h1>
        <h2 className="text-2xl my-5">Change profile picture</h2>
        <div className="flex flex-row gap-5">
            {
                profiles.map(profile => <img key={profile} className={`w-20 h-20 rounded-full shadow-md hover:cursor-pointer ${user?.pfp === profile ? "shadow-[0_0px_10px_4px_rgba(0,0,0,0.3)]" : ""}`} src={`/profiles/${profile}.png`} alt={profile} onClick={() => changePFP(profile)} />)
            }
        </div>

        <h2 className="text-2xl mb-5 mt-10">Sign In Methods</h2>
        <div className="bg-white p-5 mb-10 flex flex-row gap-5 items-center rounded-lg shadow-sm max-w-screen-sm">
            <h4 className="text-2xl w-24">Google</h4>
            <img className="w-10 h-10" src={"/misc/google.jpg"} alt="google icon" />
            <div className="h-10 border-[1px] border-gray-300"></div>
            <button className="mx-auto">Unlink account</button>
            <button className="mx-auto">Change account</button>
        </div>

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