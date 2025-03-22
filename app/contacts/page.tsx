'use client';

import React from 'react';
import styles from './Contacts.module.scss';

const Contacts = () => {
  return (
    <div className={styles.contacts}>
        <div className={styles.container}>
            <div className={styles.contactsInfo}>
                <div className={styles.infoItem}>
                    <img src="./telephone.png" alt="tel" />
                    <span>+7 (993) 594-39-72</span>
                </div>
                <div className={styles.infoItem}>
                    <img src="./email.png" alt="email" />
                    <span>hotelontsvetnoy@yandex.ru</span>
                </div>
                <div className={styles.infoItem}>
                    <img src="./address.png" alt="address" />
                    <span>Москва, Цветной бульвар, 25, стр. 7</span>
                </div>
            </div>

            <div className={styles.mapContainer}>
                <img src="./carta.png" alt="Карта отеля" />
            </div>
        </div>
    </div>
  )
}

export default Contacts;
