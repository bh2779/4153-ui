import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Textarea, NumberInput, Button, List } from "@mantine/core";
import axios from "axios";
import SearchBar from "../../components/Header/SearchBar";
import SearchResult from "../../components/Header/SearchResult";
import styles from "./ReviewForm.module.css";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

function ReviewForm() {
    const [results, setResults] = useState([]);
    const [diningHalls, setDiningHalls] = useState({});
	const [stations, setStations] = useState({});
    const [dishId, setDishId] = useState(null);
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [shouldShowResults, setShouldShowResults] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null); // File object for upload
    const [previewImage, setPreviewImage] = useState(null); // Base64 string for preview

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

    const handleImageDrop = (files) => {
        const file = files[0]; // Only allow one image
        if (file) {
            setUploadedImage(file);
    
            // Generate a preview using FileReader
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1];
                setPreviewImage(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            let body = {
                dish_id: dishId,
                rating: rating,
                review: review,
            };

            if (previewImage) {
                body.image_name = uploadedImage.name;
                body.image = previewImage;
                body.image_type = uploadedImage.type;
            }
            const response = await axios.post(`/api/postReview`, {
                body: JSON.stringify(body),
            });
    
            if (response.status !== 201) {
                throw new Error(`Failed to submit: ${response.statusText}`);
            }
    
            alert("Review submitted successfully!");
            setDishId(null);
            setRating("");
            setReview("");
            setSearchValue("");
            setUploadedImage(null);
            setPreviewImage(null);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please make sure you are signed in.");
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.formContainer}>
                <div className={styles.titleContainer}>
                    Write a review
                </div>

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

                <div className={styles.dishDoesNotExistTextContainer}>
                    If the dish you're looking for doesn't exist, you can submit a new dish using the form below!
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

                <Dropzone
                    onDrop={handleImageDrop}
                    maxFiles={1}
                    accept={IMAGE_MIME_TYPE}
                    style={{
                        border: "2px dashed #ccc",
                        padding: "2.5rem",
                        textAlign: "center",
                        marginBottom: "1rem",
                        borderRadius: "10px",
                        backgroundColor: previewImage ? "#e1f7e3" : "white",
                        borderColor: previewImage ? "#4caf50" : "#ccc",
                    }}
                >
                    <div>
                        {previewImage ? (
                            <p>Uploaded!</p>
                        ) : (
                            <p>Drag an image here or click to select one. (Only one image allowed)</p>
                        )}
                    </div>
                </Dropzone>

                <div className={styles.submitButtonContainer}>
                    <Button onClick={handleSubmit} className={styles.submitButton}>Submit Review</Button>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm;
