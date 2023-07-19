import {useState, useEffect, useContext, createContext} from "react";
const ScoreDataContext = createContext();

const UseScoreDataProvider = ({ children }) => {
    const [scoreData, setScoreData] = useState({typedWord: 0, typo: 0});

    return (
        <ScoreDataContext.Provider value={[scoreData, setScoreData]}>
            {children}
        </ScoreDataContext.Provider>
    )
}

//********/

const useScoreData = () => {
    return useContext(ScoreDataContext);
}

export { useScoreData, UseScoreDataProvider };