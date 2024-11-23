import { useState, useEffect, useRef } from "react";
import { TextInput, Loader } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from "./Header.module.css";

function SearchBar({ value, onSearch, onChange }) {
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
			onSearch(value);
			setLoading(false);
		}, 750); // Debounce API call

		return () => clearTimeout(delayDebounceFn);
	}, [value, onSearch]);

	return (
		<TextInput
			placeholder="Search for dishes..."
			value={value}
			onChange={onChange}
			radius="md" // Rounded corners
			size="md" // Medium size
			variant="filled" // Filled style
			className={styles.searchBar}
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
