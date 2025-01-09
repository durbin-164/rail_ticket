const baseApiUrl = "https://railspaapi.shohoz.com/v1.0/web";

async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Fetch Error:", error.message);
        throw error;
    }
}

export async function fetchTrainData(fromCity, toCity, dateOfJourney, seatClass = "SNIGDHA") {
    const encodedFromCity = encodeURIComponent(fromCity);
    const encodedToCity = encodeURIComponent(toCity);
    const encodedDateOfJourney = encodeURIComponent(dateOfJourney);
    const encodedSeatClass = encodeURIComponent(seatClass);

    const searchTripsUrl = `${baseApiUrl}/bookings/search-trips-v2?from_city=${encodedFromCity}&to_city=${encodedToCity}&date_of_journey=${encodedDateOfJourney}&seat_class=${encodedSeatClass}`;

    // Call the Next.js API route for the proxy
    const proxiedUrl = `/api/proxy?url=${encodeURIComponent(searchTripsUrl)}`;

    return await fetchData(proxiedUrl);
}


export async function fetchTrainRoutes(trainNumber, departureDate) {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(`${baseApiUrl}/train-routes`)}`;

    const body = {
        model: trainNumber,
        departure_date_time: departureDate,
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return await fetchData(proxyUrl, options);
}
