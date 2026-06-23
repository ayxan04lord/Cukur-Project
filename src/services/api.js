/**
 * Django REST API ilə bütün əlaqələr buradan keçir.
 * BASE_URL-i .env ilə idarə etmək olar: VITE_API_URL
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const getToken = () => localStorage.getItem('cukur_token');

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Token ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 204) return null;

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.detail ||
      Object.values(data).flat().join(' ') ||
      'Xəta baş verdi.';
    throw new Error(message);
  }

  return data;
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const apiRegister = (payload) =>
  apiFetch('/auth/register/', { method: 'POST', body: JSON.stringify(payload) });

export const apiLogin = (payload) =>
  apiFetch('/auth/login/', { method: 'POST', body: JSON.stringify(payload) });

export const apiLogout = () =>
  apiFetch('/auth/logout/', { method: 'POST' });

export const apiMe = () =>
  apiFetch('/auth/me/');

// ─── CONTENT (public) ─────────────────────────────────────────────────────────
export const apiGetPersons  = () => apiFetch('/persons/');
export const apiGetSeasons  = () => apiFetch('/seasons/');
export const apiGetSlides   = () => apiFetch('/slides/');

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
export const apiGetQuizQuestions = (queryString = '') =>
  apiFetch(`/quiz/questions/${queryString ? '?' + queryString : ''}`);

// ─── LIKES ────────────────────────────────────────────────────────────────────
export const apiGetLikes    = () =>
  apiFetch('/likes/');

export const apiToggleLike  = (person_id) =>
  apiFetch('/likes/toggle/', { method: 'POST', body: JSON.stringify({ person_id }) });

// ─── BASKET ───────────────────────────────────────────────────────────────────
export const apiGetBasket   = () =>
  apiFetch('/basket/');

export const apiToggleBasket = (person_id) =>
  apiFetch('/basket/toggle/', { method: 'POST', body: JSON.stringify({ person_id }) });
