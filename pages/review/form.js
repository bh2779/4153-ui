import ReviewForm from "../../components/ReviewForm/ReviewForm";
import DishForm from "../../components/DishForm/DishForm";
import styles from "./form.module.css";

export default function FormsPage() {
	return (
		<div className={styles.pageContainer}>
			<ReviewForm />
			<DishForm />
		</div>
	);
}
