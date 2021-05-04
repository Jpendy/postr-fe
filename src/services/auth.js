import { get } from "./request";

export const verifyUser = () => get('/api/v1/auth/verify')

export const login = () => window.location.assign('http://localhost:7890/api/v1/auth/google-login')

export const fetchLogout = () => get('/api/v1/auth/logout')
