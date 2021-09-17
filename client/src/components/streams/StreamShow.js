import React, { useEffect, useState } from "react";
import { useStream } from "../../context/StreamContext";

const StreamShow = () => {
  const [stream, setStream] = useState([]);

  const { fetchStream } = useStream();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const getStream = async () => {
      const data = await fetchStream(id);
      setStream(data);
    };

    getStream();
  }, []);

  if (!stream) {
    return <div>Loading...</div>;
  }

  const { title, description } = stream;
  return (
    <div>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

export default StreamShow;
