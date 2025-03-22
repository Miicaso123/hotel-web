'use client';

import React from 'react';
import ImageUploader from '../../components/ImageUploader';
import ImageDisplay from '../../components/ImageDisplay';
import styles from './Services.module.scss';
import MainDisplay from '@/components/MainDisplay';

const page: React.FC = () => {

  return (
    <div className={styles.container}>
      <MainDisplay/>
      <h1>Сервисы</h1>
      <div className={styles.uploader}>
        <ImageUploader category="services"/>
      </div>
      <ImageDisplay category="services"/>
    </div>
  )
}

export default page
