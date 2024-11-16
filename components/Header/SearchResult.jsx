import { Text, List, Group } from "@mantine/core";
import styles from "./Header.module.css";

function SearchResult({ result, onSelect }) {
	return (
		<List.Item
			onClick={() => onSelect(result)}
			className={styles.searchResult}
			sx={(theme) => ({
				"&:hover": {
					backgroundColor: theme.colors.gray[0], // Light gray background on hover
				},
			})}
		>
			<Group>
				<Text weight={500}>{result.name}</Text> {/* Slightly bolder text */}
				<Text weight={500}>{result.diningHall}</Text>
				<Text weight={500}>{result.station}</Text>
			</Group>
		</List.Item>
	);
}

export default SearchResult;
