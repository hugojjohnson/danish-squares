import { useState } from "react"
import useUser from "../../hooks/useUser"
import { post } from "../../Network"
import { Word } from "../../Interfaces"

export default function AddWords() {
    const [user, setUser] = useUser()

    const [dW, setDW] = useState("")
    const [dS, setDS] = useState("")
    const [eW, setEW] = useState("")
    const [eS, setES] = useState("")


    async function addWords() {
        const response = await post<Word[]>("/main/add-words", { token: user.token }, { dW: dW, dS: dS, eW: eW, eS: eS })
        console.log(response.data)
        if (response.success) {
            setUser({ ...user, words: user.words.concat(response.data) })
        }
    }

    return <div>
        <h1 className="text-2xl pb-10">Add words</h1>
        <div className="flex flex-row gap-3">
            <div>
                <p>Danish</p>
                <textarea value={dW} onChange={e => setDW(e.target.value)} className="border-[1px] border-gray-300 rounded-md min-h-96" />
            </div>
            <div>
                <p>Danish sentence</p>
                <textarea value={dS} onChange={e => setDS(e.target.value)} className="border-[1px] border-gray-300 rounded-md min-h-96" />
            </div>
            <div>
                <p>English</p>
                <textarea value={eW} onChange={e => setEW(e.target.value)} className="border-[1px] border-gray-300 rounded-md min-h-96" />
            </div>
            <div>
                <p>English sentence</p>
                <textarea value={eS} onChange={e => setES(e.target.value)} className="border-[1px] border-gray-300 rounded-md min-h-96" />
            </div>
        </div>

        <button onClick={addWords} className="bg-white border-[1px] border-gray-300 rounded-md px-4 py-2 mt-10">Add</button>
    </div>
}