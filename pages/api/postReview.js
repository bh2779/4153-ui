import axios from "axios";

export default async function postReview(req, res) {
	const { body } = req.body;
	const endpoint = process.env.REVIEW_RATING_SERVICE_URL + "/reviews";

	try {
        const response = await axios.post(endpoint, JSON.parse(body))

		// Forward the response from the service to the client
		res.status(201).json(response.data);
	} catch (error) {
		console.error(
			"Error posting reviews with review rating service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to post reviews",
		});
	}
}
