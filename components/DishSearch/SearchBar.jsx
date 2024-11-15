// components/SearchBar.js
import { useState, useEffect, useRef } from "react";
import { TextInput, Loader } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from "./DishSearch.module.css";

function SearchBar({ onSearch }) {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const isMounted = useRef(false);

	useEffect(() => {
		// to prevent loading icon from appearing on initial render
		if (isMounted.current) {
			setLoading(true);
		} else {
			isMounted.current = true;
		}
		const delayDebounceFn = setTimeout(() => {
			onSearch(query);
			setLoading(false);
		}, 750); // Debounce API call

		return () => clearTimeout(delayDebounceFn);
	}, [query, onSearch]);

	return (
		<TextInput
			placeholder="Search for dishes..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			radius="md" // Rounded corners
			size="md" // Medium size
			variant="filled" // Filled style
			className={styles.searchInput}
			rightSection={
				loading ? (
					<Loader size={24} />
				) : (
					<IconSearch style={{ height: 24, width: 24 }} stroke={1.5} />
				)
			}
			rightSectionWidth={40} // Set the width of the icon container
		/>
	);
}

export default SearchBar;
