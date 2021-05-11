import { get, post } from "./request";

export const verifyUser = () => get('/api/v1/auth/verify')

export const fetchPostrSignup = body => post('/api/v1/auth/postr-signup', body)

export const fetchGoogleOAuth = () => window.location.assign('http://localhost:7890/api/v1/auth/google-login')

export const fetchPostrLogin = body => post('/api/v1/auth/postr-login', body)

export const fetchLogout = () => get('/api/v1/auth/logout')
