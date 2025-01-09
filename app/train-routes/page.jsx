'use client';

import { useState, useEffect } from "react";
import { fetchTrainData, fetchTrainRoutes } from "./api";
import TrainList from "./TrainList";
import TrainDetails from "./TrainDetails";

export default function TrainRoutesPage() {
    const [trains, setTrains] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTrains = async () => {
            try {
                setError(null);
                const trainData = await fetchTrainData();
                setTrains(trainData?.data?.trains || []);
            } catch (err) {
                setError("Failed to load trains. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadTrains();
    }, []);

    const handleSelectTrain = async (train) => {
        setSelectedTrain(train);
        setRoutes([]);
        const trainNumber = train.trip_number.split("(")[1]?.replace(")", "");
        const departureDate = train.departure_full_date;

        try {
            const routeData = await fetchTrainRoutes(trainNumber, departureDate);
            setRoutes(routeData?.data?.routes || []);
        } catch (error) {
            console.error("Error fetching routes:", error.message);
        }
    };

    return (
        <div>
            <h1>Train Routes</h1>
            {loading && <p>Loading trains...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <>
                    <TrainList trains={trains} onSelectTrain={handleSelectTrain} />
                    <TrainDetails selectedTrain={selectedTrain} routes={routes} />
                </>
            )}
        </div>
    );
}
