import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Textarea, NumberInput, Button, List } from "@mantine/core";
import axios from "axios";
import SearchBar from "../../components/Header/SearchBar";
import SearchResult from "../../components/Header/SearchResult";
import styles from "./ReviewForm.module.css";

function ReviewForm() {
    const [results, setResults] = useState([]);
    const [diningHalls, setDiningHalls] = useState({});
	const [stations, setStations] = useState({});
    const [dishId, setDishId] = useState(null);
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
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

    const handleResultClick = (result) => {
		setSearchValue(result.name);
		setShouldShowResults(false);
        setDishId(result.id)
	};

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/api/postReview`, {
                body: JSON.stringify({
                    dish_id: dishId,
                    rating: rating,
                    review: review,
                }),
            });
    
            if (response.status != 201) {
                throw new Error(`Failed to submit: ${response.statusText}`);
            }
    
            alert("Review submitted successfully!");
            setDishId(null);
            setRating("");
            setReview("");
            setSearchValue("");
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        }
    };

    return (
        <div className={styles.pageContainer}>

            <div className={styles.formContainer}>
                <div className={styles.searchBarContainer} onClick={() => setShouldShowResults(true)}>
                    <SearchBar
                        value={searchValue}
						onSearch={handleSearch}
						onChange={(e) => setSearchValue(e.target.value)}
						className={styles.searchBar}
                    />
                </div>
                
                <div>
                    {shouldShowResults && (
                        <List className={styles.resultsList}>
                            {results.map((result) => (
                                <div
                                    onClick={() => handleResultClick(result)}
                                    key={result.id}
                                >
                                    <SearchResult result={result}/>
                                </div>
                            ))}
                        </List>
                    )}
                </div>

                <div className={styles.ratingContainer}>
                    <NumberInput
                        label="Rating"
                        type="number"
                        placeholder="Rating (out of 5)"
                        value={rating}
                        onChange={setRating}
                        min={0}
                        max={5}
                        radius={"md"}
                        hideControls
                        required
                    />
                </div>

                <div className={styles.reviewContainer}>
                    <Textarea
                        label="Review"
                        placeholder="Write a review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        radius={"md"}
                    />
                </div>

                <div className={styles.submitButtonContainer}>
                    <Button onClick={handleSubmit} className={styles.submitButton}>Submit Review</Button>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm;
