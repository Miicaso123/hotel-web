'use client';

import React from 'react';
import styles from './About.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';

const About = () => {
  const { t, i18n } = useTranslation('common');

  console.log('Текущий язык:', i18n.language); // Проверяем текущий язык

  return (
    <div className={styles.container}>
      <h1>{t('about')}</h1>
      <Image src="/image1.jpg" alt="our hotel" width={600} height={400} />
      <p className={styles.text}>{t('welcome')}</p>
    </div>
  );
};

export default appWithTranslation(About);
