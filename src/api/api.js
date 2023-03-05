import axios from 'axios';
const baseURL = 'http://localhost:8000/';
console.log("🚀 ~ file: api.js ~ line 3 ~ baseURL", baseURL)

const API = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});
console.log("🚀 ~ file: api.js ~ line 10 ~ API", JSON.stringify(API))

export default API;
