'use client';

import { useState, useEffect, Suspense } from "react";
import { fetchTrainData, fetchTrainRoutes } from "./api";
import TrainDetails from "./TrainDetails";
import { useSearchParams } from "next/navigation";

function TrainRoutesContent() {
    const searchParams = useSearchParams();
    const fromCity = searchParams.get("fromCity");
    const toCity = searchParams.get("toCity");
    const date = searchParams.get("date");

    const [trains, setTrains] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTrains = async () => {
            if (!fromCity || !toCity || !date) {
                setError("Missing search parameters.");
                setLoading(false);
                return;
            }

            try {
                setError(null);
                const trainData = await fetchTrainData(fromCity, toCity, date);
                setTrains(trainData?.data?.trains || []);
            } catch (err) {
                setError("Failed to load trains. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadTrains();
    }, [fromCity, toCity, date]);

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
            <h1>Found Trains</h1>
            {loading && <p>Loading trains...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && trains.length > 0 && (
                <ul>
                    {trains.map((train) => (
                        <li key={train.trip_number}>
                            <button onClick={() => handleSelectTrain(train)}>
                                {train.trip_number} - {train.departure_date_time}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {!loading && !error && trains.length === 0 && <p>No trains found.</p>}
            {selectedTrain && (
                <TrainDetails selectedTrain={selectedTrain} routes={routes} date={date} />
            )}
        </div>
    );
}

export default function TrainRoutesPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <TrainRoutesContent />
        </Suspense>
    );
}
