import React, { useState, useEffect } from 'react';
import ZodiacBlock from './components/ZodiacBlock';
import WebApp from '@twa-dev/sdk';
import './styles.css';
import zodiac1 from './images/zodiac1.png';
import zodiac2 from './images/zodiac2.png';

const zodiacSigns = {
  en: [
    { name: 'Aries', period: 'March 21 - April 19', icon: `/zodiac1.png` }, 
    { name: 'Taurus', period: 'April 20 - May 20', icon: `/zodiac2.png` }, 
  ],
  ru: [
    { name: 'Овен', period: '21 марта - 19 апреля', icon: `/zodiac1.png` }, 
    { name: 'Телец', period: '20 апреля - 20 мая', icon: `/zodiac2.png` }, 
  ],
};

const App = () => {
  const [language, setLanguage] = useState('en');
  const [horoscope, setHoroscope] = useState(null);

  useEffect(() => {
    WebApp.ready();
    const userLang = WebApp.initDataUnsafe.user?.language_code || 'en';
    setLanguage(userLang === 'ru' ? 'ru' : 'en');
  }, []);

  const fetchHoroscope = async (sign) => {
    const response = await fetch('https://kuda.com/api/horoscope', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sign, language, period: 'today' }),
    });
    const data = await response.json();
    setHoroscope(data.description);
  };

  const handleBack = () => setHoroscope(null);

  return (
    <div className="app">
      {!horoscope ? (
        <div className="zodiac-list">
          {zodiacSigns[language].map((sign) => (
            <ZodiacBlock
              key={sign.name}
              name={sign.name}
              period={sign.period}
              icon={sign.icon}
              onClick={() => fetchHoroscope(sign.name.toLowerCase())}
            />
          ))}
        </div>
      ) : (
        <div className="horoscope-details">
          <p>{horoscope}</p>
          <button onClick={handleBack}>
            {language === 'en' ? 'Back' : 'Назад'}
          </button>
        </div>
      )}
      <button onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}>
        {language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
      </button>
    </div>
  );
};

export default App;
