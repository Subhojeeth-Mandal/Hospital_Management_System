import axios from 'axios';

// The baseURL should include /api ONCE
const API = axios.create({
    baseURL: 'http://localhost:8080/api', 
});

export const patientAPI = {
    // These paths should NOT start with /api again
    getAll: () => API.get('/patients'), 
    create: (data) => API.post('/patients', data),
    delete: (id) => API.delete(`/patients/${id}`)
};

export const doctorAPI = {
    getAll: () => API.get('/doctors'),
    create: (data) => API.post('/doctors', data)
};

export const appointmentAPI = {
    getAll: () => API.get('/appointments'),
    create: (data) => API.post('/appointments', data)
};

export const billAPI = {
    getByPatient: (id) => API.get(`/bills/patient/${id}`),
    create: (data) => API.post('/bills', data)
};