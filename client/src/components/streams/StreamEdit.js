import React, { useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import { useStream } from "../../context/StreamContext";

const StreamEdit = () => {
  const [stream, setStream] = useState([]);
  const { fetchStream, editStream } = useStream();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const getStream = async () => {
      const data = await fetchStream(id);
      setStream(data);
    };

    getStream();
  }, []);

  const onSubmit = async (formValues) => {
    await editStream(id, formValues);
  };

  if (!stream) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h3>Edit Stream</h3>
      <StreamForm
        initialValues={_.pick(stream, "title", "description")} // pick is going to take the title and description from our form value
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default StreamEdit;
