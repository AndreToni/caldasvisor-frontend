import axios from "axios";
import { parseCookies } from "nookies";

/* export const api = axios.create({
    baseURL: 'http://localhost:8080/'
}) */

export function getApi(ctx?: any) {
    const { 'access_token': token } = parseCookies(ctx);
    const api = axios.create({
        baseURL: 'http://localhost:8080/'
        //baseURL: 'https://caldasvisor-backend-production.up.railway.app/'
    })
    if (token) api.defaults.headers['Authorization'] = `Bearer ${token}`;
    return api;
}
export const api = getApi();