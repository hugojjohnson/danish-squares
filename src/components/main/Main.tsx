import { Link, useNavigate } from "react-router-dom"
import useUser from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { get } from "../../Network"

export default function Main() {
    const [user] = useUser()
    const navigate = useNavigate()

    const [publicBooklets, setPublicBooklets] = useState<{ _id: string, owner: string, name: string, length: number }[] | undefined>(undefined)

    useEffect(() => {
        async function doStuff() {
            const response = await get<{ _id: string, owner: string, name: string, length: number }[]>("/main/public-booklets", { token: user.token, username: user.username })
            if (response.success) {
                setPublicBooklets(response.data)
            }
        }
        doStuff()
    }, [])

    return <div className="">
        <h1 className="text-2xl">Your booklets</h1>
        <div className="flex flex-row flex-wrap mt-5 gap-5">
        {
                user.books.map((book, index) => <div key={index} className="bg-amber-100 border-2 border-amber-200 rounded-md p-2 pl-4 relative w-64 min-h-20">
                    <h1 className="text-xl hover:cursor-pointer mr-10 text-wrap" onClick={() => navigate(`/book/${encodeURI(book.name)}`)}>{book.name}</h1>
                    <p className="mt-1">{book.words.length} words</p>
                    {/* <img src="/edit.svg" onClick={() => navigate("/book/edit/" + encodeURI(book.name))} className="absolute top-2 right-2 w-5 hover:cursor-pointer" /> */}
                </div>)
        }
        </div>
        <h1 className="text-2xl mt-5 lg:mt-20">Public booklets</h1>
        <div className="flex flex-row flex-wrap mt-5 gap-5">
        {
            !publicBooklets ? <img src="./loading.svg" alt="loading" className="w-20" /> : publicBooklets.length === 0 ? <p>There are no public booklets yet.</p> : publicBooklets.map((publicBooklet, index) => <Link key={index} to={`/shared/${encodeURI(publicBooklet._id)}`} className="bg-amber-100 border-2 border-amber-200 rounded-md p-2 pl-4 relative w-64 min-h-20">
                <h1 className="text-xl">{publicBooklet.name}</h1>
                <p className="text-sm text-gray-600 mt-1 mb-4">{publicBooklet.owner}</p>
                <p className="mt-1">{publicBooklet.length} words</p>
                {/* <button onClick={() => navigate("/book/edit/coolness")}>
                    <img src="/edit.svg" className="absolute top-2 right-2 w-5" />
                </button> */}
            </Link>)
        }
        </div>
    </div>
}