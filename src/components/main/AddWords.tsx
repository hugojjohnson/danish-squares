import { useState } from "react"
import useUser from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"


export default function AddWords() {
    const [user, setUser] = useUser()
    const navigate = useNavigate()

    const [csvData, setCsvData] = useState("")

    const [english, setEnglish] = useState("")
    const [danish, setDanish] = useState("")
    const [audio, setAudio] = useState("")

    function addWord() {
        return
        // const user2 = structuredClone(user)
        // user2.words.push({
        //     english: english,
        //     danish: danish,
        //     audio: audio,
        //     audioSlow: au
        // })
        // setUser(user2)
        // navigate("/")
    }

    function addCsv() {
        const rows = csvData.split("\n")
        const user2 = structuredClone(user)
        for (const myRow of rows) {
            const myArgs = myRow.split(",")
            user2.words.push({
                english: myArgs[0],
                danish: myArgs[1],
                audio: myArgs[4].substring(8, myArgs[4].length - 2),
                audioSlow: myArgs[3].substring(8, myArgs[3].length - 2),
            })
        }
        setUser(user2)
        navigate("/")
    }

    return <div className="max-w-screen-lg mx-auto pt-10 flex flex-col">
        <h1 className="text-4xl">Add words</h1>
        <textarea className="border-[1px] border-gray-300 rounded-md" value={csvData} onChange={e => setCsvData(e.target.value)}></textarea>
        <button onClick={addCsv} className="mt-4">Add</button>
        {/* <p className="mt-16">English</p>
        <input value={english} onChange={e => setEnglish(e.target.value)} className="border-[1px] border-gray-300 rounded-md" />

        <p className="mt-4">Danish</p>
        <input value={danish} onChange={e => setDanish(e.target.value)} className="border-[1px] border-gray-300 rounded-md" />

        <p className="mt-4">Audio file name</p>
        <input value={audio} onChange={e => setAudio(e.target.value)} className="border-[1px] border-gray-300 rounded-md" />

        <button onClick={addWord} className="mt-4">Add</button> */}
    </div>
}