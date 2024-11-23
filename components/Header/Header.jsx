import { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import { List } from "@mantine/core";
import SearchResult from "./SearchResult";
import axios from "axios";
import styles from "./Header.module.css";

// TODO: might need to memoize dining halls and stations so don't need to repopulate every time
// TODO: make it so that results are hidden if user clicks away from search bar

function Header() {
	const [results, setResults] = useState([]);
	const [diningHalls, setDiningHalls] = useState({});
	const [stations, setStations] = useState({});

	useEffect(() => {
		async function getDiningHallsAndStations(params) {
			const diningHallsResponse = await axios.get(`/api/getDiningHalls`);
			const stationsResponse = await axios.get(`/api/getStations`);

			const diningHallMap = diningHallsResponse.data.reduce((acc, hall) => {
				acc[hall.id] = hall.name;
				return acc;
			}, {});

			const stationMap = stationsResponse.data.reduce((acc, station) => {
				acc[station.id] = station.name;
				return acc;
			}, {});

			setDiningHalls(diningHallMap);
			setStations(stationMap);
		}

		getDiningHallsAndStations();
	}, []);

	// useCallback to prevent re-rendering when passed to SearchBar child component
	const handleSearch = useCallback(
		async (query) => {
			try {
				if (query) {
					const response = await axios.get(`/api/getDishes?query=${query}`);

					// add dining hall names and station names to dish results
					const dishesWithDiningHallsAndStations = response.data.map(
						(dish) => ({
							...dish,
							diningHall: diningHalls[dish.dining_hall_id],
							station: stations[dish.station_id],
						})
					);

					setResults(dishesWithDiningHallsAndStations);
				} else {
					setResults([]);
				}
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		},
		[diningHalls, stations]
	);

	const handleSelect = (result) => {
		console.log("Selected dish:", result);
		// Add your navigation or detail view logic here
	};

	return (
		<div className={styles.pageContainer}>
			{/* Search Bar */}
			<header className={styles.header}>
				<div className={styles.searchBarContainer}>
					<SearchBar onSearch={handleSearch} className={styles.searchBar} />
				</div>
			</header>
			{/* Search Results */}
			<List spacing="xs" className={styles.resultsList}>
				{results.map((result) => (
					<SearchResult
						key={result.id}
						result={result}
						onSelect={handleSelect}
					/>
				))}
			</List>
		</div>
	);
}

export default Header;
