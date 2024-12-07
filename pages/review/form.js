import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import DishForm from "../../components/DishForm/DishForm";
import styles from "./form.module.css";

export default function FormsPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { id, dish, diningHall, station } = router.query;

	if (status === "loading")
		return (
			<div className={styles.messageContainer}>
				<p className={styles.message}>Loading...</p>
			</div>
		);

	if (!session)
		return (
			<div className={styles.messageContainer}>
				<p className={styles.message}>You are not authenticated!</p>
			</div>
		);

	return (
		<div className={styles.pageContainer}>
			<ReviewForm />
			<DishForm />
		</div>
	);
}
