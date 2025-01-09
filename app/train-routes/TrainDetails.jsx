"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchTrainData } from "./api";
import {
  Box,
  Text,
  Spinner,
  Alert,
//   AlertIcon,
  Heading,
  Table,
} from "@chakra-ui/react";

export default function TrainDetails({ selectedTrain, routes, date }) {
  const [seatDetails, setSeatDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch seat data
  const fetchSeatData = async (fromCity, toCity, dateOfJourney) => {
    try {
      setLoading(true);
      const seatData = await fetchTrainData(fromCity, toCity, dateOfJourney);

      if (seatData && seatData.data) {
        const newSeatData = [];
        seatData.data.trains.forEach((train) => {
          if (train.trip_number === selectedTrain.trip_number) {
            train.seat_types.forEach((seat) => {
              newSeatData.push({
                origin: train.origin_city_name,
                destination: train.destination_city_name,
                seatType: seat.type,
                availableSeats:
                  seat.seat_counts.online + seat.seat_counts.offline,
              });
            });
          }
        });
        setSeatDetails((prevData) => [...prevData, ...newSeatData]);
      } else {
        setError("No seat data available.");
      }
    } catch (err) {
      console.error("Error fetching seat data:", err);
      setError("Failed to fetch seat data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch seat data for each route when the component mounts or routes change
  useEffect(() => {
    if (routes && selectedTrain && date) {
      for (let i = 0; i < routes.length; i++) {
        for (let j = i + 1; j < routes.length; j++) {
          const fromCity = routes[i].city;
          const toCity = routes[j].city;
          fetchSeatData(fromCity, toCity, date);
        }
      }
    }
  }, [routes, selectedTrain, date]);

  if (!selectedTrain) {
    return <Text>Please select a train to view details.</Text>;
  }

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>
        Train Details: {selectedTrain.trip_number}
      </Heading>

      {/* <Heading size="md" mb={2}>
        Routes
      </Heading> */}
      {/* {routes && routes.length > 0 ? (
        <Box mb={4}>
          <ul>
            {routes.map((route, index) => (
              <li key={index}>
                <Text>{route.city}</Text>
              </li>
            ))}
          </ul>
        </Box>
      ) : (
        <Text>No routes available for this train.</Text>
      )} */}

      <Heading size="md" mb={2}>
        Seat Availability
      </Heading>
      {loading && (
        <Box textAlign="center" my={4}>
          <Spinner />
          <Text>Loading seat availability...</Text>
        </Box>
      )}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {seatDetails.length > 0 ? (
        <Table.ScrollArea borderWidth="1px" rounded="md" height="500px">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>Origin</Table.ColumnHeader>
                <Table.ColumnHeader>Destination</Table.ColumnHeader>
                <Table.ColumnHeader>Seat Type</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Available Seats
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {seatDetails.map((seat, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{seat.origin}</Table.Cell>
                  <Table.Cell>{seat.destination}</Table.Cell>
                  <Table.Cell>{seat.seatType}</Table.Cell>
                  <Table.Cell textAlign="end">
                    {seat.availableSeats}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      ) : (
        !loading && <Text>No seat availability data for this train.</Text>
      )}
    </Box>
  );
}

TrainDetails.propTypes = {
  selectedTrain: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
};
