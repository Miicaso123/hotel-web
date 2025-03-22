import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Типизация данных о бронировании
interface Booking {
  id?: number;
  checkin_date: string;
  checkout_date: string;
  guests: number;
  promo_code: boolean;
}

// Начальное состояние
interface BookingState {
  bookings: Booking[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  status: "idle",
  error: null,
};

// Асинхронное действие: получение всех бронирований
export const fetchBookings = createAsyncThunk("bookings/fetch", async () => {
  const response = await fetch("http://localhost:5000/bookings");
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  return (await response.json()) as Booking[];
});

// Асинхронное действие: создание бронирования
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (newBooking: Booking, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });

      if (!response.ok) throw new Error("Ошибка при создании бронирования");

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка загрузки";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      });
  },
});

export default bookingSlice.reducer;
