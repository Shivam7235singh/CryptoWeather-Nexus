import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  return res.json();
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
