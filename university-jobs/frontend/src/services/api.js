import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const errorData = error.response.data;
      const errorMessage = errorData.detail || 
                         (errorData.errors ? JSON.stringify(errorData.errors) : 'Произошла ошибка');
      
      return Promise.reject({
        status: error.response.status,
        message: errorMessage,
        data: errorData
      });
    }
    return Promise.reject({
      status: 500,
      message: 'Нет соединения с сервером'
    });
  }
);

export const auth = {
  login: (credentials) => API.post('/token', {
    email: credentials.email,
    password: credentials.password
  }),
  register: (userData) => API.post('/register', userData),
  getCurrentUser: () => API.get('/users/me')
};

export const vacancies = {
  getAll: (params = {}) => API.get('/vacancies', { params }),
  getById: (id) => API.get(`/vacancies/${id}`),
  create: (vacancyData) => API.post('/vacancies', vacancyData)
};

export const applications = {
  create: (applicationData) => API.post('/applications', applicationData),
  getMine: () => API.get('/applications/me')
};

export const login = auth.login;
export const register = auth.register;
export const fetchCurrentUser = auth.getCurrentUser;
export const fetchVacancies = vacancies.getAll;
export const fetchVacancyDetails = vacancies.getById;
export const submitApplication = applications.create;
export const fetchApplications = applications.getMine;