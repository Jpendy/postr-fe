import { get } from "./request";

export const verify = () => get('/api/v1/auth/verify')
