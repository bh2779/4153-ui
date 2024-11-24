import React from "react";
import { useState, useEffect } from "react";
import { TextInput, Textarea, Button, Select } from "@mantine/core";
import axios from "axios";
import styles from "./DishForm.module.css";

function DishForm() {
    const [dishName, setDishName] = useState("");
    const [dishDescription, setDishDescription] = useState("");
    const [diningHalls, setDiningHalls] = useState([])
    const [stations, setStations] = useState([])
    const [selectedDiningHallId, setSelectedDiningHallId] = useState("");
    const [selectedStationId, setSelectedStationId] = useState("");

    useEffect(() => {
        const fetchDiningHalls = async () => {
            try {
                const diningHallResponse = await axios.get(`/api/getDiningHalls`);
                setDiningHalls(
                    diningHallResponse.data.map((diningHall) => ({
                        value: diningHall.id.toString(),
                        label: diningHall.name,
                    }))
                );
            } catch (error) {
                console.error("Error fetching dining halls:", error.message);
            }
        };

        fetchDiningHalls();
    }, []);

    useEffect(() => {
        if (selectedDiningHallId) {
            const fetchStations = async () => {
                try {
                    const stationResponse = await axios.get(`/api/getStationsForDiningHall?dining_hall_id=${selectedDiningHallId}`);
                    setStations(
                        stationResponse.data.map((station) => ({
                            value: station.id.toString(),
                            label: station.name,
                        }))
                    );
                } catch (error) {
                    console.error("Error fetching stations:", error.message);
                }
            }

            fetchStations();
        } else {
            setStations([]);
        }
    }, [selectedDiningHallId]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/api/postDish`, {
                body: JSON.stringify({
                    name: dishName,
                    description: dishDescription,
                    dining_hall_id: Number(selectedDiningHallId),
                    station_id: Number(selectedStationId),
                }),
            });

            if (response.status != 201) {
                throw new Error(`Failed to submit: ${response.statusText}`);
            }

            alert("Review submitted successfully!");
            setDishName("");
            setDishDescription("");
        } catch (error) {
            console.error("Error submitting dish:", error);
            alert("Failed to submit dish. Please try again.")
        }
    };

    return (
        <div className={styles.pageContainer}>

            <div className={styles.formContainer}>
                <div className={styles.titleContainer}>
                    Submit a new dish
                </div>

                <div className={styles.nameContainer}>
                    <TextInput 
                        label="Dish Name"
                        placeholder="Enter the dish name..."
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        radius={"md"}
                        required
                    />
                </div>

                <div className={styles.descriptionContainer}>
                    <Textarea 
                        label="Description"
                        placeholder="Describe the dish..."
                        value={dishDescription}
                        onChange={(e) => setDishDescription(e.target.value)}
                        radius={"md"}
                    />
                </div>

                <div className={styles.diningHallDropdownContainer}>
                    <Select 
                        label="Dining hall"
                        placeholder="Select a dining hall..."
                        value={selectedDiningHallId}
                        onChange={setSelectedDiningHallId}
                        radius={"md"}
                        data={diningHalls}
                        required
                    />
                </div>

                <div className={styles.stationDropdownContainer}>
                    <Select 
                        label="Station"
                        placeholder="Select a station..."
                        value={selectedStationId}
                        onChange={setSelectedStationId}
                        radius={"md"}
                        data={stations}
                        required
                    />
                </div>

                <div className={styles.submitButtonContainer}>
                    <Button onClick={handleSubmit} className={styles.submitButton}>Submit Dish</Button>
                </div>
            </div>

        </div>
    )
}

export default DishForm;