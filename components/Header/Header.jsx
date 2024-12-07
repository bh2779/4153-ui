import { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import { List } from "@mantine/core";
import SearchResult from "./SearchResult";
import axios from "axios";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
	const [results, setResults] = useState([]);
	const [diningHalls, setDiningHalls] = useState({});
	const [stations, setStations] = useState({});
	const [shouldShowResults, setShouldShowResults] = useState(true);
	const [searchValue, setSearchValue] = useState("");

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

	const handleResultClick = (value) => {
		setSearchValue(value.name);
		setShouldShowResults(false);
	};

	return (
		<div className={styles.headerContainer}>
			{/* Search Bar */}
			<header className={styles.header}>
				<div
					className={styles.searchBarContainer}
					onClick={() => setShouldShowResults(true)}
				>
					<SearchBar
						value={searchValue}
						onSearch={handleSearch}
						onChange={(e) => setSearchValue(e.target.value)}
						className={styles.searchBar}
					/>
				</div>
			</header>
			{/* Search Results */}
			<div className={styles.resultsListContainer}>
				{shouldShowResults && (
					<List className={styles.resultsList}>
						{results.map((result) => (
							<Link
								href={{
									pathname: `/dish/${result.id}`,
									query: {
										dish: result.name,
										diningHall: result.diningHall,
										station: result.station,
									},
								}}
								onClick={() => handleResultClick(result)}
								key={result.id}
							>
								<SearchResult result={result} />
							</Link>
						))}
					</List>
				)}
			</div>
		</div>
	);
}

export default Header;
