import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRegister, apiLogin, apiLogout, apiMe } from '../../services/api';

// ─── localStorage helpers ─────────────────────────────────────────────────────

const saveSession = (token, user) => {
  localStorage.setItem('cukur_token', token);
  localStorage.setItem('cukur_current_user', JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem('cukur_token');
  localStorage.removeItem('cukur_current_user');
};

const loadCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('cukur_current_user')) || null;
  } catch {
    return null;
  }
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await apiRegister(payload);
      saveSession(data.token, data.user);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await apiLogin(payload);
      saveSession(data.token, data.user);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiLogout();
    } catch {
      // Token artıq yoxdursa belə local sessiyanı sil
    } finally {
      clearSession();
    }
  }
);

export const fetchMeThunk = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      return await apiMe();
    } catch (err) {
      clearSession();
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  currentUser: loadCurrentUser(),
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },

    updateAvatar: (state, action) => {
      if (!state.currentUser) return;
      state.currentUser.avatar = action.payload;
      localStorage.setItem('cukur_current_user', JSON.stringify(state.currentUser));
    },

    updateProfile: (state, action) => {
      if (!state.currentUser) return;
      const { username, bio } = action.payload;
      state.currentUser.username = username;
      state.currentUser.bio = bio;
      localStorage.setItem('cukur_current_user', JSON.stringify(state.currentUser));
    },
  },

  extraReducers: (builder) => {
    // ── Register ──
    builder
      .addCase(registerThunk.pending,  (state) => { state.loading = true;  state.error = null; })
      .addCase(registerThunk.fulfilled,(state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── Login ──
    builder
      .addCase(loginThunk.pending,  (state) => { state.loading = true; state.error = null; })
      .addCase(loginThunk.fulfilled,(state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── Logout ──
    builder
      .addCase(logoutThunk.fulfilled, (state) => {
        state.currentUser = null;
        state.error = null;
        state.loading = false;
      });

    // ── Fetch Me ──
    builder
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.currentUser = null;
      });
  },
});

export const { clearError, updateAvatar, updateProfile } = authSlice.actions;

// Köhnə komponentlərlə uyğunluq üçün alias-lar
// (Login/Register formları dispatch(login(...)) işlətdikdə işləsin)
export const login    = loginThunk;
export const register = registerThunk;
export const logout   = logoutThunk;

export default authSlice.reducer;
