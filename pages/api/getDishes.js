import axios from "axios";

export default async function getDishes(req, res) {
	const { query } = req.query;
	const endpoint = process.env.DISH_MANAGEMENT_SERVICE_URL + "/dishes";
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
			"Error fetching dishes from dish managagement service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to fetch dishes",
		});
	}
}
