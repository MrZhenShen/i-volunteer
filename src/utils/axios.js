import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://100.65.1.159:8443',
    timeout: 10000, // Set a timeout if needed
    headers: { 'Content-Type': 'application/json' }
});

export default instance;
