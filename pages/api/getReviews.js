import axios from "axios";

export default async function getReviews(req, res) {
	const { query } = req.query;
	// const endpoint = process.env.REVIEW_RATING_SERVICE_URL + "/reviews";
	const dish_id = req.query.dish_id;
	const endpoint = process.env.COMPOSITE_SERVICE_URL + "/composite/dishes/" + dish_id;
	// const dish_id = Number(req.query.dish_id);
	// const queryParams = {
	// 	dish_id: dish_id
	// };

	try {
		const response = await axios.get(endpoint);
		// const response = await axios.get(endpoint, {
		// 	params: queryParams,
		// });

		// Forward the response from the service to the client
		res.status(200).json(response.data);
	} catch (error) {
		console.error(
			"Error fetching reviews from composite service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to fetch reviews",
		});
	}
}
