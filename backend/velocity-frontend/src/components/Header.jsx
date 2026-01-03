import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // Проверка авторизации
  useEffect(() => {
    setIsAuth(!!localStorage.getItem('access_token'));
  }, []);

  // Проверка мобильного разрешения
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { id: 'hero', label: 'Главная' },
    { id: 'services', label: 'Услуги' },
    { id: 'process', label: 'Процесс' },
    { id: 'projects', label: 'Проекты' },
    { id: 'competencies', label: 'Компетенции' },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  };

  // 🔥 Открытие окна регистрации
  const openRegisterWindow = () => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const win = window.open(
      '/register',
      'registerWindow',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!win) {
      alert('Разрешите всплывающие окна');
    }
  };

  // 🔥 Logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuth(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo" onClick={(e) => e.preventDefault()}>
          Velocity
        </a>

        {/* Десктоп-навигация */}
        <nav className={`nav ${isMobile ? 'mobile-only' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* 🔐 Кнопки авторизации */}
        {isAuth ? (
          <button className="btn" onClick={handleLogout}>
            Выйти
          </button>
        ) : (
          <button className="btn btn-primary" onClick={openRegisterWindow}>
            Регистрация
          </button>
        )}

        {/* Мобильное меню */}
        {isMobile && (
          <>
            <button
              className={`burger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </button>

            <div
              className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
              onClick={closeMenu}
            />

            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
              <nav className="mobile-nav">
                {navLinks.map(link => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {!isAuth && (
                <button
                  className="btn btn-primary mobile-cta-btn"
                  onClick={openRegisterWindow}
                >
                  Регистрация
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
