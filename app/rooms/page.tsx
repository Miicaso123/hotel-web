'use client';

import React, { useState, useEffect } from 'react';
import ImageUploader from '../../components/ImageUploader';
import ImageDisplay from '../../components/ImageDisplay';
import styles from './Rooms.module.scss';
import MainDisplay from '@/components/MainDisplay';
import { useTranslation } from 'react-i18next';
import i18nextConfig from '@/next-i18next.config';
import { login, logout, checkAuth } from '../../redux/authSlice';

const Page: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  // const [isClient, setIsClient] = useState(false);
  const [currentLang, setCurrentLang] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // setIsClient(true);
    setCurrentLang(i18n.language || i18nextConfig.i18n.defaultLocale);
  }, [i18n.language]);

  return (
    <div className={styles.container}>
      <MainDisplay />
      {/* <h1>{isClient ? t('welcome') : ''}</h1> */}
      <div className={styles.uploader}>
        <ImageUploader category="rooms" />
      </div>
      <ImageDisplay category="rooms" />
    </div>
  );
};

export default Page;
