import { useState } from "react"
import useUser from "../../hooks/useUser"
import { post } from "../../Network"
import { Word } from "../../Interfaces"

export default function AddWords() {
    const [user, setUser] = useUser()
    const [words, setWords] = useState("")
    const [errorText, setErrorText] = useState("")
    const [isAnimating, setIsAnimating] = useState(false)

    const splitIntoFour = (arr: string[]) => arr.reduce((acc: string[][], cur: string, idx: number) => {
        acc[idx % 4].push(cur);
        return acc;
    }, [[], [], [], []]);



    async function addWords() {
        setErrorText("Sending request...")
        const myWords = words.split(/\\|\n/)
        console.log(myWords)
        if (myWords.length % 4 !== 0) {
            console.log(words.split(/\\\|\n/))
            setErrorText("Error: Length is not correct")
            return
        }
        const myList = splitIntoFour(myWords)
        console.log(myList)
        const response = await post<Word[]>("/main/add-words", { token: user.token }, { dW: myList[2].join("\n"), dS: myList[3].join("\n"), eW: myList[0].join("\n"), eS: myList[1].join("\n") })
        console.log(response.data)
        if (response.success) {
            setUser({ ...user, words: user.words.concat(response.data) })
            setWords("")
            setIsAnimating(true)
            setErrorText("")
            setTimeout(() => setIsAnimating(false), 1500)
        } else {
            setErrorText("Error: " + response.data)
        }
    }

    return <div className="flex flex-col">
        <h1 className="text-2xl pb-10">Add words</h1>
        <div className="flex flex-row gap-3">
            <div className="w-full">
                <p>Enter it in this format:english\sentence\danish\danish_sentence</p>
                <textarea value={words} onChange={e => setWords(e.target.value)} className="border-[1px] border-gray-300 rounded-md min-h-96 w-full" />
            </div>
        </div>

        <button onClick={addWords} className="bg-white border-[1px] border-gray-300 rounded-md px-4 py-2 mt-10">Add</button>
        
        <p className="mt-2 text-xl">{errorText}</p>

        <img src="/tickSymbol.png" className={`fixed bottom-12 right-12 w-20 h-20 ${isAnimating ? "animate-tickRotateFade" : "hidden"}`} />
    </div>
}