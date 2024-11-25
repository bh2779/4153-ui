import axios from "axios";

export default async function postDish(req, res) {
	const { body } = req.body;
	const endpoint = process.env.DISH_MANAGEMENT_SERVICE_URL + "/dishes";
    console.log(endpoint)
    console.log(JSON.parse(body))

	try {
        const response = await axios.post(endpoint, JSON.parse(body))

		// Forward the response from the service to the client
		res.status(201).json(response.data);
	} catch (error) {
		console.error(
			"Error posting dishes with dish management service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to post dish",
		});
	}
}
