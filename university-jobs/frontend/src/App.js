import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateVacancyPage from './pages/CreateVacancyPage';
import DashboardPage from './pages/DashboardPage';
import VacancyDetail from './pages/VacancyDetail';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Alert from './components/Alert';

export default function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {alert && (
          <Alert 
            type={alert.type} 
            message={alert.message}
            onDismiss={() => setAlert(null)}
          />
        )}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/login" element={<LoginPage showAlert={showAlert} />} />
            <Route path="/register" element={<RegisterPage showAlert={showAlert} />} />
            <Route path="/vacancies/new" element={
              <PrivateRoute allowedRoles={['employer', 'admin']}>
                <CreateVacancyPage showAlert={showAlert} />
              </PrivateRoute>
            } />
            <Route path="/vacancy/:id" element={<VacancyDetail showAlert={showAlert} />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardPage showAlert={showAlert} />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}