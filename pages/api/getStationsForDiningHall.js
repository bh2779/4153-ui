import axios from "axios";

export default async function getStationsForDiningHall(req, res) {
	const { dining_hall_id } = req.query;
	const endpoint = process.env.DISH_MANAGEMENT_SERVICE_URL + `/dining_halls/${dining_hall_id}/stations`;

	try {
		const response = await axios.get(endpoint);

		// Forward the response from the service to the client
		res.status(200).json(response.data);
	} catch (error) {
		console.error(
			"Error fetching stations from dish managagement service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to fetch stations",
		});
	}
}
