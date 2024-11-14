// pages/api/searchDishes.js
export default async function handler(req, res) {
	const { query } = req.query;
	// Replace with your actual data fetching logic
	// const dishes = await fetchDishes(query); // Mocked or real DB/API call
	const dishes = [
		{ name: "Omelette", diningHall: "John Jay", station: "Grill" },
		{ name: "Grilled Cheese", diningHall: "Ferris", station: "Action" },
	];

	console.error(query);

	res.status(200).json(dishes);
}
