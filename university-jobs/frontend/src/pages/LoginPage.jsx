import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginResponse = await auth.login({ email, password });
      localStorage.setItem('token', loginResponse.data.access_token);

      const userResponse = await auth.getCurrentUser();
      setCurrentUser(userResponse.data);

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Ошибка входа. Проверьте данные и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Вход в систему</h2>
              
              {error && (
                <div className="alert alert-danger">
                  {typeof error === 'string' ? error : JSON.stringify(error)}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Пароль</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Вход...' : 'Войти'}
                </button>
              </form>

              <div className="mt-3 text-center">
                <p>Нет аккаунта? <a href="/register">Зарегистрируйтесь</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
