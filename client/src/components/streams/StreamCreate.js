import React from "react";
import StreamForm from "./StreamForm";
import { connect } from "react-redux";
// import { createStream } from "../../actions";
import { useStream } from "../../context/StreamContext";

const StreamCreate = () => {
  const { createStream } = useStream();
  const onSubmit = (formValues) => {
    createStream(formValues);
  };

  return (
    <div>
      <h3>Create Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default StreamCreate;
