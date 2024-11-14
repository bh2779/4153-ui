import { useState, useCallback } from "react";
import SearchBar from "./SearchBar";
import { List, Stack } from "@mantine/core";
import SearchResult from "./SearchResult";
import axios from "axios";
import styles from "./DishSearch.module.css";

// TODO: might need to memoize dining halls and stations so don't need to repopulate every time

function DishSearch() {
	const [results, setResults] = useState([]);

	// useCallback to prevent re-rendering when passed to SearchBar child component
	const handleSearch = useCallback(async (query) => {
		try {
			if (query) {
				const response = await axios.get(`/api/searchDishes?query=${query}`);
				setResults(response.data);
			} else {
				setResults([]);
			}
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	}, []);

	const handleSelect = (result) => {
		console.log("Selected dish:", result);
		// Add your navigation or detail view logic here
	};

	return (
		<Stack spacing="md" className={styles.dishSearchContainer}>
			<SearchBar onSearch={handleSearch} />
			<List spacing="xs" className={styles.resultsList}>
				{results.map((result) => (
					<SearchResult
						key={result.id}
						result={result}
						onSelect={handleSelect}
					/>
				))}
			</List>
		</Stack>
	);
}

export default DishSearch;
