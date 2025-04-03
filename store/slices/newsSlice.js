import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&category=crypto`);
  return res.json();
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.results;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
