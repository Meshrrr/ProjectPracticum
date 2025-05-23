import React, { useState } from 'react';

export default function RegisterForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Студент</option>
        <option value="employer">Работодатель</option>
      </select>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}