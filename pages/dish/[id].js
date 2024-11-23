import { useRouter } from "next/router";

export default function ReviewsPage() {
	const router = useRouter();
	const { id, dish, diningHall, station } = router.query;

	return (
		<div>
			<h1>Search Result Details</h1>
			<p>Dish: {dish}</p>
			<p>Dining Hall: {diningHall}</p>
			<p>Station: {station}</p>
		</div>
	);
}
