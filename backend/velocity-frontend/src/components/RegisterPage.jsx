import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  // УДАЛЕН ПРОБЕЛ ПОСЛЕ ПОРТА
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Пароли не совпадают');
      setMessageType('error');
      return;
    }

    // Валидация минимальной длины пароля
    if (formData.password.length < 8) {
      setMessage('Пароль должен содержать минимум 8 символов');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      // 1. Регистрация с username, email, password
      const registerResponse = await axios.post(`${API_URL}/api/register/`, {
        username: formData.username,  // ✅ ДОБАВЛЕНО
        email: formData.email,
        password: formData.password
      });

      // 2. Автологин (если бэкенд возвращает токен после регистрации)
      // Вариант А: Если сервер возвращает токен сразу
      if (registerResponse.data.access) {
        localStorage.setItem('access_token', registerResponse.data.access);
      } else {
        // Вариант Б: Если нужен отдельный логин (требует настройки JWT)
        const loginResponse = await axios.post(`${API_URL}/api/token/`, {
          username: formData.username,
          password: formData.password
        });
        localStorage.setItem('access_token', loginResponse.data.access);
      }

      setMessageType('success');
      setMessage('✅ Регистрация успешна! Вход выполнен.');

      setTimeout(() => {
        if (window.opener && !window.opener.closed) {
          window.opener.location.reload();
        }
        window.close();
      }, 800);

    } catch (err) {
      setMessageType('error');
      // ✅ Показываем конкретную ошибку от сервера
      if (err.response?.data) {
        const errors = Object.values(err.response.data).flat().join(', ');
        setMessage(`Ошибка: ${errors}`);
      } else {
        setMessage('Ошибка регистрации или входа');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="close-page-btn" onClick={() => window.close()}>&times;</button>

        <div className="register-header">
          <h1>Создать аккаунт</h1>
          <p>Добро пожаловать в Velocity</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин</label>
            <input
              type="text"
              placeholder="Введите логин"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              minLength={3}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
            />
          </div>
          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="register-submit-btn" disabled={loading}>
            {loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
          </button>
        </form>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;