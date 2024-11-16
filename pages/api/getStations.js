import axios from "axios";

export default async function getDishes(req, res) {
	const endpoint = process.env.DISH_MANAGEMENT_SERVICE_URL + "/stations";

	try {
		const response = await axios.get(endpoint);

		// Forward the response from the service to the client
		res.status(200).json(response.data);
	} catch (error) {
		console.error(
			"Error fetching dining halls from dish managagement service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to fetch dining halls",
		});
	}
}
