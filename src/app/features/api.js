import axios from "axios";

export const getData = async (endpoint) => {
  const response = await axios(
    `https://twitter-clone-api-2dtc.onrender.com/${endpoint}`
  );
  return response.data;
};

export const postData = async (endpoint, data) => {
  const response = await axios(
    `https://twitter-clone-api-2dtc.onrender.com/${endpoint}`,
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
