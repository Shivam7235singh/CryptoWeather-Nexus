import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather as fetchWeatherAPI } from "@/utils/api"; 

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
  const data = await fetchWeatherAPI(city);
  return { city, data };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {}, // multiple cities
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { city, data } = action.payload;
        state.data[city] = data;
        state.status = "succeeded";
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
