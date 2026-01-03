import React, { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import GeminiAIHelper from './GeminiAIHelper';

const ContactForm = () => {
  const TELEGRAM_BOT_TOKEN = '8556181877:AAHdPJjCmLjXuNg7adnb-BRiOqAZKjUfgaE';
  const TELEGRAM_CHAT_ID = '5478197533';

  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'ai-development',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAISuggestionInsert = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      message: prev.message + (prev.message ? '\n\n' : '') + '🤖 AI-рекомендации:\n' + suggestion
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const text = `
🚀 **Новая заявка с сайта!**
👤 Имя: ${formData.name}
📧 Email: ${formData.email}
Тип проекта: ${formData.projectType}
📝 Сообщение: ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: 'ai-development', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error('Ошибка при отправке');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section" style={{ padding: '60px 20px' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="section-title">Оставить заявку</h2>

        <div className="contact-subtitle" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span>Расскажите о вашей идее, и мы свяжемся с вами в ближайшее время</span>
          <GeminiAIHelper onSuggestionInsert={handleAISuggestionInsert} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            value={formData.name}
            onChange={handleChange}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Ваш Email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="ai-development">AI Разработка</option>
            <option value="web-app">Веб-приложение</option>
            <option value="mobile-app">Мобильное приложение</option>
          </select>

          <textarea
            name="message"
            rows="6"
            placeholder="Описание проекта (можно использовать AI-помощника выше)"
            required
            value={formData.message}
            onChange={handleChange}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}
          ></textarea>

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '15px',
              background: status === 'success' ? '#22c55e' : '#000',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: 'none',
              transition: 'all 0.3s'
            }}
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" size={20} />
            ) : status === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <Send size={20} />
            )}
            {status === 'loading' ? 'Отправка...' : status === 'success' ? 'Отправлено!' : 'Отправить заявку'}
          </button>

          {status === 'error' && (
            <p style={{ color: '#ef4444', textAlign: 'center' }}>Произошла ошибка. Попробуйте еще раз.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
