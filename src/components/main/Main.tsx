import axios from "axios";
import useUser from "../../hooks/useUser"
import { baseURL, get } from "../../Network"
import { useState } from "react";

export default function Main() {
    const [user, setUser] = useUser()
    const [loading, setLoading] = useState(false)

    async function generateAudio() {
        setLoading(true)
        const response = await axios.get<Blob>(baseURL + "main/generate-audio", {
            responseType: 'blob', // Explicitly set the response type to Blob
            params: { token: user.token }
        });

        const blob = new Blob([response.data], { type: 'audio/mp3' });
        const url: string = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'audio.mp3'; // Specify the filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url); // Clean up the object URL
        setLoading(false)
    }

    async function star(id: string) {
        const user2 = structuredClone(user)
        const myIndex = user.words.findIndex(word => word._id === id)
        if (myIndex === -1) {
            throw new Error("Word not found.")
        }
        const originalValue = user2.words[myIndex].starred
        user2.words[myIndex].starred = !originalValue
        setUser(user2)

        const response = await get("/star", { token: user.token, id: id })
        console.log(response.data)
        if (!response.success) {
            const user3 = structuredClone(user2)
            user3.words[myIndex].starred = false
            // Display an error
            setUser(user3)
        }
    }


    return <div className="">
        { loading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white/75 flex flex-col justify-center items-center gap-5">
            <h1 className="text-4xl">Loading...</h1>
            <p className="text-xl">This could take up to 30 seconds. Learning takes time!</p>
        </div>
        )}
        <h1 className="text-2xl">Your words</h1>
        <table className="table-fixed w-full">
            <thead className="text-left">
                <tr>
                    <th>Danish</th>
                    <th>Sentence</th>
                    <th>English</th>
                    <th>Sentence</th>
                    <th className="text-center">Learned</th>
                    <th className="text-center">Starred</th>
                </tr>
            </thead>
            <tbody>
            {
                user.words.map((word, index) => <tr key={index} className="border-b-2 border-b-gray-300 py-0">
                    {/* Silly HTML, I have to add the table padding here... */}
                    <td className="py-4">{word.dW}</td>
                    <td>{word.dS}</td>
                    <td>{word.eW}</td>
                    <td>{word.eS}</td>
                    <td><div className={`w-3 h-3 rounded-full ${word.learned ? "bg-green-500" : "bg-orange-300"} mx-auto`}></div></td>
                    <td>
                        { word.starred && <img onClick={() => star(word._id)} src="./star.png" className="w-8 mx-auto" /> }
                        { !word.starred && <div onClick={() => star(word._id)} className="w-1 h-1 bg-gray-400 rounded-full mx-auto"></div> }
                    </td>
                </tr>)
            }
            </tbody>
        </table>
        <button onClick={generateAudio} className="border-[1px] border-gray-400 rounded-md px-4 py-2">Generate audio</button>
    </div>
}