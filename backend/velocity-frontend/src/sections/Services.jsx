import React, { useState, useEffect } from 'react';
import { fetchServices } from '../api/api';

const ServiceCard = ({ service }) => (
    <div className="service-card">
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__description">
            {service.description}
        </p>
        <ul className="service-card__features">
            {/* Маппинг по особенностям (features), полученным из API */}
            {service.features.map((feature, index) => (
                <li key={index} className="service-card__feature">{feature.feature_text}</li>
            ))}
        </ul>
    </div>
);

// Основной компонент секции "Наши услуги"
const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (error) {
                // Ошибка будет обработана в fetchServices, тут только сброс загрузки
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, []);

    return (
        <section id="services" className="services">
            <div className="container">
                <h2 className="section-title">Наши услуги</h2>

                {/* Индикатор загрузки */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        Загрузка услуг...
                    </div>
                ) : (
                    <div className="services__grid">
                        {services.length > 0 ? (
                            services.map(service => (
                                <ServiceCard key={service.id} service={service} />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                                Услуги не найдены. Проверьте Django API.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;