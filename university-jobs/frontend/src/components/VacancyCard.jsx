import React from 'react';
import { Link } from 'react-router-dom';

export default function VacancyCard({ vacancy }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{vacancy.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{vacancy.department}</h6>
        <p className="card-text">{vacancy.description.substring(0, 100)}...</p>
        <Link to={`/vacancy/${vacancy.id}`} className="btn btn-primary">
          Подробнее
        </Link>
      </div>
    </div>
  );
}
