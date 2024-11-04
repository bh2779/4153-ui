import React, { useState } from "react";
import { getDishReviews } from "../api/api";
import TestButton from "../components/TestButton";
import { Center, Stack } from "@mantine/core";

const Home = () => {
	const [reviews, setReviews] = useState(null);

	// async function handleClick(e) {
	//     e.preventDefault()
	//     const response = getDishReviews(1)
	//     // const json = response.json()
	//     setReviews(response)
	// }

	const handleClick = async () => {
		const response = await fetch("http://54.166.38.176:8000/dishes/1/reviews");
		const json = await response.json();
		setReviews(json);
	};

	return (
		<>
			<div className="home">
				<Center>
					<Stack>
						<h1 className="home__title">Dining Hall Dish Reviews</h1>
						<TestButton text="Pizza" />
						{/* {reviews && <p>{JSON.stringify(reviews, null, 2)}</p>} */}
					</Stack>
				</Center>
			</div>
		</>
	);
};

export default Home;
