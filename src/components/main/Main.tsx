import axios from "axios";
import useUser from "../../hooks/useUser"
import { baseURL } from "../../Network"

export default function Main() {
    const [user] = useUser()

    async function generateAudio() {
        const response = await axios.get<Blob>(baseURL + "main/generate-audio", {
            responseType: 'blob', // Explicitly set the response type to Blob
            params: { token: user.token }
        });

        const blob = new Blob([response.data], { type: 'audio/mp3' });
        const url: string = window.URL.createObjectURL(blob);

        window.open(url);

        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    }

    return <div className="">
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
                    <td><img src="/star.png" className="w-10 mx-auto" /></td>
                </tr>)
            }
            </tbody>
        </table>
        <button onClick={generateAudio} className="border-[1px] border-gray-400 rounded-md px-4 py-2">Generate audio</button>
    </div>
}