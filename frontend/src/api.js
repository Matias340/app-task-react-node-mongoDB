import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api/task' });

export const fetchTask = () => API.get('/');
export const createTask = (newItem) => API.post('/', newItem);
export const updateTask = (id, updatedItem) => API.put(`/${id}`, updatedItem);
export const deleteTask = (id) => API.delete(`/${id}`);