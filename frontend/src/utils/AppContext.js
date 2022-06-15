import React,{createContext,useState} from "react";
import PropTypes from "prop-types";
const AppContext = createContext(null);

export default AppContext;

export const AppProvider = ({ children }) => {

	const [videos,setVideos]  = useState();
	const [language,setLanguage] = useState(() =>
		localStorage.getItem("language")
			? JSON.parse(localStorage.getItem("language"))
			: "german"
	);
    





	let contextData = {videos:videos,setVideos:setVideos};
	return (
		<AppContext.Provider value={contextData}>{children}</AppContext.Provider>
	);
};
AppProvider.propTypes={
	children: PropTypes.array.isRequired
};
