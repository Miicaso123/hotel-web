'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchBookings } from '@/redux/bookingSlice';
import { login, logout, checkAuth } from '../../redux/authSlice';
import styles from './Admin.module.scss';

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const status = useSelector((state: RootState) => state.booking.status);
  const error = useSelector((state: RootState) => state.booking.error);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isRegistering ? 'register' : 'login';

    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginInput, password: passwordInput }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        dispatch(login(data.username)); // Логиним пользователя
      } else {
        alert(data.message || 'Ошибка');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка сервера');
    }
  };

  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        {!isAuthenticated ? (
          <form className={styles.form} onSubmit={handleAuth}>
            <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
            <label htmlFor="login">Логин</label>
            <input
              className={styles.input}
              id="login"
              type="text"
              placeholder="Введите логин"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
            />
            <label htmlFor="password">Пароль</label>
            <input
              className={styles.input}
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            <button className={styles.button} type="submit">
              {isRegistering ? 'Зарегистрироваться' : 'Войти'}
            </button>
            <p className={styles.toggle} onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
            </p>
          </form>
        ) : (
          <div className={styles.adminPanel}>
            <h2>Добро пожаловать, {user}!</h2>
            <p>Здесь будут приходить данные из MySQL...</p>
            <ul>
              {status === 'loading' ? (
                <p>Загрузка...</p>
              ) : bookings.length > 0 ? (
                bookings.map((booking: any) => (
                  <li key={booking.id}>
                    {`Заезд: ${booking.checkin_date}, Выезд: ${booking.checkout_date}, Гостей: ${
                      booking.guests
                    }, Промокод: ${booking.promo_code ? 'Да' : 'Нет'}`}
                  </li>
                ))
              ) : (
                <p>Нет бронирований</p>
              )}
            </ul>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                dispatch(logout());
              }}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
