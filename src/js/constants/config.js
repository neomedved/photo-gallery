const { NODE_ENV } = process.env;
export const API_URL = 'https://jsonplaceholder.typicode.com', PUBLIC_URL = NODE_ENV === 'production' ? process.env.PUBLIC_URL : '';
