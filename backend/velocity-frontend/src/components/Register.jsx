import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Функция для открытия отдельного окна с регистрацией
  const openRegisterWindow = () => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const features = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      scrollbars=yes,
      resizable=yes,
      toolbar=no,
      location=no,
      directories=no,
      status=no,
      menubar=no
    `;

    // Открываем новое окно
    const registerWindow = window.open(
      '/register',
      'registerWindow',
      features
    );

    if (registerWindow) {
      // Если окно успешно открылось
      if (isMobile) closeMenu(); // Закрываем меню на мобильных

      // Фокусируем на новом окне
      registerWindow.focus();
    } else {
      // Если блокировщик всплывающих окон
      alert('Пожалуйста, разрешите всплывающие окна для регистрации');
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Главная' },
    { id: 'services', label: 'Услуги' },
    { id: 'process', label: 'Процесс' },
    { id: 'projects', label: 'Проекты' },
    { id: 'competencies', label: 'Компетенции' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="#hero" className="logo" onClick={(e) => {
          e.preventDefault();
          scrollToSection('hero');
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Velocity</span>
        </a>

        {/* Навигация для десктопа */}
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

        {/* Кнопка регистрации для десктопа */}
        <button
          className="btn btn-primary header-desktop-btn"
          onClick={openRegisterWindow}
        >
          Регистрация
        </button>

        {/* Бургер-меню только для мобильных */}
        {isMobile && (
          <>
            <button
              className={`burger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>

            <div
              className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
              onClick={closeMenu}
            />

            {/* Мобильное меню */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
              <nav className="mobile-nav">
                {navLinks.map((link, index) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Кнопка регистрации для мобильных */}
              <button
                className="btn btn-primary mobile-cta-btn"
                onClick={openRegisterWindow}
              >
                Регистрация
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;