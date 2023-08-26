import axios from "axios";

export const getData = async (endpoint) => {
  const response = await axios(`http://localhost:3001/${endpoint}`);
  return response.data;
};

export const postData = async (endpoint, data) => {
  const response = await axios(
    `http://localhost:3001/${endpoint}`,
    data
      ? {
          method: "POST",
          data: data,
          withCredentials: true,
        }
      : {
          method: "POST",
          date: {},
          withCredentials: true,
        }
  );
  return response.data;
};
