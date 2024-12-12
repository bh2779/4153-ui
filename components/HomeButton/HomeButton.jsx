import { Image } from "@mantine/core";
import { useRouter } from "next/router";
import styles from "./HomeButton.module.css";

const HomeButton = () => {
	const router = useRouter();

	const navigateHome = () => {
		router.push("/");
	};

	return (
		<Image
			src={"/logo.png"}
			onClick={navigateHome}
			className={styles.homeImage}
			alt="Home button"
		/>
	);
};

export default HomeButton;
