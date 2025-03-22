import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ImageUpload from '../components/ImageUploader';
import { uploadImage, fetchImages } from '../redux/imageSlice';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { jest } from '@jest/globals';

const mockStore = configureStore([]);
const mockDispatch = jest.fn() as jest.MockedFunction<Dispatch<AnyAction>>;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../redux/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('../redux/imageSlice', () => ({
  uploadImage: jest.fn(() => async () => ({ unwrap: async () => ({ success: true }) })),
  fetchImages: jest.fn(() => async () => ({ unwrap: async () => [{ id: 1, url: 'test-url' }] })),
}));


describe('uploadImage thunk', () => {
  let dispatch: jest.MockedFunction<Dispatch<AnyAction>>;

  beforeEach(() => {
    dispatch = jest.fn() as jest.MockedFunction<Dispatch<AnyAction>>;
  });

  it('должен отправить изображение и вернуть данные', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { url: 'http://localhost:5000/uploads/image.png' },
    });

    const result = await uploadImage({
      image: new File([], 'test.png'),
      category: 'test',
    })(dispatch, jest.fn(), undefined);

    expect(dispatch).toHaveBeenCalled();
});

  it('должен обработать ошибку', async () => {
    const getState = jest.fn();
    mockedAxios.post.mockRejectedValue(new Error('Ошибка загрузки'));

    const result = await uploadImage({ image: new File([], 'test.png'), category: 'test' })(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledTimes(2); // 1 раз при pending, 1 раз при rejected
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'images/uploadImage/pending' }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'images/uploadImage/rejected' }));
  });
});


describe('ImageUploader Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ images: { images: [], loading: false, error: null } })

    render(
      <Provider store={store}>
        <ImageUpload category="test-category" />
      </Provider>
    );
  });

  it('должен отобразить input и кнопку', () => {
    expect(screen.getByRole('button', { name: /upload image/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/file/i)).toBeInTheDocument();
  });

  it('должен обновлять состояние при выборе файла', () => {
    const fileInput = screen.getByLabelText(/file:/i) as HTMLInputElement;
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toBe(file);
  });

  it('должен диспатчить uploadImage и fetchImages при отправке формы', async () => {
    const fileInput = screen.getByLabelText(/file/i) as HTMLInputElement;
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(screen.getByRole('button', { name: /upload image/i }));

    // Ожидаем вызов dispatch с uploadImage
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

    // Дожидаемся завершения всех асинхронных операций
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Проверяем вызов fetchImages
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});

