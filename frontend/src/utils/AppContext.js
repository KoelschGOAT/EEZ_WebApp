import React,{createContext,useContext,useState,useEffect} from "react"
import axios from "axios";
const AppContext = createContext(null);

export default AppContext;

export const AppProvider = ({ children }) => {

    const [videos,setVideos]  = useState();





    let contextData = {videos:videos,setVideos:setVideos}
    return (
        <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
    );
}