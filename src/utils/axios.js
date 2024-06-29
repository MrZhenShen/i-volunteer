import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://volunteer.ldubgd.edu.ua',
    timeout: 10000, // Set a timeout if needed
    headers: { 'Content-Type': 'application/json' }
});

export default instance;
