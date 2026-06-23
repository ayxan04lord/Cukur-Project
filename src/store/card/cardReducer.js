import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetLikes, apiToggleLike, apiGetBasket, apiToggleBasket } from '../../services/api';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchLikes = createAsyncThunk(
  'card/fetchLikes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiGetLikes();
      return data.liked;        // number[]
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchBasket = createAsyncThunk(
  'card/fetchBasket',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiGetBasket();
      return data.basket;       // number[]
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const toggleLikeThunk = createAsyncThunk(
  'card/toggleLike',
  async (personId, { rejectWithValue }) => {
    try {
      const data = await apiToggleLike(personId);
      return { personId, liked: data.liked };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const toggleBasketThunk = createAsyncThunk(
  'card/toggleBasket',
  async (personId, { rejectWithValue }) => {
    try {
      const data = await apiToggleBasket(personId);
      return { personId, inBasket: data.inBasket };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  likedItems:    [],   // person id[]
  basketItems:   [],   // person id[]
  loadingLikes:  false,
  loadingBasket: false,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    // Optimistik UI toggle (server cavabı gəlməzdən əvvəl)
    toggleLike: (state, action) => {
      const id = action.payload;
      state.likedItems = state.likedItems.includes(id)
        ? state.likedItems.filter((x) => x !== id)
        : [...state.likedItems, id];
    },
    toggleBasket: (state, action) => {
      const id = action.payload;
      state.basketItems = state.basketItems.includes(id)
        ? state.basketItems.filter((x) => x !== id)
        : [...state.basketItems, id];
    },
    // Logout olduqda state-i sıfırla
    clearUserData: (state) => {
      state.likedItems  = [];
      state.basketItems = [];
    },
  },
  extraReducers: (builder) => {
    // fetchLikes
    builder
      .addCase(fetchLikes.pending,   (s) => { s.loadingLikes = true; })
      .addCase(fetchLikes.fulfilled, (s, a) => { s.loadingLikes = false; s.likedItems = a.payload; })
      .addCase(fetchLikes.rejected,  (s) => { s.loadingLikes = false; });

    // fetchBasket
    builder
      .addCase(fetchBasket.pending,   (s) => { s.loadingBasket = true; })
      .addCase(fetchBasket.fulfilled, (s, a) => { s.loadingBasket = false; s.basketItems = a.payload; })
      .addCase(fetchBasket.rejected,  (s) => { s.loadingBasket = false; });

    // toggleLikeThunk — server cavabı ilə dəqiq sinxronizasiya
    builder.addCase(toggleLikeThunk.fulfilled, (s, a) => {
      const { personId, liked } = a.payload;
      s.likedItems = liked
        ? [...new Set([...s.likedItems, personId])]
        : s.likedItems.filter((x) => x !== personId);
    });

    // toggleBasketThunk
    builder.addCase(toggleBasketThunk.fulfilled, (s, a) => {
      const { personId, inBasket } = a.payload;
      s.basketItems = inBasket
        ? [...new Set([...s.basketItems, personId])]
        : s.basketItems.filter((x) => x !== personId);
    });
  },
});

export const { toggleLike, toggleBasket, clearUserData } = cardSlice.actions;

// Geriyə uyğunluq aliasları
export const addLikes   = toggleLike;
export const addBaskets = toggleBasket;
export const addMovies  = () => ({ type: 'noop' }); // artıq istifadə edilmir

export default cardSlice.reducer;
