import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL

const api = axios.create(
    {
        baseURL: serverURL
    }
)

export const googleAuth = (code)=> api.get(`/google?code=${code}`)