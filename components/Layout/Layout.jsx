import React from "react";
import Header from "../Header/Header";
import AddButton from "../AddButton/AddButton";
import HomeButton from "../HomeButton/HomeButton";

const Layout = ({ children }) => {
	return (
		<div>
			<HomeButton />
			<Header />
			<AddButton />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
