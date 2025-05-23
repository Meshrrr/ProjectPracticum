import React, { useEffect, useState } from 'react';
import { fetchApplications } from '../services/api';
import ApplicationList from '../components/ApplicationList';

export default function DashboardPage({ showAlert }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const { data } = await fetchApplications();
        setApplications(data);
      } catch (error) {
        showAlert('error', 'Ошибка загрузки заявок');
      }
    };
    loadApplications();
  }, []);

  return (
    <div className="dashboard">
      <h2>Мои заявки</h2>
      <ApplicationList applications={applications} />
    </div>
  );
}
