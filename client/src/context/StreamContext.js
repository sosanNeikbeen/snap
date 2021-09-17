import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const StreamContext = createContext();

export const useStream = () => {
  return useContext(StreamContext);
};

export const StreamProvider = ({ children }) => {
  // const [streams, setStreams] = useState([]);

  // const createStream = (data) => {
  //   axios
  //     .post("/streams", data)
  //     .then(function () {
  //       console.log("added");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const fetchStream = async (id) => {
  //   const res = await fetch(`/streams/${id}`);
  //   const result = await res.json();
  //   return result.stream;
  // };

  // const editStream = async (id, data) => {
  //   await axios
  //     .put(`/streams/edit/${id}`, data)
  //     .then(function () {
  //       console.log("updated");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   const fetchStreams = async () => {
  //     const res = await fetch("/streams");
  //     const result = await res.json();
  //     setStreams(result.streams);
  //   };
  //   fetchStreams();
  // }, []);

  const value = {
    // streams,
    // createStream,
    // fetchStream,
    // editStream,
  };

  return (
    <StreamContext.Provider value={value}>{children}</StreamContext.Provider>
  );
};
