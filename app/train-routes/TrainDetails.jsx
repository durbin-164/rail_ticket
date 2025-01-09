import PropTypes from "prop-types";

export default function TrainDetails({ selectedTrain, routes }) {
    if (!selectedTrain) return <p>Select a train to view details.</p>;

    return (
        <div>
            <h2>Train Details: {selectedTrain.trip_number}</h2>
            <h3>Routes</h3>
            {routes && routes.length > 0 ? (
                <ul>
                    {routes.map((route, index) => (
                        <li key={index}>{route.city}</li>
                    ))}
                </ul>
            ) : (
                <p>No routes available for this train.</p>
            )}
        </div>
    );
}

TrainDetails.propTypes = {
    selectedTrain: PropTypes.object,
    routes: PropTypes.array.isRequired,
};
