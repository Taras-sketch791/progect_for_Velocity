import React from 'react';
// import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="hero-main-section">
      {/* Glow background - заменяем Tailwind на 'hero-glow-container' и 'glow-top', 'glow-bottom' */}
      <div className="hero-glow-container">
        <div className="glow-top" />
        <div className="glow-bottom" />
      </div>

      <div className="hero-content-container">
        {/* <motion.div> заменена на обычный div */}
        <div className="hero-text-center">
          <h1 className="hero-title">
            Создаём цифровое будущее
            <br />
            {/* 'gradient-text' уже есть в вашем CSS, но для этого градиента дадим класс 'title-gradient' */}
            <span className="title-gradient">
              с искусственным интеллектом
            </span>
          </h1>

          <p className="hero-subtitle-text">
            Разрабатываем intelligent веб‑системы, платформы и ботов,
            которые решают реальные бизнес‑задачи
          </p>

          <div className="hero-actions">
            {/* Кнопки */}
            <button className="btn btn-primary-action">
              Обсудить проект
            </button>

            <button className="btn btn-secondary-action">
              Смотреть кейсы
            </button>
          </div>

          <div className="hero-stats-grid">
            {/* Компоненты статистики */}
            <Stat value="30+" label="реализованных проектов" />
            <Stat value="2+" label="года AI‑разработки" />
            <Stat value="100%" label="успешных запусков" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat-item-new">
      <p className="stat-value">{value}</p>
      <p className="stat-label-new">{label}</p>
    </div>
  );
}