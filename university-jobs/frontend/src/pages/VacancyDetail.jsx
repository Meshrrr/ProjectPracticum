import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchVacancyDetails } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';

export default function VacancyDetail({ showAlert }) {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await fetchVacancyDetails(id);
        setVacancy(data);
      } catch (error) {
        showAlert('error', 'Ошибка загрузки вакансии');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!vacancy) return <div>Вакансия не найдена</div>;

  return (
    <div className="vacancy-detail">
      <h1>{vacancy.title}</h1>
      <h3>{vacancy.department}</h3>
      <p>{vacancy.description}</p>
      
      {currentUser?.role === 'student' && (
        <ApplicationForm 
          vacancyId={id} 
          showAlert={showAlert} 
        />
      )}
    </div>
  );
}