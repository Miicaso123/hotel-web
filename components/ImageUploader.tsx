'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { uploadImage, fetchImages } from '../redux/imageSlice';

interface Props {
  category: string;
}

const ImageUpload: React.FC<Props> = ({ category }) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !description.trim()) return;

    try {
      await dispatch(uploadImage({ image: file, category, description })).unwrap();
      await dispatch(fetchImages(category)).unwrap(); 
      setFile(null);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fileInput">File:</label>
      <input id="fileInput" type="file" onChange={handleFileChange} />

      <label htmlFor="description">Description:</label>
      <input id="description" type="text" value={description} onChange={handleDescriptionChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default ImageUpload;
