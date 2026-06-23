/**
 * contentReducer — persons, seasons, slides üçün.
 * Bütün məlumatlar backend API-dan gəlir.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetPersons, apiGetSeasons, apiGetSlides } from '../../services/api';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchPersons = createAsyncThunk(
  'content/fetchPersons',
  async (_, { rejectWithValue }) => {
    try {
      return await apiGetPersons();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSeasons = createAsyncThunk(
  'content/fetchSeasons',
  async (_, { rejectWithValue }) => {
    try {
      return await apiGetSeasons();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSlides = createAsyncThunk(
  'content/fetchSlides',
  async (_, { rejectWithValue }) => {
    try {
      return await apiGetSlides();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  persons:  [],
  seasons:  [],
  slides:   [],

  personsLoading: false,
  seasonsLoading: false,
  slidesLoading:  false,

  personsError: null,
  seasonsError: null,
  slidesError:  null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // persons
    builder
      .addCase(fetchPersons.pending,   (s) => { s.personsLoading = true;  s.personsError = null; })
      .addCase(fetchPersons.fulfilled, (s, a) => { s.personsLoading = false; s.persons = a.payload; })
      .addCase(fetchPersons.rejected,  (s, a) => { s.personsLoading = false; s.personsError = a.payload; });

    // seasons
    builder
      .addCase(fetchSeasons.pending,   (s) => { s.seasonsLoading = true;  s.seasonsError = null; })
      .addCase(fetchSeasons.fulfilled, (s, a) => { s.seasonsLoading = false; s.seasons = a.payload; })
      .addCase(fetchSeasons.rejected,  (s, a) => { s.seasonsLoading = false; s.seasonsError = a.payload; });

    // slides
    builder
      .addCase(fetchSlides.pending,   (s) => { s.slidesLoading = true;  s.slidesError = null; })
      .addCase(fetchSlides.fulfilled, (s, a) => { s.slidesLoading = false; s.slides = a.payload; })
      .addCase(fetchSlides.rejected,  (s, a) => { s.slidesLoading = false; s.slidesError = a.payload; });
  },
});

export default contentSlice.reducer;
