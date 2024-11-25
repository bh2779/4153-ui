import axios from "axios";

export default async function getReviews(req, res) {
	const { query } = req.query;
	const endpoint = process.env.REVIEW_RATING_SERVICE_URL + "/reviews";
	const queryParams = {
		name: query,
		limit: 5,
	};

	try {
		const response = await axios.get(endpoint, {
			params: queryParams,
		});

		// Forward the response from the service to the client
		res.status(200).json(response.data);
	} catch (error) {
		console.error(
			"Error fetching reviews from review rating service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to fetch reviews",
		});
	}
}
