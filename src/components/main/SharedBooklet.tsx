import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseURL, get } from "../../Network";
import { Book } from "../../Interfaces";

export default function SharedBooklet(): React.ReactElement {
    const navigate = useNavigate()
    const params = useParams()

    const [book, setBook] = useState<Book | undefined>(undefined)
    const [index, setIndex] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [lastClicked, setLastClicked] = useState(-1)

    useEffect(() => {
        if (!params || !params.book) {
            console.log("oh no")
            navigate("/")
        }
        doStuff()
        async function doStuff() {
            const response = await get<Book>("main/shared-book", { id: params.book })
            console.log(response.data)
            if (response.success) {
                setBook(response.data)
            }
        }
    }, [location])

    const itemsPerPage = 12

    /** ========== JSX ========== **/
    if (book === undefined) { return <div>Loading...</div> }
    return <div className="max-w-screen-xl mx-auto pt-10 flex flex-col">
        <div className="flex flex-col lg:flex-row gap-10 mr-4 lg:mr-0">
            <div className="bg-amber-100 border-2 border-amber-200 rounded-md grid grid-cols-4 grid-rows-3 place-items-center w-full">
                {
                    // book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage)).map((idk, wordIndex) => <div key={wordIndex} onClick={() => { new Audio("/audio/" + (wordIndex === lastClicked ? idk.audioSlow : idk.audio)).play(); (wordIndex === lastClicked ? setLastClicked(-1) : setLastClicked(wordIndex)) }} className="hover:cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-100">
                    book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage)).map((idk, wordIndex) => <div key={wordIndex} onClick={() => { new Audio(baseURL + "public/audio/" + (wordIndex === lastClicked ? idk.audioSlow : idk.audio)).play(); (wordIndex === lastClicked ? setLastClicked(-1) : setLastClicked(wordIndex)) }} className="hover:cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-100">
                        <p className="my-10 lg:my-20 ">{idk.english}</p>
                    </div>)
                }
            </div>
            <div className="bg-amber-100 border-2 border-amber-200 rounded-md grid grid-cols-4 grid-rows-3 place-items-center w-full">
                {
                    book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage)).map((idk, wordIndex) => <div key={wordIndex} onClick={() => { new Audio("/audio/" + (wordIndex === lastClicked ? idk.audioSlow : idk.audio)).play(); (wordIndex === lastClicked ? setLastClicked(-1) : setLastClicked(wordIndex)) }} className="hover:cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-100">
                        <p className="my-10 lg:my-20 ">{hidden ? "" : idk.danish}</p>
                    </div>)
                }
            </div>

        </div>


        <div className="flex flex-row mt-8 pr-8 lg:pr-0">
            <p className="text-xl px-5 py-2">{index + 1}</p>
            <button onClick={() => setHidden(!hidden)} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2">{hidden ? "Show" : "Hide"}</button>
            <button onClick={() => index > 0 && setIndex(index - 1)} className="ml-auto mr-5 lg:mr-16">Back</button>
            <button onClick={() => index * itemsPerPage < book.words.length && setIndex(index + 1)} >Next</button>
        </div>
        <Link className="my-32 border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2 w-fit" to={"/add"}>Add words</Link>
    </div>
}