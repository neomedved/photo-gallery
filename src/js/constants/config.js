const { NODE_ENV } = process.env;
const API_URL = 'https://jsonplaceholder.typicode.com';
const PUBLIC_URL = NODE_ENV === 'production' ? process.env.PUBLIC_URL : '';
export { API_URL, PUBLIC_URL };
