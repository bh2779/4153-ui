import axios from "axios";

export default async function postReview(req, res) {
	const { body } = req.body;
	// const { token } = req.headers.cookie;
	// console.log(typeof req.headers.cookie)
	const endpoint = process.env.COMPOSITE_SERVICE_URL + "/composite/dishes/reviews";
	// const endpoint = process.env.REVIEW_RATING_SERVICE_URL + "/reviews";

	try {
		let bodyObj = JSON.parse(body);
		const tokenArray = req.headers.cookie.split('=')
		bodyObj.access_token = tokenArray[1];
		// bodyObj.test = 'testing123';
        const response = await axios.post(endpoint, bodyObj, { withCredentials: true })
		// const response = await fetch(endpoint, {
		// 	method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include',
		// 	body: body
		// });

		// Forward the response from the service to the client
		res.status(201).json(response.data);
	} catch (error) {
		console.error(
			"Error posting reviews with review rating service:",
			error
		);

		res.status(error.response?.status || 500).json({
			error: error.response?.data || "Failed to post review.",
		});
	}
}
