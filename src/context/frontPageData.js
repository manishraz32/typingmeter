import {useState, useEffect, useContext, createContext} from "react";
const FrontPageContext = createContext();

const UseFrontPageDataProvider = ({ children }) => {
    const [frontPageData, setFrontPageData] = useState({time: 0, textLen: ""});

    return (
        <FrontPageContext.Provider value={[frontPageData, setFrontPageData]}>
            {children}
        </FrontPageContext.Provider>
    )
}

//********/

const useFrontPageData = () => {
    return useContext(FrontPageContext);
}

export {useFrontPageData, UseFrontPageDataProvider};