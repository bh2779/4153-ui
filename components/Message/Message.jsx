import React from "react";
import { Box, Text } from "@mantine/core";

export default function Message() {
	return (
		<Box
			style={{
				padding: "20px",
				backgroundColor: "#f9f9f9",
				borderRadius: "8px",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				textAlign: "center",
				maxWidth: "400px",
				margin: 5,
			}}
		>
			<Text size="md" weight={500}>
				Search for a dish at the top of the screen! Or create a new review by
				clicking the + button!
			</Text>
		</Box>
	);
}
