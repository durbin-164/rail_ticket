export function filterTrains(trains, searchTerm) {
    if (!Array.isArray(trains)) return [];
    const lowercasedTerm = searchTerm?.toLowerCase() || "";
    return trains.filter((train) =>
        train.trip_number.toLowerCase().includes(lowercasedTerm)
    );
}
