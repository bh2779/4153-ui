import { Text, List, Group } from "@mantine/core";
import styles from "./ReviewResult.module.css";

function ReviewResult({ review }) {
    const dateString = review.updated_at;
    const date = new Date(dateString);

    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();

    const formattedDate = `${mm}/${dd}/${yyyy}`;

	return (
		<List.Item
			className={styles.reviewResult}
			sx={(theme) => ({
				"&:hover": {
					backgroundColor: theme.colors.gray[0],
				},
			})}
		>

			<Text className={styles.rating}>Rating: {review.rating} out of 5</Text>
            <Text className={styles.date}>Date: {formattedDate}</Text>
			<Text className={styles.review}> Comments: {review.review}</Text>
			{review.images && review.images.length > 0 ? (
				review.images.map((image, index) => (
				<img
					key={index}
					src={`data:image/jpeg;base64,${image}`}
					style={{ maxWidth: "100%", maxHeight: "300px", display: "block", marginTop: "1rem" }}
				/>
				))
			) : (
				null
			)}
		</List.Item>
	);
}

export default ReviewResult;
