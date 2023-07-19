import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillClockCircle, AiOutlineDown } from "react-icons/ai";
import { ImFileText } from "react-icons/im";
import { useFrontPageData } from "../context/frontPageData";
import "../styles/AppStyle.css";

const FrontPage = () => {

    const navigate = useNavigate();
    const [frontPageData, setFrontPageData] = useFrontPageData();


    const [isTimeClicked, setIsTimeClicked] = useState(false);
    const [timer, setTimer] = useState(1);
    const [textSize, setTextSize] = useState("Easy");
    const [isTextClicked, setIsTextClicked] = useState(false);

    const toggleTimeClicked = () => {
        setIsTextClicked(false);
        setIsTimeClicked(!isTimeClicked);
    }

    const setTypingTime = (e) => {
        const text = e.target.textContent.trim();
        const newTime = Number(text.charAt(0));
        setTimer(newTime);
        toggleTimeClicked();
    }

    const toggleTextContainer = () => {
        setIsTextClicked(!isTextClicked);
    }
    const setTypingLength = (e) => {
        const text = e.target.textContent.trim();
        const lengthName = text.split(" ")[0].toLowerCase();
        console.log(lengthName);
        setTextSize(lengthName);
        toggleTextContainer();
    }

    const setTimeAndTextLen = (e) => {
        setFrontPageData({ ...frontPageData, time: timer, textLen: textSize });
        navigate("/editor");
    }

    return (
        <>
            <div className="w-[50%] h-[70%] bg-[#ccffff] shadow-lg shadow-[#1794AD]">

                <div className="text-container text-[#1794AD] flex flex-col justify-center items-center my-4">
                    <h1 className="text-4xl italic font-serif font-bold my-4">Check your Typing skills in a minute</h1>
                    <p className="text-2xl italic font-serif font-medium">Type away to join 150+ million test takers!</p>
                </div>

                <div className="w-[100%] flex flex-col justify-center items-center mt-24 gap-5">
                    <div className=" flex flex-wrap items-center justify-between">
                        <AiFillClockCircle className="h-[35px] w-[50px] mr-4 text-[#1794AD]" />
                        <div className="w-[300px] bg-slate-50 h-[50px] flex justify-between items-center rounded-full">
                            <div className="text-[23px] ml-3 font-semibold text-gray-500 font-serif">{timer} minute Test</div>
                            <AiOutlineDown className="mr-3 text-xl cursor-pointer font-semibold text-gray-500"
                                onClick={toggleTimeClicked}
                            />
                        </div>
                    </div>

                    <div className=" flex flex-wrap items-center justify-between relative ">
                        <ImFileText className="h-[30px] w-[45px] mr-4 text-[#1794AD]" />
                        <div className="w-[300px] bg-slate-50 h-[50px] flex justify-between items-center rounded-full">
                            <div className="text-[23px] ml-3 font-semibold text-gray-500 font-serif">{textSize} Text</div>
                            <AiOutlineDown className="mr-3 text-xl cursor-pointer font-semibold text-gray-500"
                                onClick={toggleTextContainer}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[100%] flex justify-center items-center ">
                    <div
                        onClick={() => setTimeAndTextLen()}
                        className="w-[200px] h-[50px] flex justify-center rounded-full items-center bg-green-500  mt-5 cursor-pointer hover:bg-green-600 "
                    >
                        <h1 className="text-[16px] text-white font-serif"
                        >
                            START TEST
                        </h1>
                    </div>
                </div>
                {
                    isTimeClicked &&
                    <div className="w-[300px] bg-slate-50 relative left-[268px] bottom-[139px] rounded-lg border-[1px] border-black z-10">
                        <div className=" h-[40px] w-[100%] hover:bg-[#1794AD] flex items-center rounded-t-[5px] hover:text-white hover:cursor-pointer"
                            onClick={(e) => setTypingTime(e)}
                        >
                            <h1 className="text-[20px] w-[100%] h-[100%] m-2 text-gray-500 font-serif hover:text-white flex items-center">1 minute Test</h1>
                        </div>
                        <div className=" h-[40px] w-[100%] hover:bg-[#1794AD] flex items-center hover:cursor-pointer"
                            onClick={(e) => setTypingTime(e)}
                        >
                            <h1 className="text-[20px] w-[100%] h-[100%] m-2 text-gray-500 font-serif hover:text-white flex items-center">2 minutes Test</h1>
                        </div>
                        <div className=" h-[40px] w-[100%] hover:bg-[#1794AD] flex items-center rounded-b-[5px] hover:cursor-pointer"
                            onClick={(e) => setTypingTime(e)}
                        >
                            <h1 className="text-[20px] w-[100%] h-[100%] m-2 text-gray-500 font-serif hover:text-white flex items-center">3 minutes Test</h1>
                        </div>
                    </div>

                }

                {
                    isTextClicked &&
                    <div className="w-[300px] bg-slate-50 relative left-[268px] bottom-[78px] rounded-lg border-[1px] border-black z-10">
                            <div className=" h-[40px] w-[100%] hover:bg-[#1794AD] flex items-center rounded-t-[5px] hover:text-white hover:cursor-pointer"
                            onClick={(e) => setTypingLength(e)}
                        >
                            <h1 className="text-[20px] w-[100%] h-[100%] m-2 text-gray-500 font-serif hover:text-white flex items-center">Easy Text</h1>
                        </div>
                        <div className=" h-[40px] w-[100%] hover:bg-[#1794AD] flex items-center hover:cursor-pointer"
                            onClick={(e) => setTypingLength(e)}
                        >
                            <h1 className="text-[20px] w-[100%] h-[100%] m-2 text-gray-500 font-serif hover:text-white flex items-center">Medium Text</h1>
                        </div>
                        <div className=" h-[40px] w-[100%] hover:bg-[#1794AD] flex items-center rounded-b-[5px] hover:cursor-pointer"
                            onClick={(e) => setTypingLength(e)}
                        >
                            <h1 className="text-[20px] w-[100%] h-[100%] m-2 text-gray-500 font-serif hover:text-white flex items-center">Hard Text</h1>
                        </div>
                    </div>

                }

            </div>

        </>
    )
}

export default FrontPage