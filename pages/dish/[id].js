import { useRouter } from "next/router";
import ReviewResult from "../../components/ReviewResult/ReviewResult";
import { useState, useEffect } from "react";
import axios from "axios";
import { Text, List, Group } from "@mantine/core";
import styles from "./id.module.css"

export default function ReviewsPage() {
	const router = useRouter();
	const { id, dish, diningHall, station } = router.query;
	const [reviews, setReviews] = useState([]);
	const [averageRating, setAverageRating] = useState(0);

	useEffect(() => {
		async function getReviews(params) {
			const reviewsResponse = await axios.get(`/api/getReviews`, { params: { dish_id: id }})

			const reviewResults = reviewsResponse.data.map(
				(review) => ({
					...review,
				})
			);
			setReviews(reviewResults);
		}

		getReviews();
		
	}, [id]);

	useEffect(() => {
		if (reviews.length > 0) {
			const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
			setAverageRating(totalRating / reviews.length);
		}
	}, [reviews]);

	return (
		<div>
			<div className={styles.dishDetails}>
				<p className={styles.dishDetailsTitle}>Dish Details</p>
				<p>Name: {dish}</p>
				<p>Dining Hall: {diningHall}</p>
				<p>Station: {station}</p>
				<p>Average Rating: {averageRating.toFixed(1)}</p>
			</div>
			<div className={styles.reviewsList}>
				<List>
					{reviews.map((review) => (
						<ReviewResult key={review.id} review={review}/>
					))}
				</List>
			</div>
		</div>
	);
}
