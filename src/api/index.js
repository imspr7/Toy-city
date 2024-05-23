import axios from "axios";

const URL = "https://kid-city.onrender.com";



export default axios.create({
  baseURL: URL,
});

