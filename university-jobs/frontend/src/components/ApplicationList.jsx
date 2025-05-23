import React from 'react';

export default function ApplicationList({ applications }) {
  if (!applications.length) {
    return <p>У вас пока нет активных заявок</p>;
  }

  return (
    <div className="application-list">
      {applications.map(app => (
        <div key={app.id} className="application-card">
          <h4>Вакансия: {app.vacancy.title}</h4>
          <p>Статус: {app.status}</p>
          <p>Отдел: {app.vacancy.department}</p>
        </div>
      ))}
    </div>
  );
}