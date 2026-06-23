import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import './Slider.css';

const Slider = () => {
  const { slides, slidesLoading } = useSelector((s) => s.content);
  const [active,    setActive]    = useState(0);
  const [animating, setAnimating] = useState(false);

  const count = slides.length;

  const goTo = useCallback((index) => {
    if (animating || count === 0) return;
    setAnimating(true);
    setActive(index);
    setTimeout(() => setAnimating(false), 600);
  }, [animating, count]);

  const prev = () => goTo((active - 1 + count) % count);
  const next = useCallback(() => goTo((active + 1) % count), [active, count, goTo]);

  useEffect(() => {
    if (count === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, count]);

  // Slides yüklənərkən skeleton göstər
  if (slidesLoading || count === 0) {
    return <div className="slider slider--skeleton" aria-busy="true" />;
  }

  return (
    <section className="slider">
      <div className="slider__track">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`slider__slide ${i === active ? 'active' : ''}`}
            aria-hidden={i !== active}
          >
            <img src={slide.image} alt={slide.label} className="slider__img" />
            <div className="slider__overlay" />
            <div className="slider__info">
              <p className="slider__year">{slide.year}</p>
              <h2 className="slider__title">{slide.label}</h2>
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="slider__btn"
              >
                <i className="fa fa-play" /> İzlə
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className="slider__control slider__control--prev" onClick={prev} aria-label="Əvvəlki">
        <i className="fa fa-chevron-left" />
      </button>
      <button className="slider__control slider__control--next" onClick={next} aria-label="Sonrakı">
        <i className="fa fa-chevron-right" />
      </button>

      <div className="slider__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider__dot ${i === active ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slayd ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
