import { Center, Text, Container } from "@mantine/core";
import styles from "./Home.module.css";

const Home = () => {
	return (
		<Center className={styles.center}>
			<Container className={styles.container}>
				<Text className={styles.text}>
					Welcome to BiteReview, an app for students to review dishes served in
					Columbia's dining halls!
					<br />
					<br />
					1. Use the search bar to search for reviews of existing dishes.
					<br />
					2. To create a new dish, first log in using your Google account in the
					top right corner. Then click the + button in the bottom right corner
					to create a new review and/or a new dish.
					<br />
					3. To return to the home page, click on the logo in the top left
					corner.
					<br />
					4. Enjoy your experience!
				</Text>
			</Container>
		</Center>
	);
};

export default Home;
