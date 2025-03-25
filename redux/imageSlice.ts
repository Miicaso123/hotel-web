import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface Image {
  id: number;
  path: string;
  description: string;
}

interface ImageState {
  images: Image[];
  loading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  images: [],
  loading: false,
  error: null,
};

// axios.defaults.baseURL = process.env.BASE_URL;

export const uploadImage = createAsyncThunk(
  'images/uploadImage',
  async (
    { image, category, description }: { image: File; category: string; description: string },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('category', category);
      formData.append('description', description);

      console.log('Отправляемое описание:', formData.get('description'));

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки изображения');
    }
  },
);

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/images?category=${category}`);
      return response.data as Image[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки изображений');
    }
  },
);

//удаления
export const deleteImage = createAsyncThunk('images/deleteImage', async (id: number) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/images/${id}`);
  return id;
});

// Slice
const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Загрузка изображения
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<Image>) => {
        state.loading = false;
        state.images.push(action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Upload failed';
      })
      // Получение всех изображений
      .addCase(fetchImages.fulfilled, (state, action: PayloadAction<Image[]>) => {
        state.images = action.payload;
      })
      // Удаление изображения
      .addCase(deleteImage.pending, (state: ImageState) => {
        state.loading = true;
      })
      .addCase(deleteImage.fulfilled, (state: ImageState, action: PayloadAction<number>) => {
        state.loading = false;
        state.images = state.images.filter((image: Image) => image.id !== action.payload);
      })
      .addCase(
        deleteImage.rejected,
        (state: ImageState, action: ReturnType<typeof deleteImage.rejected>) => {
          state.loading = false;
          state.error = action.error.message || 'Delete failed';
        },
      );
  },
});

export default imageSlice.reducer;
