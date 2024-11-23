import React from "react";
import { useForm } from "@mantine/form";
import { useState, useEffect, useCallback } from "react";
import { Textarea, NumberInput, Button, Box, List } from "@mantine/core";
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
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        }
    };

    return (
        <div className={styles.pageContainer}>

            <div className={styles.formContainer}>
                <div className={styles.searchBarContainer}>
                    <SearchBar onSearch={handleSearch}/>
                </div>
                
                <List spacing="xs">
                    {results.map((result) => (
                        <SearchResult
                            key={result.id}
                            result={result}
                            onSelect={handleSelect}
                        />
                    ))}
                </List>

                <div className={styles.ratingContainer}>
                    <NumberInput
                        label="Rating"
                        type="number"
                        placeholder="Rating (0-5)"
                        value={rating}
                        onChange={setRating}
                        min={0}
                        max={5}
                        radius={"md"}
                        hideControls
                        required
                    />
                </div>

                <Textarea
                    label="Review"
                    placeholder="Write your review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    radius={"md"}
                />

                <Button onClick={handleSubmit}>Submit Review</Button>
            </div>
        </div>
    )
}

// function ReviewForm() {
//     const form = useForm({
//         initialValues: {
//             dishId: "",
//             rating: "",
//             review: "",
//         },

//         validate: {
//             rating: (value) => value >= 0 && value <= 5 ? null : "Rating must be a number between 0 and 5",
//         }
//     })

//     const handleSubmit = async (values) => {
//         try {
//             const response = await axios.post(`/api/postReview`, {
//                 body: JSON.stringify({
//                     dish_id: values.dishId,
//                     rating: values.rating,
//                     review: values.review,
//                 }),
//             });
    
//             if (response.status != 201) {
//                 throw new Error(`Failed to submit: ${response.statusText}`);
//             }
    
//             alert("Review submitted successfully!");
//             form.reset();
//         } catch (error) {
//             console.error("Error submitting review:", error);
//             alert("Failed to submit review. Please try again.");
//         }
//     };

//     return (
//         <Box maw={400} mx="auto">
//             <form onSubmit={form.onSubmit(handleSubmit)}>
//                 {/* Dish ID Input */}
//                 <NumberInput
//                     label="Dish ID"
//                     placeholder="Enter the dish ID"
//                     {...form.getInputProps("dishId")}
//                 />
    
//                 {/* Rating Input */}
//                 <NumberInput
//                     label="Rating"
//                     placeholder="Enter a rating (0 to 5)"
//                     mt="sm"
//                     min={0}
//                     max={5}
//                     {...form.getInputProps("rating")}
//                 />
    
//                 {/* Review Input */}
//                 <Textarea
//                     label="Review"
//                     placeholder="Write your review"
//                     mt="sm"
//                     {...form.getInputProps("review")}
//                 />
    
//                 {/* Submit Button */}
//                 <Button type="submit" mt="md">
//                     Submit
//                 </Button>
//             </form>
//         </Box>
//     )
// }

export default ReviewForm;
