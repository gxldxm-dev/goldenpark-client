import axios from 'axios';

export const API_URL = "http://localhost:3000/api"

export const api = {
    studios: {
        delete: (id: string) => axios.delete(`${API_URL}/studios/${id}`),
    }
}