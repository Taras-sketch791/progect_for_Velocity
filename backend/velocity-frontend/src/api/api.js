import axios from 'axios';

// 🚨 ВАЖНО: Укажите правильный базовый URL для вашего Django API 🚨
// Если Django запущен на порту 8000, используйте этот URL.
const API_BASE_URL = 'http://localhost:8000/api/v1';

export const fetchServices = async () => {
  try {
    // Запрос к endpoint'у: http://localhost:8000/api/v1/services/
    const response = await axios.get(`${API_BASE_URL}/services/`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении услуг:", error);
    // В случае ошибки возвращаем пустой массив
    return [];
  }
};

// Добавьте сюда функции для других секций (кейсы, компетенции) позже:
// export const fetchCases = async () => { ... }
// export const fetchCompetencies = async () => { ... }