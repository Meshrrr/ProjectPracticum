import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vacancies } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CreateVacancyPage({ showAlert }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'IT'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await vacancies.create(formData);
      showAlert('success', 'Вакансия успешно создана!');
      navigate('/');
    } catch (err) {
      showAlert('error', err.message || 'Ошибка при создании вакансии');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser || !['employer', 'admin'].includes(currentUser.role)) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Доступ запрещен. Только работодатели могут создавать вакансии.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Создать вакансию</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Название вакансии</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Описание</label>
          <textarea
            className="form-control"
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Отдел</label>
          <select
            className="form-select"
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            required
          >
            <option value="IT">IT</option>
            <option value="Администрация">Администрация</option>
            <option value="Образование">Образование</option>
            <option value="Наука">Наука</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Создание...' : 'Создать вакансию'}
        </button>
      </form>
    </div>
  );
}