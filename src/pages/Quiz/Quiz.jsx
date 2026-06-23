import { useState, useCallback } from 'react';
import { apiGetQuizQuestions } from '../../services/api';
import './Quiz.css';

const DIFFICULTIES = [
  { val: 'all',    label: 'Hamısı',  icon: '🎯' },
  { val: 'easy',   label: 'Asan',    icon: '🟢' },
  { val: 'medium', label: 'Orta',    icon: '🟡' },
  { val: 'hard',   label: 'Çətin',   icon: '🔴' },
];

const CATEGORIES = [
  { val: 'all',        label: 'Hamısı' },
  { val: 'characters', label: 'Personajlar' },
  { val: 'events',     label: 'Hadisələr' },
  { val: 'family',     label: 'Koçovalı Ailəsi' },
  { val: 'enemies',    label: 'Düşmənlər' },
  { val: 'romance',    label: 'Sevgi Xətləri' },
  { val: 'general',    label: 'Ümumi' },
];

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

const Quiz = () => {
  const [screen,     setScreen]     = useState('intro');   // 'intro'|'loading'|'quiz'|'result'
  const [difficulty, setDifficulty] = useState('all');
  const [category,   setCategory]   = useState('all');

  const [questions, setQuestions] = useState([]);
  const [current,   setCurrent]   = useState(0);
  const [score,     setScore]     = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [answered,  setAnswered]  = useState(false);
  const [error,     setError]     = useState('');

  const question = questions[current];

  // ── Başlat ──
  const handleStart = async () => {
    setScreen('loading');
    setError('');
    try {
      const params = new URLSearchParams({ limit: 10 });
      if (difficulty !== 'all') params.set('difficulty', difficulty);
      if (category   !== 'all') params.set('category',   category);
      const data = await apiGetQuizQuestions(params.toString());
      if (!data || data.length === 0) {
        setError('Bu filtr üçün sual tapılmadı. Başqa seçim yoxla.');
        setScreen('intro');
        return;
      }
      setQuestions(data);
      setCurrent(0);
      setScore(0);
      setSelected(null);
      setAnswered(false);
      setScreen('quiz');
    } catch (err) {
      setError('Server ilə əlaqə qurulmadı. Django serveri işləyirmi?');
      setScreen('intro');
    }
  };

  const handleAnswer = useCallback((optionKey) => {
    if (answered) return;
    setSelected(optionKey);
    setAnswered(true);
    if (optionKey === question.correct) setScore((s) => s + 1);
  }, [answered, question]);

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setScreen('result');
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setScreen('intro');
    setQuestions([]);
  };

  const getOptionText = (q, key) => {
    const map = { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d };
    return map[key];
  };

  const getResultMsg = () => {
    const pct = (score / questions.length) * 100;
    if (pct === 100) return { text: 'Mükəmməl! Sən Çukur ustasısan! 🏆', color: '#f1c40f' };
    if (pct >= 80)   return { text: 'Əla nəticə! Çukur-u yaxşı tanıyırsan! 🌟', color: '#2ecc71' };
    if (pct >= 60)   return { text: 'Yaxşı gedir, amma bəzi şeyləri unudubsan.', color: '#3498db' };
    if (pct >= 40)   return { text: 'Orta nəticə. Serialı yenidən izlə! 📺', color: '#e67e22' };
    return             { text: 'Çukur-u daha çox izləməlisən! 😅', color: '#e74c3c' };
  };

  // ── Loading ──
  if (screen === 'loading') {
    return (
      <div className="quiz-page">
        <div className="quiz-loading">
          <i className="fa fa-spinner fa-spin" /> Suallar yüklənir...
        </div>
      </div>
    );
  }

  // ── Intro ──
  if (screen === 'intro') {
    return (
      <div className="quiz-page">
        <div className="quiz-intro">
          <div className="quiz-intro__icon">🎬</div>
          <h1 className="quiz-title">Çukur Quiz</h1>
          <p className="quiz-intro__desc">
            Serialda baş verən hadisələri, personajları, ailə münasibətlərini nə qədər yaxşı bilirsən?
          </p>

          {error && (
            <div className="quiz-error">
              <i className="fa fa-exclamation-triangle" /> {error}
            </div>
          )}

          {/* Çətinlik seçimi */}
          <div className="quiz-filter-group">
            <span className="quiz-filter-label">Çətinlik:</span>
            <div className="quiz-filter-btns">
              {DIFFICULTIES.map(({ val, label, icon }) => (
                <button
                  key={val}
                  className={`quiz-filter-btn ${difficulty === val ? 'active' : ''}`}
                  onClick={() => setDifficulty(val)}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Kateqoriya seçimi */}
          <div className="quiz-filter-group">
            <span className="quiz-filter-label">Kateqoriya:</span>
            <div className="quiz-filter-btns">
              {CATEGORIES.map(({ val, label }) => (
                <button
                  key={val}
                  className={`quiz-filter-btn ${category === val ? 'active' : ''}`}
                  onClick={() => setCategory(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button className="quiz-btn quiz-btn--restart" onClick={handleStart}>
            <i className="fa fa-play" /> Başla
          </button>
        </div>
      </div>
    );
  }

  // ── Result ──
  if (screen === 'result') {
    const result = getResultMsg();
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <div className="quiz-result__icon">
            {score >= questions.length / 2 ? '🏆' : '📺'}
          </div>
          <h2 className="quiz-result__title">Quiz Bitdi!</h2>
          <div className="quiz-result__score">
            <span className="quiz-result__num" style={{ color: result.color }}>{score}</span>
            <span className="quiz-result__total">/ {questions.length}</span>
          </div>
          <p className="quiz-result__msg" style={{ color: result.color }}>{result.text}</p>
          <div className="quiz-result__bar">
            <div
              className="quiz-result__fill"
              style={{ width: `${(score / questions.length) * 100}%`, background: result.color }}
            />
          </div>
          <div className="quiz-result__actions">
            <button className="quiz-btn quiz-btn--restart" onClick={handleStart}>
              <i className="fa fa-redo" /> Yenidən oyna
            </button>
            <button className="quiz-btn quiz-btn--back" onClick={handleRestart}>
              <i className="fa fa-sliders-h" /> Filtrləri dəyiş
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  const diffMeta = { easy: { label: 'Asan', color: '#2ecc71' }, medium: { label: 'Orta', color: '#f1c40f' }, hard: { label: 'Çətin', color: '#e74c3c' } };
  const diff = diffMeta[question.difficulty] || { label: '', color: 'var(--gold)' };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <div className="quiz-header__top">
          <h1 className="quiz-title">Çukur Quiz</h1>
          <div className="quiz-meta">
            <span className="quiz-difficulty-badge" style={{ borderColor: diff.color, color: diff.color }}>
              {diff.label}
            </span>
            <span className="quiz-cat-badge">{question.category_label}</span>
          </div>
        </div>
        <div className="quiz-progress-info">
          <span className="quiz-q-num">Sual {current + 1} / {questions.length}</span>
          <span className="quiz-score-badge"><i className="fa fa-star" /> {score}</span>
        </div>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${(current / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-card__body quiz-card__body--text">
          <p className="quiz-card__question">{question.question}</p>

          <div className="quiz-options">
            {OPTION_KEYS.map((key) => {
              let cls = 'quiz-option';
              if (answered) {
                if (key === question.correct) cls += ' correct';
                else if (key === selected)    cls += ' wrong';
              }
              return (
                <button
                  key={key}
                  className={cls}
                  onClick={() => handleAnswer(key)}
                  disabled={answered}
                >
                  <span className="quiz-option__key">{key}</span>
                  <span className="quiz-option__text">{getOptionText(question, key)}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <>
              <div className={`quiz-feedback ${selected === question.correct ? 'correct' : 'wrong'}`}>
                {selected === question.correct
                  ? <><i className="fa fa-check-circle" /> Düzgün cavab!</>
                  : <><i className="fa fa-times-circle" /> Yanlış! Düzgün: <strong>{question.correct} — {getOptionText(question, question.correct)}</strong></>
                }
              </div>
              {question.explanation && (
                <div className="quiz-explanation">
                  <i className="fa fa-info-circle" /> {question.explanation}
                </div>
              )}
              <button className="quiz-btn quiz-btn--next" onClick={handleNext}>
                {current + 1 >= questions.length ? 'Nəticəni gör' : 'Növbəti sual'}{' '}
                <i className="fa fa-arrow-right" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
