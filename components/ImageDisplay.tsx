'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { fetchImages, deleteImage } from '../redux/imageSlice';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import styles from './ImageDisplay.module.scss';

interface Props {
  category: string;
}

const ImageDisplay: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();
  const { images, loading, error } = useSelector((state: RootState) => state.image);

  useEffect(() => {
    dispatch(fetchImages(category));
  }, [dispatch, category]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      dispatch(deleteImage(id));
    }
  };

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`${styles.row} ${index % 2 === 0 ? styles.normal : styles.reversed}`}>
          <div className={styles.description}>
            <h2>Номер {index + 1}</h2>
            <p>{image.description || 'Описание отсутствует'}</p>
          </div>

          <div className={styles['image-item']}>
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.path}`} alt="Uploaded" />
            <button onClick={() => handleDelete(image.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
