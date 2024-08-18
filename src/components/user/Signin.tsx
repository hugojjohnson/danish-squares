import { UserContext } from "../../Context";
import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { get } from "../../Network";


export default function Signin() {
    const navigate = useNavigate();
    const [, setUser] = useContext(UserContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")

    interface responseType {
        user: {username: string};
        token: {value: string};
    }

    async function signIn() {
        if (username === "" || password === "") {
            setErrorText("Please fill in username and password.");
            return;
        }
        // if (username.includes("@")) {
        //     setErrorText("Username is invalid.")
        //     return;
        // }

        try {
            const salt = await saltify(username + password)
            const response = await get<responseType>("users/sign-in/username", { username: username, hash: salt })
            if (response.success && typeof response.data !== "string") {
                console.log(response)
                setUser({ username: response.data.user.username, token: response.data.token.value, books: [] });
                navigate('/');
                return;
            }
            setErrorText(typeof response.data === "string" ? response.data : "An unknown error occurred.")
        } catch (err) {
            console.error(err)
            setErrorText("An error occurred while logging in.")
        }
    }

    // encrypt the password before sending it
    // from https://stackoverflow.com/questions/18338890
    async function saltify(message: string) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    }

    return (<div className="w-full h-screen flex flex-col mt-20 fixed top-0 left-0">
        <div className="mx-auto max-w-screen-sm w-full flex flex-col gap-2 justify-center pt-10">
            <p>Username</p>
            <input className=" bg-slate-100 rounded-sm shadow-inner p-3 h-full w-full" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />

            <p>Password</p>
            <input className=" bg-slate-100 rounded-sm shadow-inner p-3 h-full w-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />


            <button className="rounded-md border-gray-200 border-[2px] shadow-sm w-[60%] py-3 self-center mt-6" onClick={() => signIn()}>Sign In</button>

            <Link to="/sign-up" className=" self-center text-blue-900 cursor-pointer">Sign Up</Link>
            <p className=" self-center text-blue-900 cursor-pointer">Forgot password</p>
            <p className=" self-center text-blue-900 cursor-pointer">Home</p>

            <p className="mt-10 self-center">{errorText}</p>
        </div>
    </div>)
}