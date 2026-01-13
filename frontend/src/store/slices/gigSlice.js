import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getAllGigs = createAsyncThunk('gigs/getAll', async(search='', {rejectWithValue}) => {
  try {
    const {data} = await axios.get(`/api/gigs${search ? `?search=${search}` : ''}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Fetching gigs failed');
  }
});

export const getGigById = createAsyncThunk('gigs/getById', async(gigId, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(`/api/gigs/${gigId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Fetching gig failed');
  }
});

export const getMyGigs = createAsyncThunk('gigs/getMyGigs', async (_, { rejectWithValue }) => {
  try {
    const {data} = await axios.get('/api/gigs/my-gigs');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch your gigs');
  }
});

export const createGig = createAsyncThunk('gigs/create', async (gigData, { rejectWithValue }) => {
  try {
    const {data} = await axios.post('/api/gigs', gigData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create gig');
  }
});

export const updateGig = createAsyncThunk('gigs/update', async ({ id, gigData }, { rejectWithValue }) => {
  try {
    const {data} = await axios.patch(`/api/gigs/${id}`, gigData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update gig');
  }
});

export const deleteGig = createAsyncThunk('gigs/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/gigs/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete gig');
  }
});

const gigSlice = createSlice({
  name: 'gig',
  initialState: {
    gigs: [],
    myGigs: [],
    selectedGig: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedGig: (state) => {
      state.selectedGig = null;
    }
  },
  extraReducers: (builder) => {
    builder 
      .addCase(getAllGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload.gigs || action.payload.data || [];
      })
      .addCase(getAllGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getGigById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGigById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGig = action.payload.gig || action.payload.data;
      })
      .addCase(getGigById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs = action.payload.gigs || action.payload.data || [];
      })
      .addCase(getMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false;
        const newGig = action.payload.gig || action.payload.data;
        state.myGigs.unshift(newGig);
        state.gigs.unshift(newGig);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.myGigs = state.myGigs.filter(gig => gig._id !== action.payload);
        state.gigs = state.gigs.filter(gig => gig._id !== action.payload);
      });
  }
});

export const { clearError, clearSelectedGig } = gigSlice.actions;
export default gigSlice.reducer;