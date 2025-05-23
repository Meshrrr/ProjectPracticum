import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage({ showAlert }) {
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      showAlert('success', 'Регистрация успешна! Теперь войдите в систему');
      navigate('/login');
    } catch (error) {
      showAlert('error', error.response?.data?.detail || 'Ошибка регистрации');
    }
  };

  return (
    <div className="register-page">
      <h2>Регистрация</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}