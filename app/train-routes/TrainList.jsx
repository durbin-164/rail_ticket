import PropTypes from "prop-types";
import { useState } from "react";
import { filterTrains } from "./utils";

export default function TrainList({ trains, onSelectTrain }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const filteredTrains = filterTrains(trains, searchTerm);

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a train..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div>
                {filteredTrains.length > 0 ? (
                    filteredTrains.map((train) => (
                        <div
                            key={train.trip_number}
                            className="train-item"
                            onClick={() => onSelectTrain(train)}
                        >
                            {train.trip_number}
                        </div>
                    ))
                ) : (
                    <p>No trains found.</p>
                )}
            </div>
        </div>
    );
}

TrainList.propTypes = {
    trains: PropTypes.array.isRequired,
    onSelectTrain: PropTypes.func.isRequired,
};
