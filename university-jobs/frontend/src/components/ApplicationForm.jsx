import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitApplication } from '../services/api';

export default function ApplicationForm({ vacancyId, showAlert }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitApplication({
        vacancy_id: vacancyId,
        cover_letter: coverLetter
      });
      showAlert('success', 'Заявка успешно отправлена!');
      navigate('/dashboard');
    } catch (error) {
      showAlert('error', error.response?.data?.detail || 'Ошибка при отправке');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Ваше сопроводительное письмо"
        required
        minLength="50"
      />
      <button 
        type="submit" 
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}