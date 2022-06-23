import React from "react";
import "./App.css";
import Routing from "./utils/Router/Routing";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
	const client = new QueryClient();

	return (
		 <QueryClientProvider client={client}>
			<Routing/>
		</QueryClientProvider>
	);
}

export default App;
