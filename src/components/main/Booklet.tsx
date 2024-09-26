import React, { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL, get, post } from "../../Network";
import { Book } from "../../Interfaces";
import Crunker from "crunker";
import axios from "axios";

export default function Booklet(): React.ReactElement {

    const navigate = useNavigate()
    const params = useParams()
    const [user] = useUser()

    const [book, setBook] = useState<Book | undefined>(undefined)
    const [index, setIndex] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [lastClicked, setLastClicked] = useState(-1)
    const [, setSpokenWord] = useState<{ english: string, danish: string, audio: string, audioSlow: string } | undefined | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Use useRef to store the interval ID

    const itemsPerPage = 12

    useEffect(() => {
        if (!params || !params.book) {
            navigate("/")
        }

        const myIndex = user.books.findIndex(book => book.name === params.book)
        if (myIndex !== -1) {
            setBook(user.books[myIndex])
            return
        }

        doStuff()
        async function doStuff() {
            const response = await get<Book>("main/shared-book", { id: params.book })
            if (response.success) {
                setBook(response.data)
            } else {
                navigate("/")
            }
        }
    }, [location])

    useEffect(() => {
        return () => {
            stopPractice();
        };
    }, []);

    // ========================

    const speakMessage = (text: string) => {
        const message = new SpeechSynthesisUtterance();
        message.text = text;
        message.rate = 0.5;
        const speechSynthesis = window.speechSynthesis;
        speechSynthesis.speak(message);
    }

    const practiceFunc = (init = false) => {
        if (book === undefined) {
            return
        }

        const idk = book.words[Math.floor((Math.random() * book.words.length))]
        if (init) {
            setSpokenWord(undefined)
            return
        }
        setSpokenWord(prevState => {
            if (prevState === null) {
                return null
            } else if (prevState === undefined) {
                speakMessage(idk.english)
                return idk
            } else {
                const audio = new Audio(baseURL + "public/audio/" + prevState.audio);
                audio.play(); // Play the audio file
                return undefined
            }
        });
    };

    const startPractice = () => {
        // Call the function immediately
        practiceFunc(true);
        // Set up an interval to call practiceFunc every 10 seconds
        intervalRef.current = setInterval(practiceFunc, 5000);
    };

    const stopPractice = () => {
        // Clear the interval if it exists
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const getAudio = () => {
        // let crunker = new Crunker()
        // crunker.fetchAudio((baseURL + "public/audio/" + book?.words[0].audio), (baseURL + "public/audio/" + book?.words[1].audio))
        //     .then((buffers) => {
        //         // => [AudioBuffer, AudioBuffer]
        //         return crunker.concatAudio(buffers)
        //     })
        //     .then((merged) => {
        //         // => AudioBuffer
        //         return crunker.export(merged, 'audio/mp3');
        //     })
        //     .then((output) => {
        //         // => {blob, element, url}
        //         crunker.download(output.blob);
        //         document.body.append(output.element);
        //         console.log(output.url);
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //         // => Error Message
        //     });

        // crunker.notSupported(() => {
        //     console.error("Browser does not support Crunker.")
        //     // Handle no browser support
        // });
        async function doStuff() {
            if (book === undefined) { return }
            // const response = await post<Blob>("main/generate-audio", { token: user.token }, { words: book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage)) })
            // console.log(response)
            // if (!response.success) { return }

            // const blob = response.data.blob()
            // const url = window.URL.createObjectURL(blob)
            // window.open(url)
            // setTimeout(() => window.URL.revokeObjectURL(url), 1000) // Revoke object URL to release memory after some time (optional but good practice)

            const response = await axios.post<Blob>(baseURL + "main/generate-audio", {
                words: book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage))
            }, {
                responseType: 'blob', // Explicitly set the response type to Blob
                params: { token: user.token }
            });

            const blob = new Blob([response.data], { type: 'audio/mp3' });
            const url: string = window.URL.createObjectURL(blob);

            window.open(url);

            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        }
        doStuff()
    }

    /** ========== JSX ========== **/
    if (book === undefined) { return <div>Loading...</div>}
    return <div className="max-w-screen-xl mx-auto pt-10 flex flex-col">
        <div className="flex flex-row gap-10">
            <div className="bg-amber-100 border-2 border-amber-200 rounded-md grid grid-cols-4 grid-rows-3 place-items-center w-full">
                {
                    // book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage)).map((idk, wordIndex) => <div key={wordIndex} onClick={() => { new Audio("/audio/" + (wordIndex === lastClicked ? idk.audioSlow : idk.audio)).play(); (wordIndex === lastClicked ? setLastClicked(-1) : setLastClicked(wordIndex)) }} className="hover:cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-100">
                    book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage)).map((idk, wordIndex) => <div key={wordIndex} onClick={() => { new Audio(baseURL + "public/audio/" + (wordIndex === lastClicked ? idk.audioSlow : idk.audio)).play(); (wordIndex === lastClicked ? setLastClicked(-1) : setLastClicked(wordIndex)) }} className="hover:cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-100">
                        <p className="my-20 ">{idk.english}</p>
                    </div>)
                }
            </div>
            <div className="bg-amber-100 border-2 border-amber-200 rounded-md grid grid-cols-4 grid-rows-3 place-items-center w-full">
                {
                    book.words.slice(index * itemsPerPage, Math.min(book.words.length, index * itemsPerPage + itemsPerPage)).map((idk, wordIndex) => <div key={wordIndex} onClick={() => { new Audio(baseURL + "public/audio/" + (wordIndex === lastClicked ? idk.audioSlow : idk.audio)).play(); (wordIndex === lastClicked ? setLastClicked(-1) : setLastClicked(wordIndex)) }} className="hover:cursor-pointer w-full h-full flex items-center justify-center hover:bg-yellow-100">
                        <p className="my-20 ">{hidden ? "" : idk.danish}</p>
                    </div>)
                }
            </div>

        </div>


        <div className="flex flex-row mt-8">
            <p className="text-xl px-5 py-2">{index + 1}</p>
            <button onClick={() => setHidden(!hidden)} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2">{hidden ? "Show" : "Hide"}</button>
            <button onClick={() => index > 0 && setIndex(index - 1)} className="ml-auto mr-16">Back</button>
            <button onClick={() => index * itemsPerPage < book.words.length && setIndex(index + 1)} >Next</button>
        </div>

        {/* <Link className="mt-32 border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2 w-fit" to={"/add"}>Add words</Link> */}


        <button onClick={getAudio} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2">Get Audio</button>
        {/* <div className="flex flex-row mt-8 pr-8 lg:pr-0 gap-5">
            <button onClick={startPractice} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2">Start</button>
            <button onClick={stopPractice} className="border-2 border-gray-300 rounded-md bg-gray-100 px-5 py-2">Stop</button>
        </div> */}
    </div>
}