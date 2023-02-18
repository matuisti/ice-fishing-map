import axios from "axios";

export const getPoints = async () => {
  return axios
    .get("/api/v1.0/geo/point")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
