import React, { useState } from 'react';
import { Bot, Sparkles, X, Loader2 } from 'lucide-react';

const GeminiAIHelper = ({ onSuggestionInsert }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const quickPrompts = [
    "Помоги сформулировать техническое задание",
    "Какие технологии подойдут?",
    "Оцени сложность и сроки",
    "Предложи архитектурное решение"
  ];

  const generateAIResponse = async (promptText) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResponses = [
      "Для вашего проекта рекомендую:\n• Использовать React для фронтенда\n• Node.js для бэкенда\n• PostgreSQL для базы данных",
      "Технологии для AI-проекта:\n• Python с FastAPI\n• Redis для кэширования\n• OpenAI API или LangChain",
      "Сроки реализации: 2-4 месяца\nРекомендуемая команда: 1 Fullstack разработчик и 1 DevOps"
    ];

    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    setAiResponse(response);
    setIsGenerating(false);
  };

  const handleInsertToForm = () => {
    if (aiResponse && onSuggestionInsert) {
      onSuggestionInsert(aiResponse);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="ai-helper-btn"
        onClick={() => setIsOpen(true)}
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginLeft: '10px',
          padding: '6px 12px',
          background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          fontSize: '0.85rem',
          cursor: 'pointer'
        }}
      >
        <Sparkles size={14} />
        <span>Спросить AI</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px'
        }} onClick={() => setIsOpen(false)}>
          <div style={{
            width: '100%', maxWidth: '500px', background: 'white',
            borderRadius: '16px', padding: '24px', color: '#1a1a1a'
          }} onClick={e => e.stopPropagation()}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={24} color="#8B5CF6" />
                <h3 style={{ margin: 0 }}>AI Консультант</h3>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => generateAIResponse(prompt)}
                  disabled={isGenerating}
                  style={{
                    padding: '8px', fontSize: '0.75rem', textAlign: 'left',
                    background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {isGenerating ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Loader2 className="animate-spin" style={{ margin: '0 auto' }} />
                <p>AI анализирует запрос...</p>
              </div>
            ) : aiResponse && (
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', marginBottom: '15px' }}>{aiResponse}</div>
                <button
                  onClick={handleInsertToForm}
                  style={{
                    width: '100%', padding: '10px', background: '#3b82f6',
                    color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
                  }}
                >
                  Вставить в форму
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiAIHelper;
