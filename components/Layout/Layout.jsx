import React from "react";
import Header from "../Header/Header";
import AddButton from "../AddButton/AddButton";

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<AddButton />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
