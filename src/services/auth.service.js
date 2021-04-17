import axios from "axios";

export const loginService = async (data) => {
  const res = await axios.post("https://reqres.in/api/login", data);

  return res.data;
};
