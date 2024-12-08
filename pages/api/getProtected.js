import axios from "axios";

export default async function getUserInfo(req, res) {
    // console.log(req)
	// const { credentials } = req.credentials;
    // const { mode } = req.mode;
	const endpoint = process.env.COMPOSITE_SERVICE_URL + "/protected";

	try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        });
        // const response = await axios.get(endpoint, { credentials: "include", mode: "cors" })
		// const response = await axios.get(endpoint, {
        //     credentials: credentials,
        //     mode: mode,
        // });

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
