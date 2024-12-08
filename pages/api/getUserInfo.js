import axios from "axios";

export default async function getUserInfo(req, res) {
	const { body } = req.body;
	const endpoint = process.env.COMPOSITE_SERVICE_URL + "/google_login";

	try {
		const response = await axios.post(endpoint, JSON.parse(body));

		// Forward the response from the service to the client
		res.status(200).json(response.data);
	} catch (error) {
		console.error(
			"Error getting user info:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to get user info",
		});
	}
}