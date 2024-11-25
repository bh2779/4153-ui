import { useRouter } from "next/router";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import DishForm from "../../components/DishForm/DishForm";
import styles from "./form.module.css";

export default function FormsPage() {
	const router = useRouter();
	const { id, dish, diningHall, station } = router.query;

	return (
		<div className={styles.pageContainer}>
			<ReviewForm />
            <DishForm />
		</div>
	);
}
