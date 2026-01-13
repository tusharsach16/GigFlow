import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const createBid = createAsyncThunk('bids/create', async (bidData, { rejectWithValue }) => {
  try {
    const {data} = await axios.post('/api/bids', bidData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create bid');
  }
});

export const getBidsByGig = createAsyncThunk('bids/getByGig', async (gigId, { rejectWithValue }) => {
  try {
    const {data} = await axios.get(`/api/bids/gig/${gigId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch bids');
  }
});

export const getMyBids = createAsyncThunk('bids/getMyBids', async (_, { rejectWithValue }) => {
  try {
    const {data} = await axios.get('/api/bids/my-bids');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch your bids');
  }
});

export const hireBid = createAsyncThunk('bids/hire', async (bidId, { rejectWithValue }) => {
  try {
    const {data} = await axios.patch(`/api/bids/${bidId}/hire`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to hire freelancer');
  }
});

const bidSlice = createSlice({
  name: 'bids',
  initialState: {
    myBids: [],
    gigBids: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids.unshift(action.payload.bid);
      })
      .addCase(createBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBidsByGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBidsByGig.fulfilled, (state, action) => {
        state.loading = false;
        state.gigBids = action.payload.bids;
      })
      .addCase(getBidsByGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload.bids;
      })
      .addCase(getMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(hireBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        state.loading = false;
        const bidId = action.payload.bid._id;
        state.gigBids = state.gigBids.map(bid =>
          bid._id === bidId ? { ...bid, status: 'hired' } : { ...bid, status: 'rejected' }
        );
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError} = bidSlice.actions;
export default bidSlice.reducer;