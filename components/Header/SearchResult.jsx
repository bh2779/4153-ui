import { Text, List, Group } from "@mantine/core";
import styles from "./Header.module.css";

function SearchResult({ result }) {
	return (
		<List.Item
			className={styles.searchResult}
			sx={(theme) => ({
				"&:hover": {
					backgroundColor: theme.colors.gray[0], // Light gray background on hover
				},
			})}
		>
			<Group position="apart">
				<Text className={styles.searchName}>{result.name}</Text>
				<div className={styles.metadataGroup}>
					<Text className={styles.searchMetadata}>{result.diningHall}</Text>
					<Text className={styles.searchMetadata}>{result.station}</Text>
				</div>
			</Group>
		</List.Item>
	);
}

export default SearchResult;
