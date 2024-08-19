import { useParams } from "react-router-dom"
import useUser from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { Word } from "../../Interfaces"


export default function EditBooklet() {
    const params = useParams()
    const [user] = useUser()

    const [bookIndex, setBookIndex] = useState<number | undefined>(undefined)
    const [editingIndex, setEditingIndex] = useState(-1)
    const [english, setEnglish] = useState("")
    const [danish, setDanish] = useState("")

    useEffect(() => {
        if (!params || !params.book) {
            console.log("no book provided")
            // navigate("/")
        }
        console.log(user.books)
        console.log(params.book)
        const myIndex = user.books.findIndex(book => book.name === params.book)
        if (myIndex === -1) {
            console.log("index is -1")
            // navigate("/")
        }
        setBookIndex(myIndex)
    }, [location])

    const editCard = (term: Word) => <div key={term.english} className="bg-amber-100 border-2 border-amber-200 rounded-md p-2 relative flex flex-col w-96">
        <input value={english} onChange={e => setEnglish(e.target.value)} className="mb-2 bg-amber-100 border-black border-[1px] rounded-md pl-2 mr-20" />
        <input value={danish} onChange={e => setDanish(e.target.value)} className="bg-amber-100 border-black border-[1px] rounded-md pl-2 mr-20" />
        <img src="/save.png" className="absolute top-2 right-2 w-5" onClick={() => setEditingIndex(-1)} />
    </div>

    if (bookIndex === undefined) { return <div>Loading...</div> }
    return <div className="mt-32 ml-32">
        <h1 className="text-2xl">Edit: name</h1>
        <div className="flex flex-row flex-wrap mt-5 gap-5">
            {
                user.books[bookIndex].words.map((term, index) => index === editingIndex ? editCard(term) : <div key={index} className="bg-amber-100 border-2 border-amber-200 rounded-md p-[10px] pl-4 relative flex flex-col w-96">
                    <p className="mb-2">{term.english}</p>
                    <p>{term.danish}</p>
                    <img onClick={() => { setEnglish(term.english); setDanish(term.danish); setEditingIndex(index) }} src="/edit.svg" className="absolute top-2 right-2 w-5 hover:cursor-pointer" />
                </div>)
            }
        </div>
        <button className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2 w-fit mt-4 block">Add terms</button>
    </div>
}