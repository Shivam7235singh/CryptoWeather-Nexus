import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// https://newsdata.io/api/1/archive?apikey=pub_7797268aff8a21eb026533ed940fceb488564&q=example&language=en&from_date=2023-01-19&to_date=2023-01-25
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&category=crypto`);
  return res.json();
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    data: [],  
    loading: false,
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
