import AuthLogin from "../components/AuthLogin/AuthLogin";
import Message from "../components/Message/Message";
import { Flex } from "@mantine/core";

const Home = () => {
	return (
		<Flex
			style={{
				height: "100vh",
				width: "100%",
				margin: 0,
				padding: 0,
			}}
			justify="space-evenly"
			align="center"
			gap="sm"
		>
			<AuthLogin />
			<Message />
		</Flex>
	);
};

export default Home;
