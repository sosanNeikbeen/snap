import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/",
});

export const createStream = (data) => {
  axios
    .post("/streams", data)
    .then(function () {
      console.log("added");
    })
    .catch(function (error) {
      console.log(error);
    });
};
