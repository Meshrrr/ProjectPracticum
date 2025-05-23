import React, { useEffect, useState } from 'react';
import { vacancies } from '../services/api';
import VacancyCard from '../components/VacancyCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home({ showAlert }) {
  const [vacanciesList, setVacancies] = useState([]);
  const [department, setDepartment] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        const { data } = await vacancies.getAll({ department });
        setVacancies(data);
      } catch (error) {
        showAlert('error', 'Ошибка загрузки вакансий');
      }
    };
    loadVacancies();
  }, [department])
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Доступные вакансии</h1>
        {currentUser?.role === 'employer' && (
          <Link to="/vacancies/new" className="btn btn-success">
            + Создать вакансию
          </Link>
        )}
      </div>
      
      <div className="mb-3">
        <select 
          className="form-select"
          value={department} 
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Все отделы</option>
          <option value="IT">IT</option>
          <option value="Администрация">Администрация</option>
          <option value="Наука">Наука</option>
        </select>
      </div>

      <div className="row">
        {vacanciesList.map(vacancy => (
          <div key={vacancy.id} className="col-md-4 mb-4">
            <VacancyCard vacancy={vacancy} />
          </div>
        ))}
      </div>
    </div>
  );
}
