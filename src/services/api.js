import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const signup = (email, password) => api.post('/signup', { email, password })
export const login = (email, password) => api.post('/login', { email, password })
export const saveNote = (token, note) => api.post('/saveNote', note, { headers: { Authorization: `Bearer ${token}` } })
export const saveMindmap = (token, mindmap) => api.post('/saveMindmap', mindmap, { headers: { Authorization: `Bearer ${token}` } })
export const getData = (token) => api.get('/getData', { headers: { Authorization: `Bearer ${token}` } })
