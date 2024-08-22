import { useState } from "react"
import useUser from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { post } from "../../Network"
import { Book } from "../../Interfaces"


export default function AddBooklet() {
    const [user, setUser] = useUser()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [terms, setTerms] = useState<{ english: string; danish: string; }[]>([{ english: "", danish: "" }, { english: "", danish: "" }, { english: "", danish: "" }])
    const [syncing, setSyncing] = useState(false)

    const addBooklet = async () => {
        if (name.length === 0) {
            setErrorMessage("Name can't be blank.")
            return
        }
        if (user.books.filter(idk => idk.name === name).length > 0) {
            setErrorMessage("Name already taken.")
            return
        }
        for (const term of terms) {
            if (term.danish.length === 0 || term.english.length === 0) {
                setErrorMessage("All fields must be filled in.")
                return
            }
        }
        setSyncing(true)
        const res = await post<Book>("main/add-booklet", { token: user.token }, { booklet: { name: name, words: terms  }})
        setSyncing(false)
        if (res.success) {
            const user2 = structuredClone(user)
            user2.books.push({
                name: res.data.name,
                words: res.data.words,
            })
            setUser(user2)
            navigate("/")
        }
        // const user2 = structuredClone(user)
        // user2.books.push({
        //     name: name,
        //     words: []
        // })
        // setUser(user2)
        // navigate("/")
    }

    /** ========== JSX ========== **/
    const syncingHTML = <div className="fixed top-0 left-0 w-full h-screen bg-white/80 z-20 flex flex-col justify-center items-center gap-5">
        <h1 className="text-xl">Loading...</h1>
        <p>The audio is being generated. This could take up to a minute.</p>
        <p>If nothing's happening, click <span className="text-blue-700 hover:cursor-pointer" onClick={() => navigate("/")}>here</span>.</p>
        <img src="./loading.svg" alt="loading" className=" w-44 mb-20" />
    </div>

    return <div className="flex flex-col gap-5">
        { syncing && syncingHTML }
        <h1 className="text-2xl">Add a booklet</h1>
        <div>
            <p>Name</p>
            <input value={name} onChange={e => setName(e.target.value)} className="border-2 border-gray-300 rounded-md w-fit" />
        </div>
        {
            terms.map((term, index) => <div key={index} className="bg-amber-100 border-2 border-amber-200 rounded-md p-[10px] pl-4 relative z-10 flex flex-col mr-5 lg:mr-0 lg:w-96">
                <div className="flex flex-row gap-3">
                    <p>English</p>
                    <input value={term.english} onChange={e => { const c = structuredClone(terms); c[index].english = e.target.value; setTerms(c) }} className="mb-2 bg-amber-100 rounded-md border-black border-[1px] w-full" />
                </div>
                <div className="flex flex-row gap-3">
                    <p>Danish</p>
                    <input value={term.danish} onChange={e => { const c = structuredClone(terms); c[index].danish = e.target.value; setTerms(c) }} className="bg-amber-100 rounded-md border-black border-[1px] w-full" />
                </div>
            </div>
            )
        }
        <div className="flex flex-row gap-3">
            <button onClick={() => { const c = structuredClone(terms); c.push({english: "", danish: ""}); setTerms(c) }} className="border-2 border-gray-300 w-8 h-8 rounded-md">+</button>
            <button onClick={() => { const c = structuredClone(terms); c.pop(); setTerms(c) }} className="border-2 border-gray-300 w-8 h-8 rounded-md">-</button>
        </div>
        <button onClick={async () => await addBooklet()} className="border-2 border-gray-300 rounded-md bg-gray-100 px-3 py-2 w-fit">Create booklet</button>
        <p>{ errorMessage }</p>
    </div>
}