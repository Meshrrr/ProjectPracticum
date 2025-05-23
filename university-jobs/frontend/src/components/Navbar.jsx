import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Университетские вакансии</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Главная</Link>
          
          {currentUser?.role === 'employer' && (
            <Link className="nav-link" to="/vacancies/new">Создать вакансию</Link>
          )}
          
          {currentUser ? (
            <Link className="nav-link" to="/dashboard">Личный кабинет</Link>
          ) : (
            <>
              <Link className="nav-link" to="/login">Вход</Link>
              <Link className="nav-link" to="/register">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}