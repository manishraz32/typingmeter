import React, {useState, useEffect} from 'react'
import { FaEquals } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useFrontPageData } from "../context/frontPageData";
import { useScoreData } from "../context/scoreData";
import {useNavigate} from 'react-router-dom';

const Result = () => {
    const navigate = useNavigate();

    const [frontPageData, setFrontPageData] = useFrontPageData();
    const [scoreData, setScoreData] = useScoreData();
    
    const [speed, setSpeed] = useState(frontPageData.time > 0 ? Math.floor(Number(scoreData.typedWord) / Number(frontPageData.time)): 0);
    const [netSpeed, setNetSpeed] = useState(speed - Math.floor(Number(scoreData.typo) / Number(frontPageData.time)));
    
    const handleOnClick = () => {
        navigate("/");
    }

    useEffect(() => {
        if (frontPageData.time != 0) {
            setSpeed(Math.floor(Number(scoreData.typedWord) / Number(frontPageData.time)));
        }
    }, [])

    return (
        <div className="w-[50%] h-[70%] bg-[#ccffff] flex flex-col items-center shadow-lg shadow-[#1794AD]">
            <div className="text-container text-[#1794AD] flex flex-col justify-center items-center my-4 mt-20">
                <h1 className="text-4xl italic font-serif font-bold my-4">Your Test Score</h1>
            </div>
            
            <div className=" w-[60%] flex justify-around">
                <div className="w-[150px] h-[150px] flex flex-col items-center justify-center">
                    <div className="w-[100px] h-[100px] rounded-full border-4 border-[#1794AD] bg-slate-100 flex flex-col justify-center items-center ">
                        <h1 className="text-3xl font-serif font-bold text-[#1794AD]">{isNaN(speed) ? "0" : speed}</h1>
                        <h1 className="text-lg font-serif font-bold text-[#1794AD]">WPM</h1>
                    </div>
                    <div>
                        <h1 className="text-lg font-serif font-bold text-[#1794AD]">Typing Speed</h1>
                    </div>
                </div>
                <div className="w-[10px] h-[150px] flex flex-col items-center justify-center">
                    <ImCross className="text-xl font-serif font-bold text-[#1794AD]" />
                </div>
                <div className="w-[150px] h-[150px] flex flex-col items-center justify-center">
                    <div className="w-[100px] h-[100px] rounded-full border-4 border-[#1794AD] bg-slate-100 flex flex-col justify-center items-center ">
                        <h1 className="text-3xl font-serif font-bold text-[#1794AD]">{scoreData.typo}</h1>
                        <h1 className="text-lg font-serif font-bold text-[#1794AD]">Typos</h1>
                    </div>
                    <div>
                        <h1 className="text-lg font-serif font-bold text-[#1794AD]">Accuracy</h1>
                    </div>
                </div>
                <div className="w-[10px] h-[150px] flex flex-col items-center justify-center">
                    <FaEquals className= "text-xl font-serif font-bold text-[#1794AD]"/>
                </div>
                <div className="w-[150px] h-[150px] flex flex-col items-center justify-center">
                    <div className="w-[100px] h-[100px] rounded-full border-4 border-[#1794AD] bg-slate-100 flex flex-col justify-center items-center ">
                        <h1 className="text-3xl font-serif font-bold text-[#1794AD]">{isNaN(netSpeed) ? 0 : netSpeed}</h1>
                        <h1 className="text-lg font-serif font-bold text-[#1794AD]">wpm</h1>
                    </div>
                    <div>
                        <h1 className="text-lg font-serif font-bold text-[#1794AD]">NetSpeed</h1>
                    </div>
                </div>
            </div>

            <div className="w-[100%] flex justify-center items-center ">
                <div
                    onClick={() => handleOnClick()}
                    className="w-[200px] h-[50px] flex justify-center rounded-full items-center bg-green-500  mt-5 cursor-pointer hover:bg-green-600 "
                >
                    <h1 className="text-[16px] text-white font-serif"
                    >
                        RETAKE TEST
                    </h1>
                </div>
            </div>

        </div>
    )
}

export default Result;