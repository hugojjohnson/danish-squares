import React from "react";
import { Link } from "react-router-dom";


export default function Welcome(): React.ReactElement {
    return <div className="w-full min-h-screen mb-40">
        <div className="mx-auto max-w-screen-3xl px-32 h-full flex flex-col gap-5 items-center text-center">
            <h1 className="text-black text-6xl mt-[12%]">Learning is hard</h1>
            <div>
                <h3 className=" text-3xl mt-5 mb-2">..the first time.</h3>
            </div>
            <p className="">It's a little easier after the third time. And after the fifth... And the tenth time? No sweat.</p>

            <div className="flex flex-row gap-5 mt-10">
                <Link to="/sign-in" className="p-3 bg-black text-white rounded-md shadow-inner">Sign In</Link>
                <Link to="/sign-up" className="p-3 bg-slate-100 shadow-sm rounded-md">Sign Up</Link>
            </div>

            {/* <div className="text-left self-start ml-24">
                <h2 className="text-2xl mb-4">Picture this</h2>
                <p className="w-[33%]">You're in class, and you're stuck on a question. For whatever reason it's just not vibing. You've got the answers next to the question, and still it doesn't make sense. You ask a friend for help, and together you figure out the answer.</p>
                <p className="w-[33%]"></p>
                <p className="w-[33%]">This is the struggle that I see time and time again with my students. They will stick with a question until they get the right answer, then move on to the next one.</p>
            </div> */}

            <div className="flex flex-row gap-16 mt-20 mb-32">
                <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3">
                    <img className="w-20" src={"/misc/marking.png"} alt="gears" />
                    <h4>Generated questions</h4>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3">
                    <img className="w-20" src={"/misc/lightbulb.png"} alt="gears" />
                    <h4>Worked solutions</h4>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3">
                    <img className="w-20" src={"/misc/mastery.png"} alt="gears" />
                    <h4>Master key concepts</h4>
                </div>
            </div>
            
            <div className="self-start text-left flex flex-row gap-5 items-center mb-10">
                <img className="w-24 h-fit" src={"/misc/marking.png"} alt="robot" />
                <div className="">
                    <h2 className="text-2xl mb-4">Practice questions differently each time</h2>
                    <p className="text-lg w-[80%]">Every time the questions are slightly different, letting you practice them until you never get them wrong.</p>
                </div>
            </div>

            <div className="self-end text-right flex flex-row gap-5 items-center mb-10">
                <div className="">
                    <h2 className="text-2xl mb-4">Worked solutions</h2>
                    <p className="text-lg w-[600px]">Don't waste time finding out how you should answer the question - get the answers in the same place.</p>
                </div>
                <img className="w-24 h-fit" src={"/misc/lightbulb.png"} alt="lightbulb" />
            </div>

            <div className="self-start text-left flex flex-row gap-5 items-center mb-10">
                <img className="w-24 h-fit" src={"/misc/mastery.png"} alt="ninja" />
                <div className="">
                    <h2 className="text-2xl mb-4">Master key concepts</h2>
                    <p className="text-lg w-[80%]">Go through each formula, concept and syllabus point in order, or in your own direction.</p>
                </div>
            </div>

            <div className="flex flex-row gap-5">
                <Link to="/sign-in" className="p-3 bg-black text-white rounded-md shadow-inner">Sign In</Link>
                <Link to="/sign-up" className="p-3 bg-slate-100 shadow-sm rounded-md">Sign Up</Link>
            </div>
        </div>
    </div>
}