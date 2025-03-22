'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { createBooking } from '@/redux/bookingSlice';
import styles from './Booking.module.scss';
import MainDisplay from '@/components/MainDisplay';

const Booking = () => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guests: '1',
    promo: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const { checkin, checkout, guests, promo } = formData;

  //   if (!checkin || !checkout || !guests) {
  //     alert('All fields are required!');
  //     return;
  //   }

  //   console.log(formData);

  //   try {
  //     const response = await fetch('http://localhost:5000/bookings', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         checkin_date: checkin,
  //         checkout_date: checkout,
  //         guests: parseInt(guests),
  //         promo_code: promo,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Ошибка при отправке данных');
  //     }

  //     const result = await response.json();
  //     alert('Бронирование успешно создано! ID: ' + result.id);
  //   } catch (error) {
  //     console.error('Ошибка при бронировании:', error);
  //     alert('Ошибка при создании бронирования. Попробуйте снова.');
  //   }
  // };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { checkin, checkout, guests, promo } = formData;

    if (!checkin || !checkout || !guests) {
      alert('All fields are required!');
      return;
    }

    dispatch(
      createBooking({
        checkin_date: checkin,
        checkout_date: checkout,
        guests: parseInt(guests),
        promo_code: promo,
      }),
    );
  };

  return (
    <div className={styles.booking}>
      <MainDisplay />
      <div className={styles.container}>
        <h1 className={styles.title}>Бронирование</h1>
        <p className={styles.subtitle}>Выберите даты заезда, выезда и количество гостей</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="checkin">Дата заезда</label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="checkout">Дата выезда</label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="guests">Размещение в номере</label>
            <select id="guests" name="guests" value={formData.guests} onChange={handleChange}>
              <option value="1">1 взрослый</option>
              <option value="2">2 взрослых</option>
              <option value="3">3 взрослых</option>
              <option value="4">4 взрослых</option>
            </select>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="promo"
              name="promo"
              checked={formData.promo}
              onChange={handleChange}
            />
            <label htmlFor="promo">У меня есть промокод</label>
          </div>
          <button type="submit" className={styles.button}>
            Найти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
