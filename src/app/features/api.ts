import axios from "axios";

// Assuming 'endpoint' is always a string
export const getData = async (endpoint: string): Promise<any> => {
  const response = await axios(
    `https://twitter-clone-api-2dtc.onrender.com/${endpoint}`
  );
  return response.data;
};

// Assuming 'data' can be of any type or null/undefined
export const postData = async (endpoint: string, data?: any): Promise<any> => {
  const response = await axios(
    `https://twitter-clone-api-2dtc.onrender.com/${endpoint}`,
    {
      method: "POST",
      data: data ?? {},
      withCredentials: true,
    }
  );
  return response.data;
};
