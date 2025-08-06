import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
    baseURL: serverURL
});

// Add token in all requests if needed:
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("Token");
    if (token) config.headers.Authorization = `${token}`;
    return config;
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

// NOTE CRUD APIs
export const getNotes = () => api.get('/notes');
export const createNote = (data) => api.post('/notes', data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
