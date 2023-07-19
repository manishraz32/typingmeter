import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrontPageData } from "../context/frontPageData";
import { useScoreData } from "../context/scoreData";
import data from "../datas/data.js"

let para = `Once upon a time, in a quaint little village nestled
 among rolling green hills, lived a curious young girl named Lily. 
With sparkling eyes and an insatiable thirst for adventure, 
she spent her days exploring the enchanting forests that surrounded her home. 
One sunny morning, as she ventured deeper into the woods, 
she stumbled upon a hidden path that led to a magical clearing. There, 
she discovered a talking squirrel named Oliver, who revealed a secret map to a hidden treasure. 
Excitement filled Lily's heart as she embarked on a thrilling quest, overcoming
obstacles and solving riddles along the way. With her unwavering 
determination and kind heart, she not only found the treasure 
but also brought joy and prosperity to her village. 
The tale of Lily's extraordinary journey spread far 
and wide, inspiring others to follow their dreams 
and believe in the power of courage and friendship.`



const TextEditor = () => {
  const navigate = useNavigate();

  const [frontPageData, setFrontPageData] = useFrontPageData();
  const [scoreData, setScoreData] = useScoreData();
  
  const [isLastPage, setIsLastPage] = useState(false);
  const [pressedWords, setPressedWords] = useState(0);
  const [worngPressedCount, setWrongPressedCount] = useState(0);
  const [previousChar, setPreviousChar] = useState('');
  const [inputParaLength, setInputParaLength] = useState(0);
  const [inputLength, setInputLength] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [fullParagraph, setFullParagraph] = useState(para.split(" "));
  const [paragraph, setParagraph] = useState(null);
  const [timer, setTimer] = useState(frontPageData?.time * 60);
  const [timerId, setTimerId] = useState(null);
  const [isTimerStart, setIsTimerStart] = useState(false);
  
  const updateParagraph = (pageNumber) => {
    console.log("pageNumber", pageNumber);
    const startIndex = pageNumber * 35;
    const endIndex = Math.min(fullParagraph.length, startIndex + 35);
    if(endIndex == fullParagraph.length) {
      setIsLastPage(true);
    }
    const currentParagraph = fullParagraph.slice(startIndex, endIndex);
    setParagraph(currentParagraph);
  }

  //Handling every keypress
  const handleChange = (e) => {
    e.preventDefault();
    setInputVal(e.target.value);
    let word = e.target.value;

    if(!isTimerStart) {
      startTimer();
      setIsTimerStart(true);
    }

    if (word.charAt(word.length - 1) == " ") {
      let wordArr = word.split(" ");
      let wordLen = wordArr.length;
      word = wordLen > 1 ? wordArr[wordLen - 2] : word[0]
      setPressedWords(pressedWords + 1);
      setInputParaLength(inputParaLength + 1);
      if (word === paragraph[currentWordIndex]) {
      } else {
        setWrongPressedCount(worngPressedCount + 1);
      }
      setInputLength(inputLength + 1);
      const inputLen = inputLength;
      if (inputLen + 1 == 8) {
        setInputVal("");
        setInputLength(0);
      }
      setCurrentWordIndex(currentWordIndex + 1);
      if (paragraph.length == inputParaLength + 1) {
        console.log("PageNum", pageNumber + 1)
        setPageNumber(pageNumber + 1);
        setInputParaLength(0);
        setInputVal("");
        setInputLength(0);
        setCurrentWordIndex(0);
      }
    }

  }
  


  setScoreData((prevScoreData) => {
    if (prevScoreData.typedWord === pressedWords && prevScoreData.typo === worngPressedCount) {
      return prevScoreData; // No changes, return the existing state
    } else {
      return { ...prevScoreData, typedWord: pressedWords, typo: worngPressedCount }; // Update the state with new values
    }
  });  
  

  //timer for showing remaining time
  const startTimer = () => {
    if (timerId == null) {
      console.log("timer ran");
      const id = setInterval(() => {
        console.log("runned");
        setTimer((prvTimer) => {
          let newTimer = prvTimer - 1;
          if (newTimer == -1) {
            clearInterval(id);
            navigate("/result");
          }
          return newTimer;
        });
        formatTimer(id);
      }, 1000)
      setTimerId(id);
    }
  }
 
  //format the timer
  const formatTimer = () => {
    let minute = Math.floor(timer / 60);
    let seconds = Math.floor(timer % 60);
    return `${minute}:${seconds}`;
  }

  useEffect(() => {
    if(isLastPage === true) {
      updateParagraph(0);
      setPageNumber(0);
    }
    updateParagraph(pageNumber);
  }, [pageNumber])

  useEffect(()=> {
    console.log("FrontPage", frontPageData);
  }, [])

  const cancelTyping = () => {
    clearInterval(timerId);
    navigate("/result");
  }

  return (
    <>
      <div div className=" w-[40%] h-[55%] bg-white border-[1px] px-5 border-blue-400 flex flex-col justify-between">
        <div className="top h-[10%] flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-mono font-bold text-[#1794AD]">{formatTimer()}</h1>
          </div>
          <div>
            <h1 className="text-[20px] font-mono font-bold text-[#1794AD]">backspace not allowed when word wrong</h1>
          </div>
          <div
            onClick={() => { cancelTyping() }}
          >
            <h1 className="text-[20px] font-mono font-bold text-[#1794AD] cursor-pointer">close</h1>
          </div>
        </div>
        <div className="text-container h-[60%]">
          <div className="text-[25px] h-[100%] leading-[50px] font-serif text-gray-600 tracking-wider">
            {
              paragraph && paragraph.map((word, idx) => (
                <span
                  key={idx}
                  style={
                    idx === currentWordIndex ? { color: "#1794AD" } :
                      idx < currentWordIndex ? { color: "#C0C0C0" } : {}
                  }
                >
                  {word + " "}
                </span>
              ))
            }
          </div>
        </div>
        <div className="text-writer h-[25%] ">
          <input
            value={inputVal}
            onChange={(e) => handleChange(e)}
            type="text"
            className="h-[80%] w-[100%] mt-2 bg-gray-100 font-serif text-gray-600 text-[25px] border-0 focus:border-transparent focus:outline-none caret-blue-700 caret-w-2"
          />
        </div>
      </div>
    </>
  )
}

export default TextEditor